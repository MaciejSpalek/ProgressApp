import React from 'react';
import styled from 'styled-components'
import { variables }  from './styleHelpers';

const StyledButton = styled.button`
    position: relative;
    color: white;
    width: 100%;
    font-size: 1.2em;
    font-weight: bold;
    font-family: 'Patua One', cursive;
    background-color: ${variables.$grayBlue};
    border-radius: .2em;
    border: none;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
    padding: .4em;
    overflow: hidden;
`

const Button = ({ text, style, handleClick }) => {
    return (
        <StyledButton style={style} onClick={(e)=> handleClick(e)}>
            {text}
        </StyledButton>
    )
}

export default Button;