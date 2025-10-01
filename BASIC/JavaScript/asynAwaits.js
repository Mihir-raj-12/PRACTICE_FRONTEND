function output (msg){
let show = document.getElementById("show");
 let p = document.createElement("p");
    p.innerHTML = msg ;
    show.appendChild(p);  

}


function brushTeeth(){
return new Promise ((resolve,reject) => {

    setTimeout(() => {
        resolve("Brushed teeth")
    }, 1000);

})

}

function haveBreakfast(){
return new Promise (function(resolve,reject){

    setTimeout(() => {
    resolve("Had Breakfast")
    }, 1500);
    
})
}

function gotoWork (){

    return new Promise ((resolve,reject)=>{
        setTimeout(() => {
            resolve("Reached office");
        }, 1000);

    }) 
}

async function start(){

    try{
    let c1 = await brushTeeth();
    output(c1);
      let c2 = await haveBreakfast();
    output(c2);

      let c3= await gotoWork ();
    output(c3);



    }
    catch(error){

    }


}
start();

