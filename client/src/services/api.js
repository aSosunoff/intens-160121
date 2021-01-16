import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import {fbConfig} from "../config";

class ApiService {
    constructor() {
        this.fb = firebase
        this.fb.initializeApp(fbConfig)
    }

    signUp = (email, password) =>
        this.fb.auth().createUserWithEmailAndPassword(email, password)

    fetchEvents = () =>
        this.fb.firestore().collection('events').get().then(processFbCollection)

    deleteEvent = (id) =>
        this.fb.firestore().collection('events').doc(id).delete()

    onEventsChange = (callback) =>
        this.fb.firestore()
            .collection('events')
            .onSnapshot(data => callback(processFbCollection(data)))

}

function processFbCollection(collection) {
    return collection.docs.map(snapshot => ({
        ...snapshot.data(),
        id: snapshot.id
    }))
}

export const apiService = new ApiService()
