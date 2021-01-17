import React from 'react'
import EventList from './event-list'
import {createEventListDriver} from "./event-list.driver";

jest.mock('../../services/api', () => {
    const mockEvents = [{
        id: "123",
        title: "foo",
    }, {
        id: "321",
        title: "bar"
    }]
    let triggerCallback

    return {
        'apiService': {
            fetchEvents: () => Promise.resolve(mockEvents),
            onEventsChange: (callback) => {
                triggerCallback = callback
                return () => {}
            },
            onAuthChange: () => () => {},
            deleteEvent: (id) => {
                triggerCallback(mockEvents.filter(ev => ev.id !== id))
            }

        }
    }
})

describe('EventList', () => {
    it('should render list of events', async () => {
        const driver = createEventListDriver()

        await Promise.resolve()
        driver.update()
        expect(driver.get.listItemLength()).toBe(2)
    });

    it('should delete event', async () => {
        const driver = createEventListDriver()

        await Promise.resolve()

        driver.update()
        driver.when.listItemClicked(0)

        expect(driver.get.listItemLength()).toBe(1)
    });
});
