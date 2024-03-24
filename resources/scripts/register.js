function addFormSubmissionListener() {
  const form = document.getElementById("signupForm");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const username = document.getElementById("username").value;
  const errorElement = document.getElementById("error");

  if (password !== confirmPassword) {
    errorElement.innerHTML = "Passwords do not match";
    return;
  } else {
    errorElement.innerHTML = ""; // Clear error message if passwords match
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then((userCredential) => {
    // The user ID is userCredential.user.uid
    const userId = userCredential.user.uid;

    // Save the username to the Firebase database
    firebase.database().ref('Users/' + userId).set({
      username: username
    })
    .then(() => {
      console.log('Username saved:', username);  // Log when the username is saved
      location.replace("login.html");  // Move this inside the .then() block
    })
    .catch((error) => {
      console.error('Error saving username:', error);  // Log if any errors occur
    });
  })
  .catch((error) => {
    errorElement.innerHTML = error.message;
  });
});

});
}
}


// Call the function to add the event listener
if (typeof window !== 'undefined') {
  addFormSubmissionListener();
}

module.exports = { addFormSubmissionListener };