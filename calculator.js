let firstOperand = '';
let secondOperand = '';
let operator = null;

//All Buttons Selectors
const numberButtons = document.querySelectorAll('.btn-number');
const operatorButtons = document.querySelectorAll('.btn-operator');
const clearAllButton = document.querySelector('.clear-all');
const clearElementButton = document.querySelector('.clear-element');
const pointButton = document.querySelector('.point');
const equalButton = document.querySelector('.equal');
const displayCalculation = document.querySelector('.operation-display');
const displayCurrentNumber = document.querySelector('.result-display');

//All events
clearAllButton.addEventListener('click', clearAll);
clearElementButton.addEventListener('click', deleteElement);
pointButton.addEventListener('click', setPoint);
equalButton.addEventListener('click', equal);

numberButtons.forEach((button) => {
  button.addEventListener('click', () => appendNumber(button.textContent));
});

operatorButtons.forEach((button) =>
  button.addEventListener('click', () => appendOperator(button.textContent))
);

function appendNumber(number) {
  if (
    displayCurrentNumber.textContent === '0' ||
    displayCurrentNumber.textContent === ''
  ) {
    displayCurrentNumber.textContent = number;
  } else {
    displayCurrentNumber.textContent += number;
  }

  if (operator === null || operator === '') {
    firstOperand = displayCurrentNumber.textContent;
    displayCalculation.textContent = displayCurrentNumber.textContent;
  }
  if (firstOperand && operator) {
    secondOperand = displayCurrentNumber.textContent;
  }
}

function appendOperator(operatorSymbol) {
  if (firstOperand && operator && secondOperand) {
    displayCalculation.textContent = '';
    firstOperand = evaluate(firstOperand, secondOperand, operator);
    secondOperand = '';
    if (firstOperand === '0' || firstOperand === '') {
      displayCalculation.textContent = '0';
    } else {
      displayCalculation.textContent = roundNumber(firstOperand);
    }
  }
  operator = operatorSymbol;
  displayCalculation.textContent = firstOperand + ` ${operator} `;
  displayCurrentNumber.textContent = '0';
}

function evaluate(a, b, op) {
  num1 = Number.parseFloat(a);
  num2 = Number.parseFloat(b);

  switch (op) {
    case '+':
      return String(num1 + num2);
    case '-':
      return String(num1 - num2);
    case '/':
      return num2 !== 0 ? String(num1 / num2) : 'Infinity';
    case '*':
      return String(num1 * num2);
    default:
      break;
  }
}

function equal() {
  if (firstOperand && operator && secondOperand) {
    firstOperand = evaluate(firstOperand, secondOperand, operator);
    secondOperand = '';
    displayCalculation.textContent = roundNumber(firstOperand);
    displayCurrentNumber.textContent = '0';
    operator = null;
  }
}

function clearAll() {
  displayCalculation.textContent = '';
  displayCurrentNumber.textContent = '0';
  firstOperand = '';
  secondOperand = '';
  operator = null;
}

function deleteElement() {
  if (displayCurrentNumber.textContent === '0') return;
  displayCurrentNumber.textContent = displayCurrentNumber.textContent
    .toString()
    .slice(0, -1);
  if (operator === null) {
    firstOperand = displayCurrentNumber.textContent;
    displayCalculation.textContent = displayCurrentNumber.textContent;
  } else {
    secondOperand = displayCurrentNumber.textContent;
  }
}

function setPoint() {
  const displayScreen = displayCurrentNumber.textContent;
  if (displayScreen === '') {
    displayCurrentNumber.textContent += '0.';
  } else if (!displayScreen.includes('.')) {
    displayCurrentNumber.textContent += '.';
  }
}

function roundNumber(num) {
  if (num === 'Infinity') {
    return 'Infinity';
  }
  return Math.round(num * 1000) / 1000;
}
