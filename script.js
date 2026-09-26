const display = document.getElementById("display");
const history = document.getElementById("history");

// True right after "=", so typing a number starts a fresh
// calculation while typing an operator continues from the result.
let justCalculated = false;

function calculate(){

if(!display.value || display.value === "Error"){
return;
}

try{
const result = evaluateExpression(display.value);

history.textContent =
`${display.value} = ${result}`;

display.value = result;
justCalculated = true;
}
catch{
display.value = "Error";
justCalculated = false;
}
}

function input(value){

if(display.value === "Error"){
display.value = "";
}

if(justCalculated && !"+-*/".includes(value)){
display.value = "";
}

justCalculated = false;
display.value += value;
}

function backspace(){

justCalculated = false;

if(display.value === "Error"){
display.value = "";
return;
}

display.value =
display.value.slice(0,-1);
}

function clearDisplay(){
justCalculated = false;
display.value = "";
}

document.querySelectorAll(".buttons button")
.forEach(btn => {

btn.addEventListener("click", () => {

const value = btn.textContent;

if(value === "C"){
clearDisplay();
return;
}

if(value === "="){
calculate();
return;
}

if(value === "⌫"){
backspace();
return;
}

input(value);
});
});

document.addEventListener("keydown",(e)=>{

if(/^[0-9+\-*/().]$/.test(e.key)){
// "/" would otherwise open Firefox's quick find.
e.preventDefault();
input(e.key);
}

if(e.key==="Backspace"){
backspace();
}

if(e.key==="Escape"){
clearDisplay();
}

if(e.key==="Enter" || e.key==="="){
// Without this, Enter also "clicks" whichever calculator
// button has focus and appends it to the result.
e.preventDefault();
calculate();
}
});

document
.getElementById("themeBtn")
.addEventListener("click",()=>{

document.body.classList.toggle("dark");

const btn =
document.getElementById("themeBtn");

btn.textContent =
document.body.classList.contains("dark")
? "☀️"
: "🌙";
});
