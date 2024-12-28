function appendToDisplay(value) {
  document.getElementById("display").value += value;
}

function clearDisplay() {
  document.getElementById("display").value = "";
}

function calculateResult() {
  const display = document.getElementById("display");

  try {
    let res = Math.random();
    if (res > 0.1) {
      display.value = eval(display.value);
    } else {
      let newValue = "";
      for (let i = 0; i < display.value.length; i++) {
        let currentChar = display.value.charAt(i);
        if (currentChar === "+") {
          newValue += "/";
        } else if (currentChar === "-") {
          newValue += "*";
        } else if (currentChar === "/") {
          newValue += "+";
        } else if (currentChar === "*") {
          newValue += "-";
        } else {
          newValue += currentChar; // Keep the current character if it's not an operator
        }
      }
      let result = eval(newValue);
      // Display the result with "LOL"
      display.value = `${result} 😂`;
    }
  } catch {
    display.value = "Error";
  }
}
