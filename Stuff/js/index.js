

app.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);

var help = app.auth();

function handleChange(checkBox) {
    if (checkBox.checked == true) {
        app.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
    } else {
        app.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);
    }
}
// auth = firebase.auth().setPersistence(firebase.auth().Auth.Persistence.SESSION).catch(function (error) {
//     console.log(error.message);
// });

function googleLogin() {
    var provider = new firebase.auth.google;
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // ...
    }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
        // ...
    });
}

function Login() {
    var txtEmail = document.getElementById("user").value;
    var txtPassword = document.getElementById("password").value;
    // var btnLogin = document.getElementById("btnLogin");

    app.auth().signInWithEmailAndPassword(txtEmail, txtPassword).catch(function(error) {
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