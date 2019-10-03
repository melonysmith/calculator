const calculateProblem = {
	displayValue: "0",
	firstNumber: null,
	secondNumber: null,
	selectedOperator: "",
	equalsButton: "",
}

const display = document.querySelector("div .display");
const operators = ["add", "subtract", "multiply", "divide", "equals", "clear"];

function addNumberButtons() {
	for (let i = 0; i < 10; i++) {
		let btn = document.getElementById(String(i));
		btn.addEventListener("click", function () { displayNumber(i) });
	}
}

function addOperatorButtons() {
	let operators = ["add", "subtract", "multiply", "divide", "equals", "clear"];
	operators.forEach(doMath => {
		let btn = document.getElementById(doMath);
		if (doMath !== "equals" && doMath !== "clear") {
			btn.addEventListener("click", function () { setOperator(btn.id) });
		}
		if (doMath === "equals") {
				btn.addEventListener("click", completeCalculation);
		}
		if (doMath === "clear") {
				btn.addEventListener("click", clearCalculation);
		}
	})
}

function operate(doMath, a, b) {
	switch (doMath) {
		case "add":
			return add(a, b);
			break;
		case "subtract":
			return subtract(a, b);
			break;
		case "multiply":
			return multiply(a, b);
			break;
		case "divide":
			return divide(a, b);
			break;
		default:
			return "Huh? Try again."
	}
}

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b
}

function divide(a, b) {
	if (b === 0) {
		return "A number divided by zero always equals zero!"
	}
  return a / b;
}

function clearDisplay() {        
	if (operators.includes(calculateProblem.equalsButton) || calculateProblem.equalsButton === "") {      
		display.textContent = "0";
		calculateProblem.displayValue = "0";
	}
}

function displayNumber(number) {
  clearDisplay();    
    if (calculateProblem.displayValue.length < 10) {
      if (calculateProblem.displayValue === "0") {
        calculateProblem.displayValue = String(number);
      } else {
        calculateProblem.displayValue = calculateProblem.displayValue + String(number);
      }
    display.textContent = calculateProblem.displayValue;
    calculateProblem.equalsButton = String(number);        
  }
}

function setOperator(doMath) {
	if (calculateProblem.displayValue === "ERROR") clearDisplay();
  if (calculateProblem.firstNumber === null || calculateProblem.selectedOperator === null) {
    calculateProblem.firstNumber = Number(display.textContent)
    calculateProblem.equalsButton = doMath;
		calculateProblem.selectedOperator = doMath;	
  } else if (operators.includes(calculateProblem.equalsButton) && operators.includes(doMath)) {
    calculateProblem.equalsButton = doMath;
    calculateProblem.selectedOperator = doMath;
  } else {
		answer = getAnswer();
		display.textContent = String(answer);
		calculateProblem.displayValue = String(answer);        
		calculateProblem.firstNumber = answer;        
		calculateProblem.equalsButton = doMath;
		calculateProblem.selectedOperator = doMath;
  }
}

function getAnswer() {
	calculateProblem.secondNumber = Number(display.textContent);
	let answer;
  switch (calculateProblem.selectedOperator) {
    case "add":
    	answer = add(calculateProblem.firstNumber, calculateProblem.secondNumber)
			break;
    case "subtract":
	  	answer = subtract(calculateProblem.firstNumber, calculateProblem.secondNumber)
			break;
    case "multiply":
      answer = multiply(calculateProblem.firstNumber, calculateProblem.secondNumber)
			break;
    case "divide":
      answer = divide(calculateProblem.firstNumber, calculateProblem.secondNumber)
			break;
    default:
    	break;
    }
  return answer;
}

function completeCalculation() {
	if (calculateProblem.selectedOperator === "") {
		calculateProblem.equalsButton = "";
		display.textContent = "0";
		calculateProblem.displayValue = "0";
		return;
	}

	if (calculateProblem.firstNumber !== null) {
		let answer = getAnswer();
		display.textContent = String(answer);
		calculateProblem.displayValue = String(answer);        
		calculateProblem.firstNumber = null;  
		calculateProblem.secondNumber = null;      
		calculateProblem.equalsButton = "";
		calculateProblem.selectedOperator = "";
	}
}

function clearCalculation() {
	calculateProblem.displayValue = 0;
	calculateProblem.firstNumber = null;
	calculateProblem.secondNumber = null;
	calculateProblem.selectedOperator = "";
	calculateProblem.equalsButton = "";
	display.textContent = calculateProblem.displayValue;
}

function startCalculation() {  
	display.textContent = calculateProblem.displayValue;
	addNumberButtons();
	addOperatorButtons();
}

startCalculation();
