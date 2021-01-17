import React from 'react'
import {useMutation, useQuery} from "@apollo/client";
import {eventQuery} from "../queries/event-query";
import {renameMutation} from "../queries/rename-mutation";

function Event({ id }) {
    const {data, loading} = useQuery(eventQuery, { variables: { id_var: id } })
    const [rename, { loading: mutating }] = useMutation(renameMutation, {variables: { id, title: 'foo'} })

    if (!data || loading) return <h2>Loading...</h2>
    if (mutating) return <h2>Renaming...</h2>
    return (
        <div>
            <h3>{data.event.url}</h3>
            <button onClick={rename}>Rename</button>
            <ul>
                {data.event.people.map(person =>
                    <li key={person.id}>{person.firstName}</li>
                )}
            </ul>
        </div>
    )
}

export default Event
