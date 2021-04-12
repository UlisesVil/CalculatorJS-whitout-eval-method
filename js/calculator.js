"use strict"

let opLine = document.getElementById("opLine");
let resLine = document.getElementById("resLine");
const buttons= document.getElementById("numbers");

//Replace last if it's an operator and we press another operator
let operationComplete = false;
const last = () => opLine.innerHTML.substring(opLine.innerHTML.length-1);
opLine.innerHTML="+";
resLine.innerHTML=0;

//Writing Numbers
let typing = text =>{
    if(opLine.innerHTML == "+" && text==".") opLine.innerHTML += "0.";
    if(opLine.innerHTML == "+" && text=="-") opLine.innerHTML == "-";

    if(operationComplete && text=="."){
        opLine.innerHTML = "+.";
        resLine.innerHTML = "0";
        operationComplete = false;
    }

    if(operationComplete && isNaN(text)){   //*1
        //remove comas after operate
        let extractComa=[];
        for(let i=0; i<=resLine.innerHTML.length-1; i++){
            if(resLine.innerHTML[i]!=","){
                extractComa.push(resLine.innerHTML[i]);
            }
        }

        let noComa=extractComa.join("");
        resLine.innerHTML=noComa;
        opLine.innerHTML = resLine.innerHTML;
        operationComplete = false;
    }

    if(operationComplete && !isNaN(text)){
        opLine.innerHTML="+";
        resLine.innerHTML= "0";
        operationComplete = false;
    }

    if(isNaN(last()) && isNaN(text)){
        opLine.innerHTML=opLine.innerHTML.substring(0,opLine.innerHTML.length-1);
    }
    //input character restrictor
    if(opLine.innerHTML.length>17){
        text=""
        opLine.innerHTML+=text;
    }
    
    //REGEX Last number group dot Control
    let regexEnd=/\W{1}?\d{0,20}\.\d{0,20}$/g;
    let resultEnd= regexEnd.test(opLine.innerHTML);
    
    if(resultEnd && text=="."){
        opLine.innerHTML;
    }else{
        opLine.innerHTML+=text;
    }
}

//Clear Function
function clear (){   
    let clean = "+";
    resLine.innerHTML = 0;
    opLine.innerHTML = clean;
}

//Buttons action press
buttons.addEventListener("click", e =>{
    let key = e.target.innerHTML;
    let keys = "0123456789/-+*^CBS=."
    let findIndex = keys.indexOf(key);
    if(e.target.innerHTML !== "" && findIndex>-1){
        switch (e.target.innerHTML){
            case "C":  clear(); 
            break;
            case "BS":  backSpace(); 
            break;
            case "=":  "";
            break;       
            case ".": dot(); //this was dot()
            default: typing(e.target.innerHTML); 
            break;
        }
    }
});


// Keys control
let buttons2 = document.getElementsByClassName("buttons");
let array_de_strings = [];

for (var i = 0; i < buttons2.length; i++) {
    array_de_strings.push(buttons2[i].textContent);
}

let newarray=array_de_strings.join(', ');
function playkey(e){
    let key2=String.fromCharCode(e.keyCode);
    let busqueda = array_de_strings.find(element=> element == key2);
    if(busqueda !== undefined){
        switch (busqueda){
            case "C":  clear(); 
            break;
            case "BS":  backSpace(); 
            break;
            case "=":  "";
            break;        
            case ".": dot();
            default: typing(busqueda); 
            break;
        }
    }

    if(e.keyCode=="66"||String.fromCharCode(e.keyCode)=="b"){
        backSpace();
    }

    if( String.fromCharCode(e.keyCode)==buttonEq.innerHTML || e.keyCode=="13"){
        result.innerHTML = calculate(operate(userInput.innerHTML));
        operationComplete=true;
    }

    if( String.fromCharCode(e.keyCode)=="c"){
        clear();
    }   
}
window.addEventListener("keypress",playkey);


// Function Dot Button       
function dot(){
    if(opLine.innerHTML.length > 0) {
        let lastdig = opLine.innerHTML[opLine.innerHTML.length - 1];
        let array = opLine.innerHTML.split(' ');
        let regexStart=/^\W{1}?\d{0,20}\.?\d{0,20}/g;
        let resultS= regexStart.test(opLine.innerHTML);
        if ( lastdig == '+' || lastdig == '-' || lastdig == '*'|| lastdig == '/'|| lastdig == '^'|| lastdig == '('|| lastdig == ')') {
            opLine.innerHTML += '0.';
        } else if (array[array.length - 1].indexOf('.') == -1) {
            opLine.innerHTML += '.';
        }else if (resultS) {
            let array = opLine.innerHTML.split(' ');
            opLine.innerHTML = array[0];
        }	
    }else {
        opLine.innerHTML += '0.';
    } 
}

//Back Spase
function backSpace(){
    let array= opLine.innerHTML.split("");
    array.pop();
    let newarray= array.join("");
    opLine.innerHTML=newarray;
}

