import firebase from 'firebase/app'
import 'firebase/auth'
import {fbConfig} from "../config";

class ApiService {
    constructor() {
        this.fb = firebase
        this.fb.initializeApp(fbConfig)
    }

    signUp = (email, password) =>
        this.fb.auth().createUserWithEmailAndPassword(email, password)

}

export const apiService = new ApiService()
