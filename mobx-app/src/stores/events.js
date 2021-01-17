import {action, computed, makeAutoObservable, makeObservable, observable} from 'mobx'
import {apiService} from "../services/api";

class EventsStore {
    events = []

    constructor(props) {
        //makeAutoObservable(this, {})
        makeObservable(this, {
            setEvents: action,
            reorder: action,
            events: observable,
            eventsCount: computed
        })
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

    reorder() {
        this.events = this.events.sort(() =>0.5 - Math.random())
    }

    get eventsCount() {
        return this.events.length
    }
}

export const eventsStore = new EventsStore()
