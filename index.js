const display = document.getElementById("display");
  const buttons = document.getElementById("main");

  let currentInput = "";
  let previousInput = "";
  let operator = "";

  buttons.addEventListener("click", (event) => {
      const value = event.target.getAttribute("data-value");
      if (value) {
          handleButtonPress(value);
      }
  });

  function handleButtonPress(value) {
      if (['+', '-', 'x', '/'].includes(value)) {
          if (!operator) { // add an operator if there isn't one already
              operator = value;
              currentInput += operator;
          }
      } else if (value === "=") {
          if (operator) { // calculation only if there is an operator
              calculate();
          }
      } else if (value === "RESET") {
          clear();
      } else if (value === "DEL") {
          deleteLastCharacter();
      } else {
          currentInput += value;
      }
      display.value = currentInput; // Update display after every button press
  }

  function calculate() {
      const operation = operator;
      const operands = currentInput.split(operation);
      let result;

      if (operands.length === 2) {
          const [left, right] = operands.map(num => parseFloat(num));
          switch (operation) {
              case '+':
                  result = left + right;
                  break;
              case '-':
                  result = left - right;
                  break;
              case 'x':
                  result = left * right;
                  break;
              case '/':
                  if (right === 0) {
                      result = "Error";
                  } else {
                      result = left / right;
                  }
                  break;
          }
      }
      
      operator = ""; 
      currentInput = result.toString(); 
      display.value = currentInput; 
  }

  function deleteLastCharacter() {
      if (currentInput.endsWith(operator)) {
          operator = ""; 
      }
      currentInput = currentInput.slice(0, -1);
      display.value = currentInput;
  }

  function clear() {
      currentInput = "";
      operator = "";
      display.value = "";
  }

  display.value = 0;
