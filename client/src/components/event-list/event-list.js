import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {fetchEvents, loadingSelctor, eventsSelector, deleteEvent} from '../../redux/ducks/events'


function EventList(props) {
    const loading = useSelector(loadingSelctor)
    const events = useSelector(eventsSelector)

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(fetchEvents())
    }, [])

    const handleDelete = (id) => dispatch(deleteEvent(id))

    if (loading) return <h1>Loading...</h1>

    return (
        <ul>
            {events.map(event => (
                <li key={event.id} onClick={() => handleDelete(event.id)} data-test-id="list-item">
                    {event.title}
                </li>
            ))}
        </ul>
    )
}

export default EventList
