import React from 'react'
import {observer} from 'mobx-react'

function Counter({ counter }) {
    const { count, increment } = counter

    return (
        <div>
            <h2>{count}</h2>
            <button onClick={() => increment()}>Increment</button>
        </div>
    )
}

export default observer(Counter)
