let button = document.getElementById("button");

let initils = button.addEventListener("click", function(){
    let initils  = prompt("Enter your Initials");
    let final  = initils.split(" ");
    let result = "";
    for(let i = 0 ; i<final.length ;i++){
    let char = final[i][0];
        result = result + char ;
        if(final.length < -1)
    };

    let finalresult  = document.getElementById("final");
    finalresult.innerHTML = result ; 
})