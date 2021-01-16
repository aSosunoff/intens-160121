import firebase from 'firebase/app'

firebase.auth().onAuthStateChanged((user) => console.log(user) )
