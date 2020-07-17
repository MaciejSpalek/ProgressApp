import React from 'react';
import styled from 'styled-components'

const Label = styled.label`
    font-size: 1.2em;
    padding: .25em 0;
`
const Radio = styled.input`
    margin: 0 .25em;
    -ms-transform: scale(1.3);
    -webkit-transform: scale(1.3); 
    transform: scale(1.3);
`


const RadioLabel = ({ text, handleFunction, isChecked, value }) => {
    return (
        <Label>
            <Radio  
                type={"radio"} 
                name={"radio"}
                value={value} 
                checked={isChecked} 
                onChange={(e) => handleFunction(e)} 
            />
            {text}
    </Label>
    )
}

export default RadioLabel;