var log= document.getElementById("login")
var reg= document.getElementById("register")
var btn= document.getElementById("btn")

function register(){
    log.style.left="-400px"
    reg.style.left="50px"
    btn.style.left="110px"

}
function login(){
    log.style.left="50px"
    reg.style.left="450px"
    btn.style.left="0px"

}


function validate(){
var uname = document.getElementById("user")
var pas= document.getElementById("pass")
var maiil= document.getElementById("mail") 
var dobb = document.getElementById("dob") 
var fnames = document.getElementById("fname")

   if(uname.value.trim() =="" || pas.value=="" ){
   
      alert("leave no blanks");
       return false;
   }
   else{
    alert("Login Successful! 👍️ ")
true;   
   }
}

function inform(){
var dobb = document.getElementById("dob") 
var fnames = document.getElementById("fname")
var pas= document.getElementById("pass")

if (fnames.value.trim() =="" ){
    alert("User ID blank");
    uname.style.border= "solid 2px red";
    return false;
}
else if (pas.value.trim() =="" ){
    alert("Password blank");
    return false;
}
else if (pas.value.trim().length <5 ){
    alert("Short password");
    return false;
}
else{
    true;
}
}

function verify(){
var maiil= document.getElementById("mail") 
var dobb = document.getElementById("dob") 
var fnames = document.getElementById("fname")

   if(fnames.value.trim() =="" || dobb.value=="" ){
   
       alert("leave no spaces");
       return false;
   }
   else{
    alert("Account successfully created! 😊️ Thank you for joining us 🤝️")
true;
   }
}  