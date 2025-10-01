function Showmsg (msg){
    let output = document.getElementById("output");
    let p = document.createElement("p");
    p.innerHTML = msg ;
    output.appendChild(p);
 
}


function chopVegetablles() {
    return new Promise((resolve,reject) => {

        setTimeout(() => {
            resolve("Chopped vegetables");
        }, 1000);

    })
}

function cookMeal() {
    return new Promise((resolve,reject) => {

        setTimeout(() => {
            resolve("Cooked the meals");
        }, 1500);

    })
}

function setTable() {
    return new Promise((resolve,reject) => {

        setTimeout(() => {
            resolve("Table is set");
        }, 1000);

    })
}

async function start() {
    
    try {
        let c1 = await chopVegetablles();
        Showmsg(c1);
        let c2 = await cookMeal();
        Showmsg(c2);
        let c3 = await setTable();
        Showmsg(c3);

        Showmsg("Finished");

    } catch (error) {
        
    }

}

// let button  = document.getElementById("click");
// button.addEventListener("click",start);