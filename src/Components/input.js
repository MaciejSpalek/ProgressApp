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

const Input = ({ name, type, style, placeholder, handleFunction }) => {
    return (
        <StyledInput 
            name={name}  
            type={type}
            style={style}
            placeholder={placeholder}
            onChange={(e)=> handleFunction(e)}
            autoComplete={"off"}
        />
    )
}

export default Input;