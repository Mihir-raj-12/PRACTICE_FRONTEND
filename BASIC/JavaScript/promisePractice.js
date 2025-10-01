function output(msg){
let print = document.getElementById("print");
let p = document.createElement("p");
p.innerHTML = msg;
print.appendChild(p);
}


function firstname (){
return new Promise (
function(res,rej){
setTimeout(() => {
    let suc = true ;
    if (suc == true){
        res("Mihir")
    }else{
        rej("no")
    }
}, 1000);
}
)
}

function middlename (){
return new Promise (
function(res,rej){
setTimeout(() => {
    let suc = true ;
    if (suc == true){
        res("vikramsinh")
    }else{
        rej("no")
    }
}, 1000);
}
)
}

function lastname (){
return new Promise (
function(res,rej){
setTimeout(() => {
    let suc = true ;
    if (suc == true){
        res("Raj")
    }else{
        rej("no")
    }
}, 1000);
}
)
}

async function start(){
try{
let c1 =await firstname();
console.log(c1);
output(c1);
let c2 =await middlename();
console.log(c2);
output(c2);
let c3 =await lastname();
console.log(c3);
output(c3);
}
catch(error){
// let c1 = console.log("error in your function")
output("Error occured somewhere");
}
}

let button = document.getElementById("button");
button.addEventListener("click", start);



//   let formatedList = orderlist.map(item => {

//         let trimedlist = item.trim();
//         let upper = trimedlist.charAt(0).toUpperCase();
//         let rest = trimedlist.slice(1);

//         return upper+rest;
//     })


// let mypromise  = new Promise(
// function(res,rej){
// setTimeout(() => {
//     let sec = false;
//     if(sec == true){
//         res("sucess");
//     }else{
//         rej("rejected");
//     }
// }, 1500);
// })

// mypromise.then(
// function(value){
//     console.log(value);
// }).catch(function(value){
//     console.log(value)
// }
// )

// async function start(){
// try{
// let c1 = await mypromise;
// console.log(c1);
// }
// catch(error){
// console.log(error);
// }
// }
// start();