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

firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


function handleChange(checkBox) {
    if (checkBox.checked == true) {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } else {
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
}
// auth = firebase.auth().setPersistence(firebase.auth().Auth.Persistence.SESSION).catch(function (error) {
//     console.log(error.message);
// });

function Login() {
    var txtEmail = document.getElementById("user").value;
    var txtPassword = document.getElementById("password").value;
    // var btnLogin = document.getElementById("btnLogin");

    firebase.auth().signInWithEmailAndPassword(txtEmail, txtPassword).catch(function(error) {
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

    firebase.auth().onAuthStateChanged(function(user) {
       if (user) {
           window.location = "main.html";
       }
    });