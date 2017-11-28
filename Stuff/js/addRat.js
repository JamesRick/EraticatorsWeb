function AddNewRat() {
    var key = document.getElementById("key").value;
    var date = document.getElementById("date").value;
    var locationType = document.getElementById("locationType").value;
    var zip = document.getElementById("zip").value;
    var address = document.getElementById("address").value;
    var city = document.getElementById("city").value;
    var borough = document.getElementById("borough").value;
    var latitude = document.getElementById("latitude").value;
    var longitude = document.getElementById("longitude").value;
    var dateParts = date.split("-");
    var year = dateParts[0];
    var month = dateParts[1];
    var day = dateParts[2];
    var formattedDate = month + "/" + day + "/" + year + " 12:00:00 AM";
    if (!key) {
        alert("Empty key");
    } else if (!date) {
        alert("Empty Date");
    } else if (!locationType) {
        alert("Location Type");
    } else if (!zip) {
        alert("Empty zip");
    } else if (!address) {
        alert("Empty address");
    }else if (!city) {
        alert("Empty city");
    }else if (!borough) {
        alert("Empty borough");
    }else if (!latitude) {
        alert("Empty latitude");
    }else if (!longitude) {
        alert("Empty longitude");
    } else {
        app.database().ref("RAT_TABLE/" + key).set({
            address: address,
            borough: borough,
            city: city,
            date: formattedDate,
            latitude: latitude,
            longitude: longitude,
            name: key,
            type: locationType,
            zip: zip
        });
    }
    alert("New rat (" + key + ") added!");
    window.location = "main.html";

}