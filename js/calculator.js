"use strict"



let opLine = document.getElementById("opLine");
let resLine = document.getElementById("resLine");
const buttons= document.getElementById("numbers");




//Replace last if it's an operator and we press another operator
    let operationComplete = false;
    const last = () => opLine.innerHTML.substring(opLine.innerHTML.length-1)

    opLine.innerHTML=0;
    resLine.innerHTML=0;


//Write Numbers
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


// Keys control
    let buttons2 = document.getElementsByClassName("buttons");
    console.log(buttons2);
    let array_de_strings = [];

    for (var i = 0; i < buttons2.length; i++) {
        console.log(buttons2[i].textContent);
        array_de_strings.push(buttons2[i].textContent);
    }

    let newarray=array_de_strings.join(', ');
    console.log(newarray);
    console.log(array_de_strings);

    function playkey(e){
        let key2=String.fromCharCode(event.keyCode);
        let busqueda = array_de_strings.find(element=> element == key2);
        console.log(busqueda);
        console.log(key2);
        console.log(event.keyCode);

        if(busqueda !== undefined){
            switch (busqueda){
                case "C":  clear(); break;
                case "+/-":  changeSign(); break;
                case "BS":  backSpace(); break;
                case "=":  ""; break;        //it's empty because its function is in operate() and interfere in *1
                case ".": dot2();
                default: typing(busqueda); break;
            }
        }
        if(event.keyCode=="66"||String.fromCharCode(event.keyCode)=="b"){
            
            backSpace()
            console.log(event.keyCode);
        }
        if( String.fromCharCode(event.keyCode)==buttonEq.innerHTML || event.keyCode=="13"){
        
            result.innerHTML = calculate(operate(userInput.innerHTML));
            operationComplete=true; // *1
            console.log(event.keyCode)
        }
        if( String.fromCharCode(event.keyCode)=="c"){
            clear()
            
        }
      
    }
    window.addEventListener("keypress",playkey);
    

// Function Dot Key
    function dot2(){
        
        if (opLine.innerHTML.length > 0) {
            let lastdig = opLine.innerHTML[opLine.innerHTML.length - 1];
            console.log(lastdig);
            let array = opLine.innerHTML.split(' ');
            console.log(array);
    
            if ( lastdig == '+' || lastdig == '-' || lastdig == '*'|| lastdig == '/'|| lastdig == '^'|| lastdig == '('|| lastdig == ')') {
                opLine.innerHTML += '0.'
            } else if (array[array.length - 1].indexOf('.') == -1) {
                opLine.innerHTML += '.'
            }
        
        } else {
            opLine.innerHTML += '0.'
        }
    
    }


// Function Dot Button       
function dot(){
    let dot = document.querySelector('#buttonDot');
    dot.addEventListener('click', () => {
	if (opLine.innerHTML.length > 0) {
        let lastdig = opLine.innerHTML[opLine.innerHTML.length - 1];
        console.log(lastdig);
        let array = opLine.innerHTML.split(' ');
        console.log(array);

		if ( lastdig == '+' || lastdig == '-' || lastdig == '*'|| lastdig == '/'|| lastdig == '^'|| lastdig == '('|| lastdig == ')') {
			opLine.innerHTML += '0.'
		} else if (array[array.length - 1].indexOf('.') == -1) {
			opLine.innerHTML += '.'
		}
	
	} else {
        opLine.innerHTML += '0.'
    }
})
}

                      
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
    function operate(userV) { 
        // --- Parse a calculation string into an array of numbers and operators 
        var calculation = [], current = ''; 
        for (var i = 0, char1; char1 = userV.charAt(i); i++) {
            if ('()^*/+-'.indexOf(char1) > -1) {
                if (current == '' && char1 == '-') {
                    current = '-'; 
                    } 
                else { 
                    calculation.push(parseFloat(current), char1); 
                    current = ''; 
                } 
            } 
            else { 
                current += userV.charAt(i); 
            } 
        } 
        if (current != '') { 
                    calculation.push(parseFloat(current)); 
        } 
        return calculation;
    }
    function calculate(calc) { 
            // --- Perform a calculation expressed as an array of operators and numbers 
            var ops = [
            {'^': (a, b) => Math.pow(a, b)},
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
                } 
            calc = newCalc; newCalc = []; 
            } 
            if (calc.length > 1) { 
                console.log('Error: unable to resolve calculation'); 
                return calc; 
            } else { 
                return calc[0]; 
            } 
    } 

//Equal Button
    var buttonEq = document.getElementById('buttonEq'), 
    userInput = document.getElementById('opLine'), 
    result = document.getElementById('resLine');

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

    
