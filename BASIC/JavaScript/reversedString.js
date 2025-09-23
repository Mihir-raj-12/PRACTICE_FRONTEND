// let FullName = "Mihir is smart";
// let reversed = ""

// for(let i=FullName.length; i > 0 ; i--){

// reversed = reversed + FullName[i -1];
// }
// console.log(reversed);

let mark1 = document.getElementById("mark1");
let mark2 = document.getElementById("mark2");
let mark3 = document.getElementById("mark3");

mark1 =parseInt( prompt("enter mark 1"));
console.log(mark1);
mark1.innerHTML(mark1);

mark2 =parseInt( prompt("enter mark 2"));
console.log(mark2) ;
mark1.innerHTML(mark2);

mark3 =parseInt(prompt("enter mark 3"));
console.log(mark3);
mark1.innerHTML(mark3);

let sum = mark1 + mark2 + mark3 ;
console.log(sum);

let percentage = document.getElementById("final")

percentage  = sum / 3 ;
console.log(percentage);

if(percentage >=80){
    console.log("A")
}
else if(percentage >=60 && percentage < 80){
    console.log("B")
}
else if(percentage >=40 && percentage <60){
    console.log("c")
}
else{
    console.log("Failed")
}


