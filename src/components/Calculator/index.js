import React, { useState, useEffect, useRef } from "react";
import Screen from "./Parts/Screen";


const Calulator = () => {

    const [screenState, setScreenState] = useState([0])
    const [prevEqu, setPrevEqu] = useState([0]);
    const [perenthToggle, setPerenthToggle] = useState(0);

    const updateCalculation = (event) => {
        let input = event.target.id;
        //grab the equation and convert it into a string for processing
        let equation = screenState.join().replaceAll(",", "");
        //this will create an array containing all the numbers in the equation
        const nums = equation.split(/[+]|[-]|[/]|[*]|[(]|[)]/);

        //check if '()' is pressed and set input accordingly
        if (input === '()') if (perenthToggle) { input = ')'; setPerenthToggle(0) } else { input = '('; setPerenthToggle(1) };
        if (input === '(' && !isNaN(parseInt(screenState.at(-1)))) input = '*(';
        if (input === '(' && screenState.at(-1) === ')') input = '*(';


        //check if '.' is pressed and set input accordingly
        if (input === '.' && nums.at(-1).includes('.')) return;
        if (input === '.' && isNaN(screenState.at(-1))) input = "0.";
        if (!isNaN(parseInt(input)) && screenState.at(-1) === ')') input = "*" + input;

        //this makes sure to clear the zero if only a zero is in the screenState
        if (screenState.length === 1 && screenState[0] === 0 && !isNaN(input)) {
            setScreenState(old => ([input]));
        } else {
            setScreenState(old => ([...old, input]));
        }
    }

    const calculateValue = () => {
        //grab the equation and convert it into a string for processing
        let equation = screenState.join().replaceAll(",", "");
        setPrevEqu(old => ([...old, equation]));
        let answer = 0;
        try {
            answer = eval(equation)
        } catch (error) {
            return;
        }
        //evaluate equation as string and set screenState to this value
        setScreenState(() => ([answer]));
    }

    //function to delete last character or clear to zero
    const deleteLast = () => (screenState.length > 1) ? setScreenState(old => old.slice(0, -1)) : setScreenState([0]);
    const getPrevEqu = () => {
        let last = prevEqu.pop();
        if (last === undefined) last = 0;
        setScreenState([last])
    }



    return (
        <div id="calculator">
            <Screen
                screenState={screenState}
            />
            <div id="numPad">
                <div className="btnRow">
                    <button type="button" id="7" onClick={updateCalculation}>7</button>
                    <button type="button" id="8" onClick={updateCalculation}>8</button>
                    <button type="button" id="9" onClick={updateCalculation}>9</button>
                </div>
                <div className="btnRow">
                    <button type="button" id="4" onClick={updateCalculation}>4</button>
                    <button type="button" id="5" onClick={updateCalculation}>5</button>
                    <button type="button" id="6" onClick={updateCalculation}>6</button>
                </div>
                <div className="btnRow">
                    <button type="button" id="1" onClick={updateCalculation}>1</button>
                    <button type="button" id="2" onClick={updateCalculation}>2</button>
                    <button type="button" id="3" onClick={updateCalculation}>3</button>
                </div>
                <div className="btnRow">
                    <button type="button" id="0" onClick={updateCalculation}>0</button>
                    <button type="button" id="." onClick={updateCalculation}>.</button>
                    <button type="button" id="DEL" onClick={deleteLast}>BK</button>
                </div>
            </div>
            <div id="btnInputs">
                <button type="button" id="+" onClick={updateCalculation}>+</button>
                <button type="button" id="-" onClick={updateCalculation}>-</button>
                <button type="button" id="/" onClick={updateCalculation}>/</button>
                <button type="button" id="*" onClick={updateCalculation}>*</button>
                <button type="button" id="()" onClick={updateCalculation}>( )</button>
                <button type="button" id="=" onClick={calculateValue}>=</button>
            </div>
            <div id="clrrcl">
            <button type="button" id="RCL" onClick={getPrevEqu}>RCL</button>
            <button type="button" id="CLR" onClick={() => setScreenState([0])}>CLR</button>
            </div>
        </div>
    )
}

export default Calulator;