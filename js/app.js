// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbmdeersid6XSA4kh_TYsGgVSgVF5BrFs",
    authDomain: "eraticators-73723.firebaseapp.com",
    databaseURL: "https://eraticators-73723.firebaseio.com",
    projectId: "eraticators-73723",
    storageBucket: "eraticators-73723.appspot.com",
    messagingSenderId: "782651564720"
};
firebase.initializeApp(config);

firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});

firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
});