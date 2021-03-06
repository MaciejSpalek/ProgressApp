import React from "react"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { flexCenter } from "./styleHelpers";


const Button = styled.button`
    ${flexCenter};
    font-weight: bold;
    font-size: 1em;
    color: white;
    border: none;
    width:35px;
    height: 35px;
    border-radius: .2em;
    padding: 0 .5em;
    cursor: pointer;
`;

const ArrowButton = ({ isHide, handleFunction, fontColor, backgroundColor }) => {
    const arrowDown = { rotate: 0 };
    const arrowUp = { rotate: 180 };

    return (
        <Button style={{backgroundColor: backgroundColor}} onClick={() => handleFunction()}>
            <FontAwesomeIcon 
                icon={faAngleDown} 
                transform={isHide ? arrowDown: arrowUp} 
                color={fontColor} 
                style={{fontSize:30}}
            />
        </Button>
    )
}

export default ArrowButton;