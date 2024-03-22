document.getElementById("signupForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;
    if (password !== confirmPassword) {
      document.getElementById("error").innerHTML = "Passwords do not match";
      return;
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(() => {
        location.replace("welcome.html");
      })
      .catch((error) => {
        document.getElementById("error").innerHTML = error.message;
      });
});
