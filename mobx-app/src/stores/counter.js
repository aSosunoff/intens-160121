import {makeObservable, observable, autorun, action} from 'mobx'

class Counter {
    count = 0

    constructor() {
        makeObservable(this, {
            count: observable,
            increment: action
        })
    }

    increment() {
        this.count++
    }
}

export const counter = new Counter()

autorun(() => {
    console.log(counter.count)
})
