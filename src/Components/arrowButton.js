import React from "react"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDown } from '@fortawesome/free-solid-svg-icons'

const Button = styled.button`
  font-weight: bold;
  font-size: 1em;
  color: white;
  background-color: #FF8E00;
  border: none;
  width:35px;
  height: 35px;
  border-radius: .2em;
`;

const ArrowButton = ({rotationDegree, isHide, handleClick}) => {
    return (
        <Button onClick={() => handleClick(isHide)}>
            <FontAwesomeIcon 
                icon={faAngleDown} 
                transform={{ rotate: rotationDegree }} 
                color="white" 
                style={{fontSize:30}}
            />
        </Button>
    )
}

export default ArrowButton;