import React from "react"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'
import { variables } from "./styleHelpers"


const Button = styled.button`
  font-weight: bold;
  font-size: 1em;
  color: white;
  background-color: ${variables.$grayBlue};
  border: none;
  width:35px;
  height: 35px;
  border-radius: .2em;
`;

const ArrowButton = ({ isHide, handleClick }) => {
    const arrowDown = { rotate: 0 };
    const arrowUp = { rotate: 180 };

    return (
        <Button onClick={() => handleClick(isHide)}>
            <FontAwesomeIcon 
                icon={faAngleDown} 
                transform={isHide ? arrowDown: arrowUp} 
                color="white" 
                style={{fontSize:30}}
            />
        </Button>
    )
}

export default ArrowButton;