function myFunc() {
    alert("AHAHAHAH");
}

function Register() {
    var txtEmail = document.getElementById("email").value;
    var txtPassword = document.getElementById("password").value;
    var name = document.getElementById("name").value;
    var user = document.getElementById("userbutton").checked;
    var admin = document.getElementById("adminbutton").checked;

    if (!txtEmail) {
        alert("Invalid email");
    } else if (!txtPassword) {
        alert("Invalid Password");
    } else if (!name) {
        alert("Invalid Name");
    } else if (!(user || admin)) {
        alert("No user type selected!");
    } else {
        app.auth().createUserWithEmailAndPassword(txtEmail, txtPassword).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode == 'auth/weak-password') {
                alert('The password is too weak.');
            } else {
                alert(errorMessage);
            }
            console.log(error);

        });
    }

    app.auth().onAuthStateChanged(function(user) {
        if (user) {
            app.auth().signOut().then(function() {
                // Sign-out successful.
                window.location = "index.html";
            }).catch(function(error) {
                // An error happened.
                alert("ERROR");
            });
        }
    });
}