import React, {useState} from 'react'
import {useQuery} from '@apollo/client'
import {allEventsQuery} from "../queries/all-events-query";
import Event from "./event";
import Link from "next/link";

function EventList(props) {
    const { data, loading } = useQuery(allEventsQuery)
    const [openEventId, setEventId] = useState(null)

    if (loading) return <h1>Loading...</h1>
    return (
        <ul>
            {data.allEvents.map(event => (
                <li key={event.id}>
                    <Link href={`/events/${event.id}`}>
                        {event.title}
                    </Link>
                    <button onClick={() => setEventId(event.id)}>toggle open</button>
                    {openEventId === event.id && <Event id={event.id} />}
                </li>
            ))}
        </ul>
    )
}

export default EventList
