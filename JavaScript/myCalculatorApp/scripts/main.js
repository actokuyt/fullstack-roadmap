// Get DOM elements
const numberBtns = document.getElementById("numberBtns");
const operatorBtns = document.getElementById("operatorBtns");
const decimalZeroEquals = document.getElementById("decimalZeroEquals");
const clearScreenBtn = document.getElementById("clearScreenBtn");

// Convert NodeList to array for easier manipulation
const numberBtnsContainer = Array.from(numberBtns.querySelectorAll("button"));
const operatorBtnsContainer = Array.from(operatorBtns.querySelectorAll("button"));
const decimalZeroEqualsContainer = Array.from(decimalZeroEquals.querySelectorAll("button"));

// Initialize state variables
let leftOperand = "";
let rightOperand = "";
let operator = "";

// Event listener for number buttons
for (const numberBtn of numberBtnsContainer) {
  numberBtn.addEventListener("click", (event) => {
    if (operator.length < 1) {
      leftOperand += event.target.innerText;
      displayScreen.innerText = leftOperand;
      console.log(leftOperand);
    } else {
      rightOperand += event.target.innerText;
      displayScreen.innerText = rightOperand;
      console.log(rightOperand);
    }
  });
}

// Event listener for operator buttons
for (const operatorBtn of operatorBtnsContainer) {
  operatorBtn.addEventListener("click", (event) => {
    displayScreen.innerText = "";
    operator = event.target.innerText;
    console.log(operator);
  });
}

// Event listener for decimal, zero, and equals buttons
for (let i = 0; i <= 1; i++) {
  decimalZeroEqualsContainer[i].addEventListener("click", (event) => {
    if (operator.length < 1) {
      leftOperand += event.target.innerText;
      displayScreen.innerText = leftOperand;
      console.log(leftOperand);
    } else {
      rightOperand += event.target.innerText;
      displayScreen.innerText = rightOperand;
      console.log(rightOperand);
    }
  });
}

// Event listener for equals button
decimalZeroEqualsContainer[2].addEventListener("click", () => {
  let numericLeftOperand = Number(leftOperand);
  let numericRightOperand = Number(rightOperand);
  let result;

  switch (operator) {
    case "+":
      result = numericLeftOperand + numericRightOperand;
      break;
    case "-":
      result = numericLeftOperand - numericRightOperand;
      break;
    case "*":
      result = numericLeftOperand * numericRightOperand;
      break;
    case "/":
      if (numericRightOperand !== 0) {
        result = numericLeftOperand / numericRightOperand;
      } else {
        displayScreen.innerText = "Error: Division by zero";
        return;
      }
      break;
    default:
      displayScreen.innerText = "Error: Invalid operator";
      return;
  }

  displayScreen.innerText = result;
  leftOperand = result.toString(); // Convert result to string for further input
  rightOperand = "";
  operator = "";
  console.log(leftOperand, rightOperand, operator, result);
});

// Event listener for clear screen button
clearScreenBtn.addEventListener("click", () => {
  displayScreen.innerText = "";
  leftOperand = "";
  rightOperand = "";
  operator = "";
});
