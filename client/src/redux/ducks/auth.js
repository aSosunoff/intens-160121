import {put,take, delay, takeLatest, select, call, all} from 'redux-saga/effects'
import {eventChannel} from 'redux-saga'
import {appName} from '../../config'
import {Record} from 'immutable'
import {apiService} from "../../services/api";

/**
 * Constants
 * */
export const moduleName = 'auth'
const prefix = `${appName}/${moduleName}`

export const SIGN_UP_REQUEST = `${prefix}/SIGN_UP_REQUEST`
export const SIGN_UP_START = `${prefix}/SIGN_UP_START`
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`
export const SIGN_UP_ERROR = `${prefix}/SIGN_UP_ERROR`
export const SIGN_UP_ERROR_LIMIT = `${prefix}/SIGN_UP_ERROR_LIMIT`

export const SIGN_IN_REQUEST = `${prefix}/SIGN_IN_REQUEST`
export const SIGN_IN_START = `${prefix}/SIGN_IN_START`
export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`
export const SIGN_IN_ERROR = `${prefix}/SIGN_IN_ERROR`
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    user: null,
    loading: false,
    error: null
})

export default function reducer(state = new ReducerRecord(), action) {
    return actionHandlers[action.type]
        ? actionHandlers[action.type](state, action)
        : state
}

const actionHandlers = {
    [SIGN_UP_START]: (state) => state.set('loading', true),
    [SIGN_UP_SUCCESS]:
        (state, { payload }) => state
            .set('user', payload.user)
            .set('loading', false)
            .set('error', null),
    [SIGN_IN_SUCCESS]:
        (state, { payload }) => state
            .set('user', payload.user)
            .set('loading', false)
            .set('error', null),
    [SIGN_OUT_SUCCESS]:
        (state) => state.set('user', null),
    [SIGN_UP_ERROR]: (state, { error }) => state.set()
        .set('user', null)
        .set('loading', false)
        .set('error', error),
}

/**
 * Selectors
 * */

export const loadingSelector = state => state[moduleName].loading
export const userSelector = state => state[moduleName].user

export const authorizedSelector = (state) => !!userSelector(state)

/**
 * Action Creators
 * */

export const signUp = (email, password) => ({
    type: SIGN_UP_REQUEST,
    payload: { email, password }
})

/*
export const signUp = (email, password) => (dispatch, getState) => {
    if (loadingSelector(getState())) return;

    dispatch({
        type: SIGN_UP_START
    })

    try {
        //logic

        dispatch({
            type: SIGN_UP_SUCCESS
        })
    } catch (error) {
        dispatch({
            type: SIGN_UP_ERROR
        })
    }
}
*/

//TODO:
//const unsubscribe = firebase.auth().onAuthStateChanged((user) => console.log(user) )
// unsubscribe()


/**
 * Sagas
 * */

export function * signInSaga() {

}

const createAuthStateChannel = () => eventChannel(apiService.onAuthChange)

const authSyncSaga = function * () {
    const authChannel = yield call(createAuthStateChannel)

    while (true) {
        const { user } = yield take(authChannel)

        if (user) {
            yield put({
                type: SIGN_IN_SUCCESS,
                payload: { user }
            })
        } else {
            yield put({
                type: SIGN_OUT_SUCCESS
            })
        }

    }
}

export const signUpSaga = function * () {
    let errorCounter = 0

    while (true) {
        if (errorCounter >= 3) {
            yield put({
                type: SIGN_UP_ERROR_LIMIT
            })
            return;
        }

        const action = yield take(SIGN_UP_REQUEST)

        const {email, password} = action.payload

        if (yield select(loadingSelector)) {
            console.log('already signing up')
            return;
        }

        //some logic
        yield put({
            type: SIGN_UP_START
        })

        try {
            const user = yield call(apiService.signUp, email, password)

            yield put({
                type: SIGN_UP_SUCCESS,
                payload: {user}
            })
        } catch (error) {
            errorCounter++
            yield put({
                type: SIGN_UP_ERROR,
                error
            })
            yield delay(Math.pow(500, errorCounter + 1))
        }
    }
}


/*
export const signUpSaga = function * (action) {
    const {email, password} = action.payload
//    const loading = yield select(loadingSelector)
    if (yield select(loadingSelector)) {
        console.log('already signing up')
        return;
    }

    //some logic
    yield put({
        type: SIGN_UP_START
    })

    try {
        const user = yield call(apiService.signUp, email, password)

        yield put({
            type: SIGN_UP_SUCCESS,
            payload: {user}
        })
    } catch (error) {
        yield put({
            type: SIGN_UP_ERROR,
            error
        })
    }
}
*/

export const saga = function * () {
    yield all([
        authSyncSaga(),
        signUpSaga(),
        takeLatest(SIGN_IN_REQUEST, signInSaga)
    ])
}
