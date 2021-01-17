import {mount} from 'enzyme'
import {Provider} from 'react-redux'
import EventList from "./event-list";
import {initStore} from '../../redux'

jest.mock('../../services/api', () => {

    return {
        'apiService': () => ({
//            onEventsChange: (callback) => {return () => {}},
            fetchEvents: () => () => {},
//            onAuthChange: () => () => {}
        })
    }
})

describe('EventList', () => {
    it('should render list of events', () => {
        const wrapper = mount(
            <Provider store={initStore()}>
                <EventList events={[]}/>
            </Provider>)
        expect(wrapper.find('li').length).toBe(0)
    });
});
