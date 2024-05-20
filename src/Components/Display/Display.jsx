import React, { useContext} from "react";
import { AppContext } from "../../App";
import "./Display.css"

const Display = () => {
    const { inputValue, displayValue, outputValue } = useContext(AppContext)


  return (
      <div className="display-container">
        <div className="output-value">{outputValue}</div>
        <div className="input-value">{inputValue}</div>
        <div id="display" className="display-value">{displayValue}</div>
      </div>
  );
};

export default Display;
