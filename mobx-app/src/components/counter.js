import React from 'react'
import {observer} from 'mobx-react'
import {counter} from '../stores/counter'

function Counter(props) {
    return (
        <div>
            <h2>{counter.count}</h2>
            <button onClick={() => counter.increment()}>Increment</button>
        </div>
    )
}

export default observer(Counter)
