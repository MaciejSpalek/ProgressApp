import React from 'react';
import styled from 'styled-components'
import { variables }  from './styleHelpers';

const StyledButton = styled.button`
    position: relative;
    color: white;
    width: 100%;
    min-height: 38px;
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'Patua One', cursive;
    background-color: ${variables.$grayBlue};
    border-radius: .2em;
    border: none;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
    overflow: hidden;
    cursor: pointer;
`

const Button = ({ text, style, handleClick, isDisabled }) => {
    return (
        <StyledButton 
            style={style} 
            onClick={(e)=> handleClick(e)}
            disabled={isDisabled}
        > {text}
        </StyledButton>
    )
}

export default Button;