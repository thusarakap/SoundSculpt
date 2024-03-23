document.getElementById("signupForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const errorElement = document.getElementById("error");

  if (password !== confirmPassword) {
    errorElement.innerHTML = "Passwords do not match";
    return;
  } else {
    errorElement.innerHTML = ""; // Clear error message if passwords match
  }

  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(() => {
      location.replace("home.html");
    })
    .catch((error) => {
      errorElement.innerHTML = error.message;
    });
});
