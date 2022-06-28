import React, { useState, useEffect, useRef } from "react";
import Screen from "./Parts/Screen";
import Button from "./Parts/Button";

const Calulator = () => {

    const [screenState, setScreenState] = useState([0])

    const updateCalculation = (event) => {
        setScreenState(old => ([...old, event.target.id]));

    }

    const calculateValue = () => {
        let equation = screenState.join().replaceAll(",", "");

        setScreenState(() => ([eval(equation)]));

    }
    const deleteLast = () => {
        if (screenState.length>1){
        const newVal = screenState.slice(0,-1);
        setScreenState(newVal);
        } else {
            setScreenState([0]);
        }
    }


    return (
        <div id="calculator">
            <Screen
                screenState={screenState}
            />
            <div>
                <button type="button" id="7" onClick={updateCalculation}>7</button>
                <button type="button" id="8" onClick={updateCalculation}>8</button>
                <button type="button" id="9" onClick={updateCalculation}>9</button>
            </div>
            <div>
                <button type="button" id="4" onClick={updateCalculation}>4</button>
                <button type="button" id="5" onClick={updateCalculation}>5</button>
                <button type="button" id="6" onClick={updateCalculation}>6</button>
            </div>
            <div>
                <button type="button" id="1" onClick={updateCalculation}>1</button>
                <button type="button" id="2" onClick={updateCalculation}>2</button>
                <button type="button" id="3" onClick={updateCalculation}>3</button>
            </div>
            <div>
                <button type="button" id="0" onClick={updateCalculation}>0</button>
                <button type="button" id="." onClick={updateCalculation}>.</button>
                <button type="button" id="DEL" onClick={deleteLast}>DEL</button>
            </div>
            <button type="button" id="+" onClick={updateCalculation}>+</button>
            <button type="button" id="-" onClick={updateCalculation}>-</button>
            <button type="button" id="/" onClick={updateCalculation}>/</button>
            <button type="button" id="*" onClick={updateCalculation}>*</button>
            <button type="button" id="=" onClick={calculateValue}>=</button>



        </div>
    )
}

export default Calulator;