let button = document.getElementById("button");

let givenString  = button.addEventListener("click", function(){
    let mystring= ["apple", "banana", "kiwi", "grape", "blueberry"];

    let newString = mystring.filter(Element => {
        return Element.length > 5;
    });

    let upper = newString.map(Element => {
        return Element.toUpperCase();
    });
    //     mystring.forEach(element => {
    //     if(element.length > 5){
    //         newString.push(element);
    //         upper.push(element.toUpperCase()) 
    //     }

    // for(let i=0;i<mystring.length;i++){
    //     if(mystring[i].length > 5){
    //         newString.push(mystring[i]);
    //     }
    // }

    let length = document.getElementById("length");
    length.innerHTML = newString ; 
    
    let capitalized = document.getElementById("capitalized");
    capitalized.innerHTML = upper;
    
    });
    
