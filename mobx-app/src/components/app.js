import React from 'react'
import {counter} from '../stores/counter'
import Counter from "./counter";

window.counter = counter

function App() {
    return (
        <div>
            <h1>Hello Mobx</h1>
            <Counter/>
        </div>
    )
}

export default App
