import React from 'react'
import {counter} from '../stores/counter'
import Counter from "./counter";
import {observer} from "mobx-react";
import EventList from "./event-list";
import {eventsStore} from "../stores/events";

window.counter = counter

function App() {
    console.log('rendering')
    return (
        <div>
            <h1>Hello Mobx</h1>
            <Counter counter = {counter}/>
            <h3>total events: {eventsStore.eventsCount}</h3>
            <button onClick={() => eventsStore.reorder()}>Reorder</button>
            <EventList/>
        </div>
    )
}

export default observer(App)
