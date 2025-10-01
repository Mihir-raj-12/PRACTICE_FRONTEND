let output  = document.getElementById("output");
let start  = document.getElementById("start");
let reset = document.getElementById("reset");


function show (msg){
    let print  = document.getElementById("print");
    let p = document.createElement("p");
    p.innerHTML = msg;
    print.appendChild(p);
}

function resetShow(){
    print.innerHTML = '';
}


let todayTask = ["prepare breakfast", "wash dishes","make coffe"];

// let final = todayTask.map(Element=> {

//     let trimed = Element.trim();
//     let upper = trimed.charAt(0).toUpperCase();
//     let rest  = trimed.slice(1);
//     return upper+rest;

// })

let final = todayTask.map((Element,index)=> {

    let trimed = Element.trim();
    let upper = trimed.charAt(0).toUpperCase();
    let rest  = trimed.slice(1);
    let final = `${index+1})${upper}${rest}${"<br>"}`
    console.log(`${index+1}${upper}${rest}`)
    // return index+1+")"+upper+rest+"<br>";
    return final;
})



output.innerHTML = `Click to Start Routine <br> Today's Task <br> ${final} `;



// let task = final.map( (item , index) => {

// output.innerHTML = index + item;

// } 
// )




// start.addEventListener("click",

//     output.innerHTML = final
// )

// output.innerHTML = final.forEach(Element){

// }



function prepareBreakfast (){

    return new Promise ( function (res,rej){
        setTimeout(() => {
            let suc  = true ;
            if(suc == true){
                res("Preaparing Breakfast right now");
            }
            else{
                rej("error in breakfast");
            }
        }, 1000);
    }
    )
}



function washDishes (){

    return new Promise ( function (res,rej){
        setTimeout(() => {
            let suc  = true ;
            if(suc == true){
                res("WAshing Dishes right now");
            }
            else{
                rej("error in Washing");
            }
        }, 1000);
    }
    )
}


function makeCoffee (){

    return new Promise ( function (res,rej){
        setTimeout(() => {
            let suc  = true ;
            if(suc == true){
                res("Making coffee right now");
            }
            else{
                rej("error in Making Coffee");
            }
        }, 1000);
    }
    )
}

async function Mstart(){

try{
let c1 = await prepareBreakfast();
show(c1);
let c2 = await washDishes();
show(c2);
let c3 = await makeCoffee();
show(c3);

}

catch(error){
show("Something is Wrong");
}
}



start.addEventListener("click" , Mstart);

rest.addEventListener("click", resetShow);