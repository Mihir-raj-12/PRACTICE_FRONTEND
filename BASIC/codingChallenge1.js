function bmi (mass,height){
    return mass/(height*height);
}

let john1 = {
    mass : 92,
    height : 1.95

};

let mark1 = {
    mass : 78,
    height :1.69
}

let john2 = {
    mass : 85,
    height : 1.76

};

let mark2 = {
    mass : 95,
    height :1.88
}


let johnbmi1=bmi(john1.mass,john1.height);
let markbmi1=bmi(mark1.mass,mark1.height);

let johnbmi2=bmi(john2.mass,john2.height);
let markbmi2=bmi(mark2.mass,mark2.height);

console.log("john 1 bmi is" + johnbmi1);
console.log("mark 1 bmi is  "+markbmi1);

let Markhigerbmi1 = markbmi1 > johnbmi1

console.log("john 2 bmi is" + johnbmi2);
console.log("mark 2 bmi is  "+markbmi2);

let Markhigerbmi2 = markbmi2 > johnbmi2


if(Markhigerbmi1){
    console.log("is mark1 bmi is higher "+Markhigerbmi1);
}
else{
    console.log("john1 have higher bmi")
}

if(Markhigerbmi2){
    console.log("is mark2 bmi is higher "+Markhigerbmi2);
}
else{
    console.log("john2 have higher bmi")
}




