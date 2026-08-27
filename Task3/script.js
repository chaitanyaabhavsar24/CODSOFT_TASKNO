let expression = '';

const expressionEl = document.getElementById('expression');
const resultEl = document.getElementById('result');

function updateDisplay() {
  expressionEl.textContent = expression;
}

function appendNumber(num) {
  expression += num;
  updateDisplay();
}

function appendOperator(op) {
  if (expression === '') return;
  const lastChar = expression[expression.length - 1];
  if (['+', '-', '*', '/', '%'].includes(lastChar)) {
    expression = expression.slice(0, -1) + op;
  } else {
    expression += op;
  }
  updateDisplay();
}

function clearDisplay() {
  expression = '';
  resultEl.textContent = '0';
  updateDisplay();
}

function deleteLast() {
  expression = expression.slice(0, -1);
  updateDisplay();
}

function calculate() {
  if (expression === '') return;
  try {
    // Replace % with /100* for percentage handling
    const safeExpr = expression.replace(/%/g, '/100*');
    const value = Function('"use strict"; return (' + safeExpr + ')')();

    if (value === Infinity || value === -Infinity) {
      resultEl.textContent = 'Error: Div by 0';
    } else if (isNaN(value)) {
      resultEl.textContent = 'Error';
    } else {
      resultEl.textContent = Number(value.toFixed(8)).toString();
    }
  } catch (err) {
    resultEl.textContent = 'Error';
  }
}

// Keyboard support
document.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') appendNumber(e.key);
  else if (['+', '-', '*', '/'].includes(e.key)) appendOperator(e.key);
  else if (e.key === '.') appendNumber('.');
  else if (e.key === 'Enter' || e.key === '=') calculate();
  else if (e.key === 'Backspace') deleteLast();
  else if (e.key === 'Escape') clearDisplay();
});
