document.getElementById("loginForm").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailField = document.getElementById("email");
  const passwordField = document.getElementById("password");

  firebase.auth().signInWithEmailAndPassword(email, password)
    .then(() => {
      location.replace("home.html");
    })
    .catch((error) => {
      const errorMessage = error.message;
      if (errorMessage.includes('password')) {
        passwordField.insertAdjacentHTML('afterend', '<p class="error-message" style="margin-left: 1px;">Incorrect email or password</p>');
      } else {
        passwordField.insertAdjacentHTML('afterend', '<p class="error-message" style="margin-left: 1px;">Incorrect email or password</p>');
      }
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
