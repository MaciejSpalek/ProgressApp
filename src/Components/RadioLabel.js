import React from 'react';
import styled from 'styled-components'

const Label = styled.label`
    font-size: 1.2em;
    padding: .25em .5em;
`
const Radio = styled.input`
    width: 1.2em;
    height: 1.2em;
`


const RadioLabel = ({ text, handleFunction, isChecked, value }) => {
    return (
        <Label>
            <Radio  type={"radio"} 
                    name="radio" 
                    value={value} 
                    checked={isChecked} 
                    onChange={(e) => handleFunction(e)}>
            </Radio> 
            {text}
    </Label>
    )
}

export default RadioLabel;