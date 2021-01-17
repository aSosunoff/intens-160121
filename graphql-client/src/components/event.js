import React from 'react'
import {useQuery} from "@apollo/client";
import {eventQuery} from "../queries/event-query";

function Event({ id }) {
    const {data, loading} = useQuery(eventQuery, { variables: { id_var: id } })
    if (!data || loading) return <h2>Loading...</h2>
    return (
        <div>
            <h3>{data.event.url}</h3>
            <ul>
                {data.event.people.map(person =>
                    <li key={person.id}>{person.firstName}</li>
                )}
            </ul>
        </div>
    )
}

export default Event
