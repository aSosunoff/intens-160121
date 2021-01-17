import {mount} from "enzyme";
import {Provider} from 'react-redux'
import {initStore} from "../../redux";
import EventList from "./event-list";

export const createEventListDriver = () => {
    const wrapper = mount(
        <Provider store={initStore()}>
            <EventList />
        </Provider>)


    const driver = {
        get: {
            listItemLength: () => wrapper.find('[data-test-id="list-item"]').length,
            listItem: (index) => wrapper.find('[data-test-id="list-item"]').at(index)
        },
        when: {
            listItemClicked: (index) => driver.get.listItem(index).simulate('click')
        },
        update: () => wrapper.update()
    }

    return driver
}
