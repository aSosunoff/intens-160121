import React, {useEffect} from 'react'
import {eventsStore} from '../stores/events'
import {observer} from "mobx-react";

function EventList() {
    useEffect(() => {
        eventsStore.onEventsChange()
    }, [])

    return (
        <div>
            <ul>
                {eventsStore.events.map(event => (
                    <li key={event.id}>
                        {event.title}
                        <button onClick={() => eventsStore.delete(event.id)}>delete</button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default observer(EventList)
