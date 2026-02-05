let btn = document.querySelectorAll("button");
let screenText = document.querySelector("#screen_text");
let result = document.querySelector("#result_text");
let numbersList = [""];
let operatorsList = [""];

btn.forEach(button=>{
    button.addEventListener("click", (e)=>{
        let value = e.target.textContent;     
// _________________________________NUMBERS__________________________________________________________________________________________________________________________________        
        if(e.target.className ==="numbers"){

            if(e.target.id === "dot" && numbersList[numbersList.length-1].includes(".") ){
                return;
            }
            screenText.textContent += value;

            numbersList[numbersList.length-1] += value;          
        }  
// _________________________________OPERATORS____________________________________________________________________________________________________________________________________      
        else if((e.target.className === "operators")){
            if((((screenText.textContent)[(screenText.textContent).length -1])=== "+") || (((screenText.textContent)[(screenText.textContent).length -1])=== "*") || (((screenText.textContent)[(screenText.textContent).length -1])=== "/") || (((screenText.textContent)[(screenText.textContent).length -1])=== "-")){
                screenText.textContent = screenText.textContent.slice(0, -1) + value;
                operatorsList.pop();
                operatorsList.push(value);
            }else{
                screenText.textContent += value;
                operatorsList.push(value);
                numbersList.push("");
            }         
        }
// _________________________________ERASE FUNCTION___________________________________________________________________________________________________________________________________________________________     
        else if(e.target.id === "eraser"){
            
            if((((screenText.textContent)[(screenText.textContent).length -1])!== "+") && (((screenText.textContent)[(screenText.textContent).length -1])!== "*") && (((screenText.textContent)[(screenText.textContent).length -1])!== "/") && (((screenText.textContent)[(screenText.textContent).length -1])!== "-")){
                screenText.textContent = screenText.textContent.slice(0, -1);
                numbersList[numbersList.length-1] = numbersList[numbersList.length-1].slice(0,-1)
                result.textContent = cal(numbersList, operatorsList);
            }
            else if((((screenText.textContent)[(screenText.textContent).length -1])=== "+") || (((screenText.textContent)[(screenText.textContent).length -1])=== "*") || (((screenText.textContent)[(screenText.textContent).length -1])=== "/") || (((screenText.textContent)[(screenText.textContent).length -1])=== "-")){
                screenText.textContent = screenText.textContent.slice(0, -1);
                numbersList.pop();
                operatorsList.pop();         
            }
        }
//_________________________________EQUALS TO FUNCTION_______________________________________________________________________________________________________________________________________________________________________________________________________
        else if(e.target.id ==="equals_to"){
            numbersList.length = 0;
            operatorsList.length = 0;
            operatorsList.push("");
            numbersList.push(result.textContent);
            screenText.textContent = result.textContent;
        }
//___________________________________CLEAR ALL FUNCITON_________________________________________________________________________________________________________________________________________________________________________________
        else if ( e.target.id === "clear_all"){
            numbersList.length = 0;
            numbersList.push("");
            operatorsList.length = 0;
            operatorsList.push("");
            result.textContent = "";
            screenText.textContent = "";
        }        
// _________________________________SHOW CALCULATION__________________________________________________________________________________________________________________________________________________________________   
        if(numbersList[numbersList.length-1].length>=1){
            result.textContent = cal(numbersList, operatorsList);
        }

        if(result.textContent ==="Infinity"){
            result.textContent = "Can't multiply by zero";
        }

        if(result.textContent.length>12){
            result.textContent = (Number(result.textContent).toFixed(16))
        }
        if((result.textContent ==="0")&&(screenText.textContent==="")){
            result.textContent = "";
        }
    } )
})
//_________________________________FUNCTION TO CALCULATE____________________________________________________________________________________________________________________________________________________________________________________________
function cal(val, oper){
  let value = +val[0];
  let operator = "";

  for (let i = 1; i< val.length; i++){
    
    for (let j = 0; j<= i; j++){
      operator = oper[j];
    }
    if (operator === "+" && i!== 0){
        value += +val[i];
    }else if(operator === "-" && i!== 0){
        value -= +val[i];
    }else if(operator === "/" && i!== 0){
        if (val[i] ===""){
            value /= 1 ;
        }else{
            value /= +val[i];
        }      
    }else if(operator === "*" && i!== 0){
        if (val[i] ===""){
            value *= 1 ;
        }else{
            value *= +val[i];
        }
    }
  }
  if(operator===""){
    return +val[0];
  }

  return value;
}