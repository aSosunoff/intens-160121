import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {allEventsQuery} from "../queries/all-events-query";
import Event from "./event";

function EventList(props) {
    const { data, loading } = useQuery(allEventsQuery)
    const [openEventId, setEventId] = useState(null)

    if (loading) return <h1>Loading...</h1>
    return (
        <ul>
            {data.allEvents.map(event => (
                <li key={event.id} onClick={() => setEventId(event.id)}>
                    {event.title}
                    {openEventId === event.id && <Event id={event.id} />}
                </li>
            ))}
        </ul>
    )
}

export default EventList
