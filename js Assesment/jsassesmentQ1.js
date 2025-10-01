let button = document.getElementById("Button");

let PastName = document.getElementById("Pname");
let PastOrder = document.getElementById("Porder");

let historyName = [];
let historyOrder = [];

let order = button.addEventListener("click", function(){
    let name  = prompt("what is Your Name");

    console.log(name);

    let orderask = prompt("Enter your order");
    let orderlist = orderask.split(",");

    console.log(orderlist);

    let result ;

    for(let i =0 ; i<orderlist.length ; i++){

        // let char  = orderlist[i].split("");
        // console.log(char);
        // let cap = char[0].toUpperCase();
        // console.log(cap);
        // result = cap + char;
    }

    console.log(result);

    let purchase = document.getElementById("Order");
    

    if (orderask.length == 0){
        alert("Order Skipped!")
        purchase.innerHTML = ``
    }
    else{
        purchase.innerHTML = `Hello ${name} ! Your Order  ${orderlist} will be ready soon`
    }

    historyName.push(name);
    historyOrder.push(orderask);

    // PastName.innerHTML = historyName;
    // PastOrder.innerHTML = historyOrder;

})



