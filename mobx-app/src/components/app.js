import React from 'react'
import {counter} from '../stores/counter'
import Counter from "./counter";
import {observer} from "mobx-react";
import EventList from "./event-list";

window.counter = counter

function App() {

    return (
        <div>
            <h1>Hello Mobx</h1>
            <Counter counter = {counter}/>
            <EventList/>
        </div>
    )
}

export default observer(App)
