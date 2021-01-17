import {makeAutoObservable} from 'mobx'
import {apiService} from "../services/api";

class EventsStore {
    events = []

    constructor(props) {
        makeAutoObservable(this, {})
    }

    onEventsChange() {
        apiService.onEventsChange(events => this.setEvents(events))
    }

    setEvents(events) {
        this.events = events
    }

    delete(id) {
        apiService.deleteEvent(id)
    }
}

export const eventsStore = new EventsStore()
