var signupLink = document.getElementById("signupLink");
var loginbox = document.getElementById("login-box");
var signupbox = document.querySelector(".signup-box");
var loginBtn = document.getElementById("loginBtn");
var signupBtn = document.getElementById("signupBtn");
var signupName = document.getElementById("signupName");
var signupEmail = document.getElementById("signupEmail");
var signupPassword = document.getElementById("signupPassword");
var signinEmail =document.getElementById("signinEmail");
var signinPassword =document.getElementById("signinPassword");
var navBar= document.getElementById("nav");
var output=document.getElementById("output");
var logoutBtn=document.getElementById("logoutBtn");
var paragraph=document.getElementById("paragraph");
var regex = {
    uname: /^[a-zA-Z0-9 ]{1,10}$/,
    email: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
    pass: /^[a-zA-Z0-9 ]{1,10}$/
    // pass:/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/g 
    // Minimum eight characters, at least one letter and one number:
}
var logedIn=null;
var users;
if (localStorage.getItem("users") === null) {
    users = [];
}
else {
    users = JSON.parse(localStorage.getItem("users"));
}
if (localStorage.getItem("loged") !== null) {
    logedIn = JSON.parse(localStorage.getItem("loged"));
    output.classList.remove("d-none");
            output.innerHTML=`Welcome ${logedIn}`;
            navBar.classList.remove("d-none")
            loginbox.classList.add("d-none");
            paragraph.classList.add("d-none")
}



signupLink.addEventListener("click", function (e) {
    if (signupLink.innerHTML == "Sign Up") {
        signupbox.classList.remove("d-none");
        loginbox.classList.add("d-none");
        signupLink.innerHTML = "Sign In";
    }
    else if (signupLink.innerHTML == "Sign In") {
        signupbox.classList.add("d-none");
        loginbox.classList.remove("d-none");
        signupLink.innerHTML = "Sign Up"
    }
})

function validateSignup(data) {
    // && regex.pass.test(signupPassword)
    return (regex.uname.test(data.signupName) && regex.email.test(data.signupEmail)&& regex.pass.test(data.signupPassword))
}
function validateSignin(data){
    return (regex.email.test(data.signinEmail)&& regex.pass.test(data.signinPassword))
}
signupBtn.addEventListener("click", signup);
function signup() {
    var user = {
        signupName: signupName.value,
        signupEmail: signupEmail.value.toLowerCase(),
        signupPassword: signupPassword.value
    }
   var validation =validateSignup(user);
   console.log(validation);
    if (validation) {
        console.log()
        var found = false;
        var i = 0;
            for (; i < users.length; i++) {
            if (user.signupEmail == users[i].signupEmail) {
                found = true;
                break;
            }
        }

        if (found) {
            document.getElementById("exist").innerHTML = "this email has already been used";
        }
        else {
            users.push(user);
            localStorage.setItem("users", JSON.stringify(users));
            signupbox.classList.add("d-none");
            loginbox.classList.remove("d-none");
            signupName.value=null;
            signupPassword.value=null;
            signupEmail.value=null;
            console.log(users)
            document.getElementById("exist").innerHTML = null;
        }
    }
    else {
        document.getElementById("exist").innerHTML = "please Enter a valid name , email and password";
    }

}
loginBtn.addEventListener("click",login);
function login(){
    var user = {
        signinEmail: signinEmail.value.toLowerCase(),
        signinPassword: signinPassword.value
    }
    var validation =validateSignin(user);
    if(validation){
        var found =false;
        console.log(validation);
        console.log(navBar)
        console.log(loginbox)
        for(var i =0;i<users.length;i++){
        if (user.signinEmail==users[i].signupEmail&&user.signinPassword==users[i].signupPassword) {
            found=true;
            logedIn=users[i].signupName;
            break;
        }
    }
    if(found){
            signinEmail.value=null;
            signinPassword.value=null;
            output.classList.remove("d-none");
            output.innerHTML=`Welcome ${users[i].signupName}`;
            navBar.classList.remove("d-none")
            loginbox.classList.add("d-none");
            paragraph.classList.add("d-none")
            console.log(logedIn);
            localStorage.setItem("loged",JSON.stringify(logedIn));
    }else{
        document.getElementById("incorrect").innerHTML ="incorrect email or password";
    }
    }else{
        document.getElementById("incorrect").innerHTML ="incorrect email or password";
    }
    
}
logoutBtn.addEventListener("click",logout);
function logout(){
    navBar.classList.add("d-none");
    output.classList.add("d-none");
    loginbox.classList.remove("d-none");
    paragraph.classList.remove("d-none");
    document.getElementById("incorrect").innerHTML=null;
    localStorage.removeItem("loged");

}