const display = document.querySelector("#display");
const buttons = document.querySelectorAll("button");

buttons.forEach((item) => {
   item.onclick = () => {
    if(item.id == "clear") {
        display.innerText = ""

    }else if (item.id == "backspace") {
        let string = display.innerText.toString()
        display.innerText = string.substr(0, string.length-1)  // elimina la ultima unidad de la calculadora

    }else if (display.innerHTML != "" && item.id == "equal") {
        display.innerText = eval(display.innerText);  // evalua si el valor es positivo o negativo

    }else if (display.innerHTML == "" && item.id == "equal") {
        display.innerText = "null"

        setTimeout(() => {  //indica que al hacer click en igual con el contenedor vacio, muestra null y lo borra al pasar 2 segundos
           display.innerText = ""
        }, 2000)

    }else {
        display.innerText += item.id  //adjunta todo a traves de innerText al display
    }
   } 
})

const themeToggleBtn = document.querySelector(".theme-toggler")
const calculator = document.querySelector(".calculator")
const toggleIcon = document.querySelector(".toggler-icon")

themeToggleBtn.addEventListener("click", () => {
    calculator.classList.toggle("dark");
    themeToggleBtn.classList.toggle("active");
});
