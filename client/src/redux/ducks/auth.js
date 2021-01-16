import {put,takeEvery, select, call} from 'redux-saga/effects'
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
    [SIGN_UP_SUCCESS]: (state, { payload }) => state
        .set('user', payload.user)
        .set('loading', false)
        .set('error', null),
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
//firebase.auth().onAuthStateChanged((user) => console.log(user) )

/**
 * Sagas
 * */

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

    console.log( put({
        type: SIGN_UP_START
    }))

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

export const saga = function * () {
    yield takeEvery(SIGN_UP_REQUEST, signUpSaga)
}
