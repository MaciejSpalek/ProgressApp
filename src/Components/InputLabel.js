import React from 'react';
import styled from 'styled-components'
import Input from './input';
import { flexCenter, variables } from './styleHelpers';

const Label = styled.label`
    ${flexCenter};
    flex-direction: column;
    align-items: flex-start;
    font-size: 1.2em;
    padding: .25em 0;
    width: 100%;
    color: ${variables.$gray};
    font-size: 1.3em;
    font-weight: bold;
`

const InputLabel = ({ 
    handleFunction, 
    placeholder, 
    isRequired, 
    labelStyle,
    maxLength,
    value, 
    style,
    text, 
    name, 
    type, 
    min, 
    max, 
 }) => {
    return (
        <Label style={labelStyle}>
            {text}
            <Input  
                handleFunction={(e)=> handleFunction(e)}
                placeholder={placeholder}
                maxLength={maxLength}
                isRequired={isRequired}
                value={value}
                style={style}
                name={name}  
                type={type}
                min={min}
                max={max}
            />
    </Label>
    )
}

export default InputLabel;
