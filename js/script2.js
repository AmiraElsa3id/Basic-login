var signupLink = document.getElementById("signupLink");
var loginbox = document.getElementById("login-box");
var signupbox = document.querySelector(".signup-box");
var loginBtn = document.getElementById("loginBtn");
var signupBtn = document.getElementById("signupBtn");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail = document.getElementById("signinEmail");
var signinPassword = document.getElementById("signinPassword");
var navBar = document.getElementById("nav");
var output = document.getElementById("output");
var logoutBtn = document.getElementById("logoutBtn");
var paragraph = document.getElementById("paragraph");

var regex = {
    uname: /^[a-zA-Z0-9 ]{1,10}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    pass: /^[a-zA-Z0-9 ]{1,10}$/
    // pass:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g 
    // Minimum eight characters, at least one letter and one number:
};

var logedIn = null;
var users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

if (localStorage.getItem("loged") !== null) {
    logedIn = JSON.parse(localStorage.getItem("loged"));
    displayWelcome(logedIn);
}

signupLink.addEventListener("click", function () {
    if (signupLink.innerHTML === "Sign Up") {
        signupbox.classList.remove("d-none");
        loginbox.classList.add("d-none");
        signupLink.innerHTML = "Sign In";
    } else if (signupLink.innerHTML === "Sign In") {
        signupbox.classList.add("d-none");
        loginbox.classList.remove("d-none");
        signupLink.innerHTML = "Sign Up";
    }
});

function validateSignup(data) {
    return regex.uname.test(data.signupName) && regex.email.test(data.signupEmail) && regex.pass.test(data.signupPassword);
}

function validateSignin(data) {
    return regex.email.test(data.signinEmail) && regex.pass.test(data.signinPassword);
}

signupBtn.addEventListener("click", signup);
function signup() {
    var user = {
        signupName: signupName.value,
        signupEmail: signupEmail.value.toLowerCase(),
        signupPassword: signupPassword.value
    };
    var validation = validateSignup(user);
    if (validation) {
        var found = users.some(u => u.signupEmail === user.signupEmail);
        if (found) {
            document.getElementById("exist").innerHTML = "This email has already been used";
        } else {
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            signupbox.classList.add("d-none");
            loginbox.classList.remove("d-none");
            signupName.value = null;
            signupEmail.value = null;
            signupPassword.value = null;
            document.getElementById("exist").innerHTML = "";
        }
    } else {
        document.getElementById("exist").innerHTML = "Please enter a valid name, email, and password";
    }
}

loginBtn.addEventListener("click", login);
function login() {
    var user = {
        signinEmail: signinEmail.value.toLowerCase(),
        signinPassword: signinPassword.value
    };
    var validation = validateSignin(user);
    if (validation) {
        var found = users.find(u => u.signupEmail === user.signinEmail && u.signupPassword === user.signinPassword);
        if (found) {
            logedIn = found.signupName;
            signinEmail.value = null;
            signinPassword.value = null;
            displayWelcome(logedIn);
            localStorage.setItem("loged", JSON.stringify(logedIn));
        } else {
            document.getElementById("incorrect").innerHTML = "Incorrect email or password";
        }
    } else {
        document.getElementById("incorrect").innerHTML = "Incorrect email or password";
    }
}

logoutBtn.addEventListener("click", logout);
function logout() {
    navBar.classList.add("d-none");
    output.classList.add("d-none");
    loginbox.classList.remove("d-none");
    paragraph.classList.remove("d-none");
    document.getElementById("incorrect").innerHTML = "";
    localStorage.removeItem("loged");
}

function displayWelcome(name) {
    output.classList.remove("d-none");
    output.innerHTML = `Welcome ${name}`;
    navBar.classList.remove("d-none");
    loginbox.classList.add("d-none");
    paragraph.classList.add("d-none");
}