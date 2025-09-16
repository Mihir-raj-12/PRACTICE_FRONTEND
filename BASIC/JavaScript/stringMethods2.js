let button = document.getElementById("button");

let count = button.addEventListener("click",
    function(){
       let Sentence =  prompt("Enter your Sentence here");
       let words = Sentence.split(" ").length;
       let vowelcounter  = 0;
       for(let i=0;i<Sentence.length;i++){
        let char = Sentence[i].toLowerCase();

        if(char == "a" || char == "e" ||char ==  "i" || char == "o" || char == "u"){
            vowelcounter++;
        }
       };

       let final = document.getElementById("final");
       final.innerHTML = `number of words are ${words} and number of vowels are ${vowelcounter} in given Sentence`;

    }
);