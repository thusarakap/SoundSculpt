document.getElementById("loginForm").addEventListener("submit", (event) => {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(() => {
        location.replace("welcome.html");
      })
      .catch((error) => {
        document.getElementById("error").innerHTML = error.message;
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
