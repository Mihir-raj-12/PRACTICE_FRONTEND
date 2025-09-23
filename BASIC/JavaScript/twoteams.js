// let scoresDolphines = [96,108,89];
// let scoresKoalas = [88,91,110];

let scoresDolphines = [97,112,101];
let scoresKoalas = [109,95,112];

let avgdol  = function(){

    let sum = 0;
    for(let i=0;i<scoresDolphines.length;i++){
        sum = sum + scoresDolphines[i];
    }

    let avg = sum/scoresDolphines.length

    return avg;
}

let avgkol  = function(){

    let sum = 0;
    for(let i=0;i<scoresKoalas.length;i++){
        sum = sum + scoresKoalas[i];
    }

    let avg = sum/scoresKoalas.length

    return avg;
}


if(avgdol  > avgkol){
    if(avgdol >100){
    console.log("dolphins wins");
    }
    else{
        console.log("dolphins have higher avg but less than 100");
    }
}
else if(avgdol < avgkol){
    if(avgkol >100){
    console.log("koalas wins");
    }
    else{
        console.log("koalas have higher avg but less than 100");
    }
}
else if(avgdol = avgkol && avgdol > 100 && avgkol > 100){
    console.log("draw");



    // hellloo
}
