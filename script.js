const display = document.getElementById("display");
const history = document.getElementById("history");

document.querySelectorAll(".buttons button")
.forEach(btn => {

btn.addEventListener("click", () => {

const value = btn.textContent;

if(value === "C"){
display.value = "";
return;
}

if(value === "="){

try{
const result = eval(display.value);

history.textContent =
`${display.value} = ${result}`;

display.value = result;
}
catch{
display.value = "Error";
}

return;
}

if(value === "⌫"){
display.value =
display.value.slice(0,-1);
return;
}

display.value += value;
});
});

document.addEventListener("keydown",(e)=>{

if(/[0-9+\-*/().]/.test(e.key)){
display.value += e.key;
}

if(e.key==="Backspace"){
display.value =
display.value.slice(0,-1);
}

if(e.key==="Enter"){

try{
const result =
eval(display.value);

history.textContent =
`${display.value} = ${result}`;

display.value = result;
}
catch{
display.value="Error";
}
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