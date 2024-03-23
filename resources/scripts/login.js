const fs = require('fs');
const path = require('path');

document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // The user ID is userCredential.user.uid
    const userId = userCredential.user.uid;
    console.log('User ID:', userId);

    // Get user data from Realtime Database
    const db = firebase.database();
    db.ref('users/' + userId).once('value').then((snapshot) => {
      if (snapshot.exists()) {
        let userData = snapshot.val();
        console.log("dBValues:", userData.dBValues);
        console.log("Speaker Type:", userData.speakerType);
    
        // Convert dBValues to an array of floats
        if (typeof userData.dBValues === 'string') {
            userData.dBValues = userData.dBValues.split(',').map(value => parseFloat(value));
        }
    
        // Save userData to a JSON file
        fs.writeFile(path.join(__dirname, '..', 'resources', 'data', 'userData.json'), JSON.stringify(userData, null, 2), (err) => {
            if (err) {
                console.error("Error writing file:", err);
            }
        });
    
        // Check if dBValues and speakerType are not empty
        if (userData.dBValues && userData.speakerType) {
            // If they are not empty, redirect to home.html
            location.replace("home.html");
        } else {
            // If they are empty, redirect to calibration.html
            location.replace("calibrator.html");
        }
    } else {
        // If user doesn't exist in the database, redirect to calibration.html
        location.replace("calibrator.html");
    }
    }).catch((error) => {
        console.log("Error getting user data:", error);
        passwordField.insertAdjacentHTML('afterend', `<p class="error-message" style="margin-left: 1px;">${error.message}</p>`);
    });
  })
  .catch((error) => {
    const errorMessage = error.message;
    passwordField.insertAdjacentHTML('afterend', `<p class="error-message" style="margin-left: 1px;">${errorMessage}</p>`);
  });
});

function forgotPass() {
  const email = document.getElementById("email").value;
  firebase.auth().sendPasswordResetEmail(email)
    .then(() => {
      alert("Reset link sent to your email id");
    })
    .catch((error) => {
      document.getElementById("error").innerHTML = error.message;
    });
}
