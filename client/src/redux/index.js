import { createStore, applyMiddleware } from "redux";
import { routerMiddleware } from "connected-react-router";
import createSagaMiddleware from 'redux-saga'
import reducer from "./reducer";
import history from "../history";
import rootSaga from "./root-saga";


export const initStore = () => {
    const sagaMiddleware = createSagaMiddleware()

    const enhancer = applyMiddleware(routerMiddleware(history), sagaMiddleware);
    const store = createStore(reducer, enhancer)

    sagaMiddleware.run(rootSaga)

    return store;
}
