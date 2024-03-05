const express = require("express");
const path = require("path");
const collection = require("./config");
const bcrypt = require('bcrypt');

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

app.get("/", (req, res) => {
    res.render("login", { loginErrors: null });
});

app.get("/signup", (req, res) => {
    res.render("signup", { signupErrors: null });
});

app.post("/signup", async (req, res) => {
    const { username, email, password, confirmPassword } = req.body; // Updated name to username
    const signupErrors = [];

    // Check if passwords match
    if (password !== confirmPassword) {
        signupErrors.push("Passwords do not match.");
    }

    // Check for other validation rules...

    if (signupErrors.length > 0) {
        res.render("signup", { signupErrors });
        return;
    }

    const existingUser = await collection.findOne({ $or: [{ name: username }, { email }] }); // Updated name to username

    if (existingUser) {
        signupErrors.push('Username or email already exists. Please choose different credentials.');
        res.render("signup", { signupErrors });
        return;
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const userData = await collection.create({
        name: username, // Updated name to username
        email,
        password: hashedPassword,
    });

    console.log(userData);
    res.render("home");
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body; // Updated name to username
        const check = await collection.findOne({ name: username });

        if (!check) {
            res.render("login", { loginErrors: ["Username not found."] });
            return;
        }

        const isPasswordMatch = await bcrypt.compare(password, check.password);

        if (!isPasswordMatch) {
            res.render("login", { loginErrors: ["Incorrect password."] });
            return;
        }

        res.render("home");
    } catch (error) {
        res.render("login", { loginErrors: ["Incorrect details."] });
    }
});

const port = 5000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
