import React, { useState, useEffect, useRef } from "react";
import Screen from "./Parts/Screen";
import Button from "./Parts/Button";

const Calulator = () => {

    const [screenState,setScreenState] = useState([0])
    
    return(
        <div id="calculator">
            <Screen
                screenState = {screenState}
            />
        </div>
    )
}

export default Calulator;