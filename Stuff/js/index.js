

app.auth().setPersistence(firebase.auth.Auth.Persistence.NONE);


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