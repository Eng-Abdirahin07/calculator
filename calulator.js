const display = document.getElementById('display');
    let currentInput = '';
    let resultDisplayed = false;

    function updateDisplay() {
      display.textContent = currentInput || '0';
    }

    function isOperator(char) {
      return ['+', '-', '*', '/'].includes(char);
    }

    document.querySelectorAll('[data-num]').forEach(button => {
      button.addEventListener('click', () => {
        if (resultDisplayed) {
          if (!isOperator(button.dataset.num)) {
            currentInput = '';
          }
          resultDisplayed = false;
        }
        if (button.dataset.num === '.' && currentInput.endsWith('.')) return;

        if (button.dataset.num === '.') {
          const parts = currentInput.split(/[\+\-\*\/]/);
          const lastNum = parts[parts.length - 1];
          if (lastNum.includes('.')) return;
        }

        currentInput += button.dataset.num;
        updateDisplay();
      });
    });

    document.querySelectorAll('[data-op]').forEach(button => {
      button.addEventListener('click', () => {
        if (currentInput === '') return;
        if (isOperator(currentInput.slice(-1))) {
          currentInput = currentInput.slice(0, -1);
        }
        currentInput += button.dataset.op;
        updateDisplay();
        resultDisplayed = false;
      });
    });

    document.getElementById('clear').addEventListener('click', () => {
      currentInput = '';
      updateDisplay();
      resultDisplayed = false;
    });

    document.getElementById('delete').addEventListener('click', () => {
      currentInput = currentInput.slice(0, -1);
      updateDisplay();
    });

    document.getElementById('equals').addEventListener('click', () => {
      if (currentInput === '') return;
      if (isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1);
      }
      try {
        const answer = eval(currentInput);
        currentInput = answer.toString();
        updateDisplay();
        resultDisplayed = true;
      } catch {
        display.textContent = 'Error';
        currentInput = '';
      }
    });