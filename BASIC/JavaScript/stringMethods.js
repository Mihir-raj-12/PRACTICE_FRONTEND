
let username = document.getElementById("username");

let fullname =username.addEventListener("click",function(){
    let fullname = prompt("Enter Your FullName");
    let length = fullname.length;
    let initials  = fullname[0];
    let lastname = fullname.split(" ")[1];

    let final = document.getElementById("final");
    final.innerHTML = `your username is @${initials}${lastname}${length}`;
});





