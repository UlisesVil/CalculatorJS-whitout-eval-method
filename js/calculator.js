"use strict"
window.onload =function(){
    document.onkeypress = keys;
}


function keys(event){
    
    console.log(String.fromCharCode(event.charCode));
    opLine.innerHTML+=String.fromCharCode(event.charCode);
   
}

let opLine = document.getElementById("opLine");
let resLine = document.getElementById("resLine");
const buttons= document.getElementById("numbers");




//Replace last if it's an operator and we press another operator
    let operationComplete = false;
    const last = () => opLine.innerHTML.substring(opLine.innerHTML.length-1)

opLine.innerHTML=0;
resLine.innerHTML=0;
    

function dot(){
    let dot=".";
    let obtaindot = opLine.innerHTML;
    let dotpos= obtaindot.lastIndexOf(dot)
    console.log(dotpos);

    let plus="+";
    let obtainplus = opLine.innerHTML;
    let pluspos= obtainplus.lastIndexOf(plus)
    console.log(pluspos);

    let min="-";
    let obtainmin = opLine.innerHTML;
    let minpos= obtainmin.lastIndexOf(min)
    console.log(minpos);

    let mult="*";
    let obtainmult = opLine.innerHTML;
    let multpos= obtainmult.lastIndexOf(mult)
    console.log(multpos);

    let div="/";
    let obtaindiv = opLine.innerHTML;
    let divpos= obtaindiv.lastIndexOf(div)
    console.log(divpos);

    let pow="^";
    let obtainpow = opLine.innerHTML;
    let powpos= obtainpow.lastIndexOf(pow)
    console.log(powpos);



    if(pluspos==-1 && dotpos==-1 || dotpos==-1 && minpos==-1 ||dotpos==-1 && multpos==-1 ||dotpos==-1 && divpos==-1 ||dotpos==-1 && powpos==-1 ){
        opLine.innerHTML=opLine.innerHTML+dot;
        console.log(dotpos);
        console.log(pluspos);
            }
    if(pluspos>dotpos || minpos>dotpos || multpos>dotpos || divpos>dotpos || powpos>dotpos){
        opLine.innerHTML=opLine.innerHTML+dot;
        console.log(dotpos);
        console.log(pluspos);
    }
    

}



    let typing = text =>{
        if(opLine.innerHTML == 0) opLine.innerHTML = "";

        if(operationComplete && isNaN(text)){   //*1
            opLine.innerHTML = resLine.innerHTML;
            operationComplete = false;
            console.log(operationComplete);
        }
        if(operationComplete && !isNaN(text)){   //*1
            opLine.innerHTML="";
            resLine.innerHTML= "0";
            operationComplete = false;
            console.log(operationComplete);

        }

        if(isNaN(last()) && isNaN(text)){
        opLine.innerHTML=opLine.innerHTML.substring(0,opLine.innerHTML.length-1)
        }
        
        opLine.innerHTML+=text;
    }


//Clear all
    function clear (){   
        let clean = 0;
        resLine.innerHTML = clean;
        opLine.innerHTML = clean;
        }


//Buttons action press
    buttons.addEventListener("click", e =>{
        if(e.target.innerHTML !== ""){
            switch (e.target.innerHTML){
                case "C":  clear(); break;
                case "+/-":  changeSign(); break;
                case "BS":  backSpace(); break;
                case "=":  ""; break;        //it's empty because its function is in operate() and interfere in *1
                case ".": dot();

               
               default: typing(e.target.innerHTML); break;
            }
        }
    })

                               
//Change Sign +/-
const lastValue = () => opLine.innerHTML.substring(opLine.innerHTML.length-1)

const changeSign=()=>{
    let lastNumber= "";
    let position = 0;

    if (!isNaN(lastValue())){
        for (let i = opLine.innerHTML.length-1; i>0; i--){
            if(isNaN(opLine.innerHTML[i])){
                position = i+1;
                break;
            }
        } 
    }
    lastNumber = opLine.innerHTML.substring(position);
    opLine.innerHTML=opLine.innerHTML.replace(lastNumber, `( ${lastNumber*-1})`)
}


