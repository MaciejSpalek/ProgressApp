import React from 'react';
import styled from 'styled-components'

const StyledInput = styled.input`
    width: 100%;
    height: 35px;
    border: none;
    border-radius: .3em;
    font-size: 1.1em;
    padding: 0 .5em;
`

const Input = ({ 
    handleFunction, 
    placeholder, 
    isRequired, 
    maxLength,
    ariaLabel,
    value, 
    style, 
    name, 
    type, 
    min, 
    max, 
 }) => {
    return (
        <StyledInput 
            onChange={(e)=> handleFunction(e)}
            placeholder={placeholder}
            maxLength={maxLength}
            required={isRequired}
            autoComplete={"off"}
            defaultValue={value}
            style={style}
            name={name}  
            type={type}
            min={min}
            max={max}
            aria-label={ariaLabel}
        />
    )
}

export default Input;