//Main Function whitout eval() method
function operate(userV) { 
    //Parse a calculation string into an array of numbers and operators 
    var calculation = []; 
    var current = ''; 
    for(var i = 0, char1; char1 = userV.charAt(i); i++) {
        if('()^*/+-'.indexOf(char1) > -1) {
            if(current == '' && char1 == '-') {
                current = '-'; 
            }else{ 
                calculation.push(parseFloat(current), char1); 
                current = ''; 
            } 
        }else{ 
            current += userV.charAt(i); 
        } 
    } 
    if(current != '') { 
        calculation.push(parseFloat(current)); 
    }
    return calculation;
}

function calculate(calc){ 
    //Perform a calculation expressed as an array of operators and numbers 
    var ops = [
        {'^': (a, b) => Math.pow(a, b)},
        {'*': (a, b) => a * b, '/': (a, b) => a / b}, 
        {'+': (a, b) => a + b, '-': (a, b) => a - b}
        ];
    var newCalc = [];
    var currentOp;
    for(var i=0; i<ops.length; i++){ 
        for(var j = 0; j < calc.length; j++){ 
            if(ops[i][calc[j]]) { 
                currentOp = ops[i][calc[j]];
            }else if(currentOp) { 
                newCalc[newCalc.length - 1] = currentOp(newCalc[newCalc.length - 1], calc[j]); 
                currentOp = null;
            }else{ 0
                if(!isNaN(calc[j])||calc[j]=="+"||calc[j]=="-"||calc[j]=="*"||calc[j]=="/"||calc[j]=="^"){
                newCalc.push(calc[j]); 
                }
            }
            if(newCalc[0]=="+"){
                newCalc.shift();
            }
        } 
        calc = newCalc; 
        newCalc = []; 
    }

    if(calc.length > 1){ 
        console.log('Error: I can\'t resolve it'); 
        return calc; 
    }else{ 
        let extract = calc[0];
        let str=extract.toString();
        let calcRevert= [];
        for(let i=str.length-1; i>=0; i--){
            calcRevert.push(str[i])
        }
        var dotIndex=calcRevert.indexOf(".");
        var eIndex=calcRevert.indexOf("e");
        let calcCom=[];
        let count=0;

        //Coma Correction
        for(let i=0; i<=calcRevert.length-1; i++){
            if(dotIndex>=0){
                var dot1=true;
                count+=1;
            }
            if(dotIndex==-1){
                var dot2=true;
            }
            //insert thousands separator if decimal exists
            if(dot1 && i>dotIndex-25 && eIndex>=0){
                if(calcRevert.length<=i){
                    count+=1;
                }
                if(count==(dotIndex+5) || count==(dotIndex+8) || count==(dotIndex+11) || count==(dotIndex+14) || count==(dotIndex+17) && dotIndex<=i){
                    calcCom.push(",", calcRevert[i]);
                }else{
                    calcCom.push(calcRevert[i]);
                }
            }
            if(dot1 && i>dotIndex-5 && eIndex==-1){
                if(calcRevert.length<=i){
                    count+=1;
                }
                if(count==(dotIndex+5) || count==(dotIndex+8) || count==(dotIndex+11) || count==(dotIndex+14) || count==(dotIndex+17) && dotIndex<=i){
                    calcCom.push(",", calcRevert[i]);
                }else{
                    calcCom.push(calcRevert[i]);
                }
            }
            //insert thousands separator if decimal doesn't exists
            if(dot2){
                if(dotIndex<i){
                    count+=1;
                }
                if(count==4 || count==7 || count==10 || count==13 || count==16 && dotIndex==-1){
                    calcCom.push(",", calcRevert[i]);
                }else{
                    calcCom.push(calcRevert[i]);
                }
            }
        }
        //correction of coma when there are hundreds but there aren't thousands
        if( calcCom[calcCom.length-1]=="," ){
            calcCom.pop();
        }else if(calcCom[calcCom.length-1]=="-" && calcCom[calcCom.length-2]==","){
            let slicecalcCom=calcCom.slice(0,calcCom.length-2);
            slicecalcCom.push("-");
            calcCom=slicecalcCom;
        }
        let resultString=calcCom.reverse().join("");
        return resultString           
    } 
} 

//Equal Button
var buttonEq = document.getElementById('buttonEq');
var userInput = document.getElementById('opLine');
var result = document.getElementById('resLine');

buttonEq.addEventListener('click', function() {    
    result.innerHTML = calculate(operate(userInput.innerHTML));
    operationComplete=true; // *1
}); 
            
// Hide/Show buttons
let hide = document.querySelector("#hide");
let keys = document.querySelector("#keys");
hide.addEventListener("click", function(){
    hide.style.display="none";
    keys.style.display="none";
    show.style.display="";
});
let show = document.querySelector("#show");
    show.addEventListener("click", function(){
    hide.style.display="";
    keys.style.display="";
    show.style.display="none";
});

    