//Back Spase
function backSpace(){
    let array= opLine.innerHTML.split("");
    console.log(array);
    array.pop();
    console.log(array);

    let newarray= array.join("");
    console.log(newarray);

    opLine.innerHTML=newarray;
    console.log(opLine.innerHTML);
}


//Main Function whitout eval() method
    function operate(s) { 
        // --- Parse a calculation string into an array of numbers and operators 
        var calculation = [], current = ''; 
        for (var i = 0, ch; ch = s.charAt(i); i++) {
            if ('()^*/+-'.indexOf(ch) > -1) {
                if (current == '' && ch == '-') {
                    current = '-'; 
                    } else { 
                        calculation.push(parseFloat(current), ch); current = ''; 
                    } 
                } else { current += s.charAt(i); } 
            } if (current != '') { 
                calculation.push(parseFloat(current)); 
            } return calculation;
        } function calculate(calc) { 
            // --- Perform a calculation expressed as an array of operators and numbers 
            var ops = [{'^': (a, b) => Math.pow(a, b)}, 
            {'*': (a, b) => a * b, '/': (a, b) => a / b}, 
            {'+': (a, b) => a + b, '-': (a, b) => a - b}], 
            newCalc = [], currentOp; 
            for (var i = 0; i < ops.length; i++) { 
                for (var j = 0; j < calc.length; j++) { 
                    if (ops[i][calc[j]]) { 
                        currentOp = ops[i][calc[j]]; 
                    } else if (currentOp) { 
                        newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]); 
                        currentOp = null;
                    } else { 
                        newCalc.push(calc[j]); 
                    } 
                    console.log(newCalc); 
                } calc = newCalc; newCalc = []; 
            } 
            if (calc.length > 1) { 
                console.log('Error: unable to resolve calculation'); 
                return calc; 
            } else { 
                return calc[0]; 
            } 
        } 
        var buttonEq = document.getElementById('buttonEq'), 
            userInput = document.getElementById('opLine'), 
            result = document.getElementById('resLine');

            buttonEq.addEventListener('click', function() { 
                result.innerHTML = calculate(operate(userInput.innerHTML));
                operationComplete=true; // *1
            }); 



//Evento Keypress
let input = document.getElementById("button1");    //esta linea no es necesaria ya que esta declarada mas arriba pero se deja con fines ilustrativos
input.addEventListener("keypress", function(event){
console.log("[keypress]Tecla presionada", String.fromCharCode(event.keyCode));
});



/*
buttonDot.addEventListener("click",function(){
let searchDot = ".";
let indexOfFirst = result.innerHTML.indexOf(searchDot); 
console.log(indexOfFirst);
let searchPlus = "+";
let lastIndexOf = result.innerHTML.lastIndexOf(searchPlus);
let lastIndexOfDot = result.innerHTML.lastIndexOf(searchDot);    
console.log(lastIndexOfDot);
console.log(lastIndexOf);        
if(indexOfFirst<0){
            let actual = result.innerHTML;
            let sumado = buttonDot.innerHTML;
            result.innerHTML = actual + sumado;
        }
        if(lastIndexOf>-1 ){
            let actual = result.innerHTML;
            let sumado = buttonDot.innerHTML;
            result.innerHTML = actual + sumado;
        }
        if(lastIndexOfDot=2){
            let actual = result.innerHTML;
            let sumado = "";
            result.innerHTML = actual + sumado;
            
        }
        else{
            let actual = result.innerHTML;
            let sumado = "";
            result.innerHTML = actual + sumado;
        }
          
      });
      */

      /*
  ///////////////////////////////////        
        const searchDot = ".";
    const indexOfFirst = result.innerHTML.indexOf(searchDot); 
    console.log(indexOfFirst);

    if(indexOfFirst<0){
        let actual = result.innerHTML;
        let sumado = buttonDot.innerHTML;
        result.innerHTML = actual + sumado;
    }
    else{
        let actual = result.innerHTML;
        let sumado = "";
        result.innerHTML = actual + sumado;
    }*/

