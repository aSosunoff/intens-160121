import {all, put, call, fork, take, takeEvery, takeLeading, select, delay, cancelled, cancel, race} from 'redux-saga/effects'
import {eventChannel, buffers} from 'redux-saga'
import {appName} from '../../config'
import {Record} from 'immutable'
import {apiService} from "../../services/api";
import {LOCATION_CHANGE} from 'connected-react-router'

/**
 * Constants
 * */
export const moduleName = 'events'
const prefix = `${appName}/${moduleName}`

export const FETCH_EVENT_REQUEST = `${prefix}/FETCH_EVENT_REQUEST`
export const FETCH_EVENT_START = `${prefix}/FETCH_EVENT_START`
export const FETCH_EVENT_SUCCESS = `${prefix}/FETCH_EVENT_SUCCESS`
export const EVENTS_SYNC = `${prefix}/EVENTS_SYNC`
export const DELETE_EVENT_REQUEST = `${prefix}/DELETE_EVENT`
export const DELETE_EVENT_SUCCESS = `${prefix}/DELETE_EVENT_SUCCESS`
export const STOP_BTN_CLICKED = `${prefix}/STOP_BTN_CLICKED`

/**
 * Reducer
 * */
export const ReducerRecord = Record({
    events: [],
    loading: false
})

export default function reducer(state = new ReducerRecord(), action) {
    const {type, payload} = action

    switch (type) {
        case EVENTS_SYNC:
        case FETCH_EVENT_SUCCESS:
            return state
                .set('events', payload.events)
                .set('loading', false)

        case FETCH_EVENT_START:
            return state
                .set('loading', true)

        default:
            return state
    }
}

/**
 * Selectors
 * */

export const eventsSelector = (state) => state[moduleName].events
export const loadingSelctor = state => state[moduleName].loading
/**
 * Action Creators
 * */

export const fetchEvents = () => ({
    type: FETCH_EVENT_REQUEST
})

export const deleteEvent = id => ({
    type: DELETE_EVENT_REQUEST,
    payload: { id }
})

/**
 * Sagas
 * */

function generateId() {
    return Date.now()
}

function someAC() {
    return {
        type: 'hohoho'
    }
}

/*
thunk = (dispatch) => {
    someAC()
    dispatch(someAC())
}
*/

const fetchEventsSaga = function * () {
    //select(loadingSelctor) // {..., type: 'SELECT', payload: {} }
    if (yield select(loadingSelctor)) {
        return
    }

    const instuctionObj = put({
        type: FETCH_EVENT_START
    })

    yield instuctionObj

    //const action = someAC() // {type: 'hohoho'} -> store.dispatch({...})
    //const effect = put(generateId) /// {type: 'PUT', payload: {}} Do Nothing
    //const id = yield put(action)

    const events = yield call(apiService.fetchEvents)

    yield put({
        type: FETCH_EVENT_SUCCESS,
        payload: { events }
    })
}

const deleteEventSaga = function * (event) {
    yield call(apiService.deleteEvent, event.payload.id)
    yield put({
        type: DELETE_EVENT_SUCCESS
    })
//    yield call(fetchEventsSaga)
}

const fetchWithPolling = function * () {
    try {
        while (true) {
            yield delay(2000)
            yield call(fetchEventsSaga)
            //yield fork(fetchEventsSaga)
        }
    } finally {
        if (yield cancelled()) {
            console.log('---', 'cancelled')
        }
    }
}

const cancelablePolling = function * () {
    yield race({
        polling: fetchWithPolling(),
        timeout: delay(10000),
//        leave: take(LOCATION_CHANGE),
        manualStop: take(STOP_BTN_CLICKED)
    })
}


const createMouseChannel = () => eventChannel(emit => {
    const callback = (ev) => emit(ev)
    window.document.addEventListener('mousemove', callback)

    return () => window.document.removeEventListener('mousemove', callback)
}, buffers.sliding(5))

const mouseSaga = function * () {
    const mouseChannel = yield call(createMouseChannel)

    for (let i = 0; i < 100; i++) {
        const ev = yield take(mouseChannel)
        console.log(ev)
    }
}

const createEventsListChannel = () => eventChannel(apiService.onEventsChange)

const realtimeSyncSaga = function * () {
    const chanel = yield call(createEventsListChannel)

    while (true) {
        const events = yield take(chanel)

        yield put({
            type: EVENTS_SYNC,
            payload: { events }
        })
    }
}

export function* saga() {
    yield fork(realtimeSyncSaga)
    yield fork(mouseSaga)
    //yield spawn(fetchWithPolling)

    yield all([
        //takeEvery(DELETE_EVENT_REQUEST, deleteEventSaga),
        takeLeading(DELETE_EVENT_REQUEST, deleteEventSaga),
        takeEvery(FETCH_EVENT_REQUEST, fetchEventsSaga),
    ])
}
