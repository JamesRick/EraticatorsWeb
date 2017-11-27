// Initialize Firebase
var config = {
    apiKey: "AIzaSyBbmdeersid6XSA4kh_TYsGgVSgVF5BrFs",
    authDomain: "eraticators-73723.firebaseapp.com",
    databaseURL: "https://eraticators-73723.firebaseio.com",
    projectId: "eraticators-73723",
    storageBucket: "eraticators-73723.appspot.com",
    messagingSenderId: "782651564720"
};
var app = firebase.initializeApp(config);

const txtEmail = document.getElementById("user");
const txtPassword = document.getElementById("password");
const btnLogin = document.getElementById("btnLogin");

function loginUser() {
    const email = txtEmail.value;
    const pass = txtPassword.value;
    const auth = firebase.auth();
    const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
        } else {
            alert(errorMessage);
        }
        console.log(error);

    });

}
