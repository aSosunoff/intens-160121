import React from 'react'
import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import EventList from './event-list'
import {initStore} from '../../redux'

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
        const wrapper = mount(
            <Provider store={initStore()}>
                <EventList events={[]}/>
            </Provider>)

        await Promise.resolve()
        wrapper.update()
        expect(wrapper.find('li').length).toBe(2)
    });

    it('should delete event', async () => {
        const wrapper = mount(
            <Provider store={initStore()}>
                <EventList events={[]}/>
            </Provider>)

        await Promise.resolve()

        wrapper.update()
        wrapper.find('li').at(0).simulate('click')

        expect(wrapper.find('li').length).toBe(1)
    });
});
