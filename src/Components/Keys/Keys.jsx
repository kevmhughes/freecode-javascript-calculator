import React, { useContext, useEffect } from "react";
import { AppContext } from "../../App";
import "./Keys.css";

const Numbers = () => {
  const {
    inputValue,
    setInputValue,
    displayValue,
    setDisplayValue,
    outputValue,
    setOutputValue,
  } = useContext(AppContext);

  const clearButton = (e) => {
    setDisplayValue(0);
    setInputValue("");
    setOutputValue("");
  };

  const numbersHandler = (e) => {
    // does not allow multiple zeros at the beginning of the number
    if (displayValue == 0 && e.target.textContent == 0) {
      return;
    }
    // removes 0 when starting a new calculation
    else if (outputValue == "") {
      setDisplayValue(e.target.textContent);
      setInputValue(e.target.textContent);
      setOutputValue(e.target.textContent);
    }
    // clears operator from the display value when inputting a number
    else if (
      displayValue == "+" ||
      displayValue == "x" ||
      displayValue == "-" ||
      displayValue == "/"
    ) {
      setDisplayValue(e.target.textContent);
      setInputValue(inputValue + e.target.textContent);
      setOutputValue(outputValue + e.target.textContent);
    }
    // allows for the input of a series of number
    else {
      setInputValue(inputValue + e.target.textContent);
      setDisplayValue(displayValue + e.target.textContent);
      setOutputValue(outputValue + e.target.textContent);
    }
  };

  const decimalHandler = (e) => {
    // allows for the input "0." at the beginning of the input and blocks the possibility of "0.."
    if (displayValue == 0 && inputValue == "") {
      setInputValue(0 + e.target.textContent);
      setDisplayValue(0 + e.target.textContent);
      setOutputValue(0 + e.target.textContent);
    } else if (displayValue.slice(-1) == ".") {
      return;
    }
    // blocks the possibility of having more than one decimal point in any given number
    else if (
      displayValue.includes(".") ||
      displayValue == "+" ||
      displayValue == "x" ||
      displayValue == "-" ||
      displayValue == "/"
    ) {
      return;
    } else {
      // adds a decimal point in a number greated than 0
      setInputValue(inputValue + e.target.textContent);
      setDisplayValue(displayValue + e.target.textContent);
      setOutputValue(outputValue + e.target.textContent);
    }
  };

  const operatorshandler = (e) => {
    // in the case that 2 operands are possible, converts 3 operands into the only operand
    if (
      inputValue.slice(-2) == "+-" ||
      inputValue.slice(-2) == "*" + "-" ||
      inputValue.slice(-2) == "--" ||
      inputValue.slice(-2) == "/-"
    ) {
      let operandTransformation;
      if (e.target.textContent == "x") {
        operandTransformation = "*";
      } else {
        operandTransformation = e.target.textContent;
      }
      console.log(inputValue.slice(0, -2) + operandTransformation);
      setInputValue(inputValue.slice(0, -2) + operandTransformation);
      setOutputValue(inputValue.slice(0, -2) + operandTransformation);
      setDisplayValue(e.target.textContent);
    }
    // converts "0x" into "0*"
    else if (displayValue == 0 && e.target.textContent == "x") {
      console.log("hey");
      setOutputValue(0 + "*");
      setInputValue(0 + "*");
      setDisplayValue(e.target.textContent);
    }
    // does not allow 3 operands
    else if (
      inputValue.slice(-2) == "+-" ||
      inputValue.slice(-2) == "*-" ||
      inputValue.slice(-2) == "--" ||
      inputValue.slice(-2) == "/-"
    ) {
      setInputValue(inputValue.slice(0, -1) + e.target.textContent);
      setOutputValue(inputValue.slice(0, -1) + e.target.textContent);
      return;
    }
    // adds the displayed number to input/output value once the calculation has finished if the user wants to use operands on the previous result
    else if (
      (outputValue == "" && inputValue == "") ||
      ((outputValue == "" || inputValue == "") && displayValue > 0) ||
      displayValue < 0
    ) {
      setInputValue(displayValue + e.target.textContent);
      setOutputValue(displayValue + e.target.textContent);
      setDisplayValue(e.target.textContent);
    }
    // adds "0" to the output and input displays as the first number if the user presses an operand before inputting a number
    else if (displayValue == 0 && outputValue == "") {
      let operandTransformation;
      if (e.target.textContent == "x") {
        operandTransformation = "*";
      } else {
        operandTransformation = e.target.textContent;
      }
      setInputValue(0 + operandTransformation);
      setOutputValue(0 + operandTransformation);
      setDisplayValue(e.target.textContent);
    }
    // does not allow repetiton of the same operand
    else if (displayValue == e.target.textContent) {
      return;
    }
    // deletes the last operand in case another is chosen and displays the new operand on the screen display
    else if (
      (e.target.textContent == "+" ||
        e.target.textContent == "x" ||
        e.target.textContent == "/") &&
      (displayValue == "+" ||
        displayValue == "x" ||
        displayValue == "-" ||
        displayValue == "/")
    ) {
      // transforms "x" to "*"
      let operandTransformation;
      if (e.target.textContent == "x") {
        operandTransformation = "*";
      } else {
        operandTransformation = e.target.textContent;
      }
      const sliceOperatorAwayOperandTransformation =
        inputValue.slice(-2, -1) + operandTransformation;
      setInputValue(sliceOperatorAwayOperandTransformation);
      setOutputValue(sliceOperatorAwayOperandTransformation);
      setDisplayValue(e.target.textContent);
    } /* else if (inputValue.slice(-2) == "+-"  || inputValue.slice(-2) == "*"+"-"  || inputValue.slice(-2) == "--" || inputValue.slice(-2) == "/-" ) {
      console.log("hey")
    }  */ else if (inputValue.slice(-1) == ".") {
      return;
    } else {
      // clears the display and then displays the operand, and then adds the operand to the end of the outputValue and displayValue strings
      // transgorms "x" to "*"
      let operandTransformation;
      if (e.target.textContent == "x") {
        operandTransformation = "*";
      } else {
        operandTransformation = e.target.textContent;
      }
      setInputValue(inputValue + operandTransformation);
      setOutputValue(outputValue + operandTransformation);
      setDisplayValue(e.target.textContent);
    }
  };

  const equalsHandler = (e) => {
    if (
      inputValue.includes("=") ||
      displayValue == "+" ||
      displayValue == "x" ||
      displayValue == "-" ||
      displayValue == "/"
    ) {
      console.log(inputValue.slice(-1));
      return;
    } else {
      setDisplayValue(eval(outputValue));
      setInputValue(inputValue + e.target.textContent + eval(outputValue));
      setOutputValue("");
    }
  };

  return (
    <div className="keys-container">
      <button id="clear" onClick={clearButton} className="keys clear">
        AC
      </button>
      <button onClick={operatorshandler} id="divide" className="keys operator">
        /
      </button>
      <button
        onClick={operatorshandler}
        id="multiply"
        className="keys operator"
      >
        x
      </button>
      <button onClick={numbersHandler} id="seven" className="keys">
        7
      </button>
      <button onClick={numbersHandler} id="eight" className="keys">
        8
      </button>
      <button onClick={numbersHandler} id="nine" className="keys">
        9
      </button>
      <button
        onClick={operatorshandler}
        id="subtract"
        className="keys operator"
      >
        -
      </button>
      <button onClick={numbersHandler} id="four" className="keys">
        4
      </button>
      <button onClick={numbersHandler} id="five" className="keys">
        5
      </button>
      <button onClick={numbersHandler} id="six" className="keys">
        6
      </button>
      <button onClick={operatorshandler} id="add" className="keys operator">
        +
      </button>
      <button onClick={numbersHandler} id="one" className="keys">
        1
      </button>
      <button onClick={numbersHandler} id="two" className="keys">
        2
      </button>
      <button onClick={numbersHandler} id="three" className="keys">
        3
      </button>
      <button onClick={equalsHandler} id="equals" className="keys equals">
        =
      </button>
      <button
        onClick={numbersHandler}
        id="zero"
        className="keys zero position-keys"
      >
        0
      </button>
      <button
        onClick={decimalHandler}
        id="decimal"
        className="keys position-keys"
      >
        .
      </button>
    </div>
  );
};

export default Numbers;
