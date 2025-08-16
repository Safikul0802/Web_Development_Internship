const display = document.getElementById("display");
const buttons = document.querySelectorAll(".btn");
const clear = document.getElementById("clear");
const equals = document.getElementById("equals");

let expression = "";

// Handle button clicks
buttons.forEach(button => {
    button.addEventListener("click", () => {
        expression += button.getAttribute("data-value");
        display.value = expression;
    });
});

// Clear button
clear.addEventListener("click", () => {
    expression = "";
    display.value = "";
});

// Equals button
equals.addEventListener("click", () => {
    try {
        display.value = eval(expression) || "";
        expression = display.value;
    } catch {
        display.value = "Error";
        expression = "";
    }
});

// Keyboard support
document.addEventListener("keydown", (event) => {
    const validKeys = "0123456789+-*/.";
    if (validKeys.includes(event.key)) {
        expression += event.key;
        display.value = expression;
    } else if (event.key === "Enter") {
        try {
            display.value = eval(expression) || "";
            expression = display.value;
        } catch {
            display.value = "Error";
            expression = "";
        }
    } else if (event.key === "Backspace") {
        expression = expression.slice(0, -1);
        display.value = expression;
    } else if (event.key.toLowerCase() === "c") {
        expression = "";
        display.value = "";
    }
});
