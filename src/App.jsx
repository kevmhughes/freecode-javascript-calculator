import "./App.css";
import React, { useState, createContext } from "react";
import Keys from "./Components/Keys/Keys";
import Display from "./Components/Display/Display";

export const AppContext = createContext();

function App() {
  const [displayValue, setDisplayValue] = useState(0);
  const [inputValue, setInputValue] = useState("");
  const [outputValue, setOutputValue] = useState("");


  return (
    <AppContext.Provider
      value={{
        displayValue,
        setDisplayValue,
        inputValue,
        setInputValue,
        outputValue,
        setOutputValue,
      }}
    >
      <div className="outer-container">
        <Display />
        <Keys />
      </div>
    </AppContext.Provider>
  );
}

export default App;
