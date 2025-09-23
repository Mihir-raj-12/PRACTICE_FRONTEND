let bill = document.getElementById("bill");
let generate = document.getElementById("generate");
let billList = [];
let tipFinalList= [];
let finalBillAmountList = [];

let bill_num = generate.addEventListener("click",function(){
   

    let amount = parseInt(bill.value);
    let result = document.getElementById("result");
    let tip;
    
    if(amount >50 && amount <300){
        tip= (amount*15)/100;
    }
    else{
        tip= (amount*20)/100;
    }

    let finalAmount = amount + tip;

    result.innerHTML = `Your bill is ${amount} and tip on the bill is ${tip} \n Final Amount is ${finalAmount}`;

    billList.push(amount);
    tipFinalList.push(tip);
    finalBillAmountList.push(finalAmount);

    let finalBillList = document.getElementById("List");
    finalBillList.innerHTML = billList

    let tiplist = document.getElementById("tipList");
    tiplist.innerHTML = tipFinalList;

    let amountList = document.getElementById("finalAmountList");
    amountList.innerHTML = finalBillAmountList;

    let sum = 0;

    let averageList = []
    let average = function(){
    
        for(let i=0;i<finalBillAmountList.length;i++){
            sum = sum + finalBillAmountList[i];
        }
        
        let avg = sum/finalBillAmountList.length

        return avg
    }

    averageList.push(average());


    let avgAmount = document.getElementById("avgAmount");
    avgAmount.innerHTML = averageList;

}
)




