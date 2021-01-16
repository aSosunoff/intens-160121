import {select, put, call} from 'redux-saga/effects'
import {signUpSaga, signUp, SIGN_UP_ERROR, SIGN_UP_SUCCESS, SIGN_UP_START, loadingSelector} from './auth'
import {apiService} from "../../services/api";

describe('Auth Duck', () => {
    describe('Saga tests', () => {
        describe('SignUpSaga', () => {
            it('should work for happy path', () => {
                const email = 'test@email'
                const password = '12341234'
                const action = signUp(email, password)
                const sagaGen = signUpSaga(action)

                const {value: effect1}  = sagaGen.next()

                expect(effect1).toEqual(select(loadingSelector))
//                expect(effect1.type).toEqual('SELECT')

                const {value: effect2} = sagaGen.next(false)

                expect(effect2).toEqual(put({
                    type: SIGN_UP_START
                }))

                const {value: effect3} = sagaGen.next()

                expect(effect3).toEqual(call(apiService.signUp, email, password))

                const {value: effect4} = sagaGen.next({ email })

                expect(effect4).toEqual(put({
                    type: SIGN_UP_SUCCESS,
                    payload: { user: { email } }
                }))

                const {done} = sagaGen.next()

                expect(done).toBe(true)


/*
                if (effect1.type === 'SELECT') {
                    const state = effect1.payload.selector(store.getState())
                    sagaGen.next(state)
                } else if (effect1.type === 'PUT') {
                    store.dispatch(effect1.payload.action)
                }
*/
            });
        });
    });
});
