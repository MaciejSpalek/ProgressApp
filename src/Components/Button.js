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
    /* ::before {
        content: "";
        position: absolute;
        top: calc(100% - 3px);
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #343d47;
    } */
`

const Button = ({ text, handleClick }) => {
    return (
        <StyledButton onClick={(e)=> handleClick(e)}>
            {text}
        </StyledButton>
    )
}

export default Button;