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
    text, labelStyle, ...props
 }) => {
    return (
        <Label style={labelStyle}>
            {text}
            <Input  {...props} />
        </Label>
    )
}

export default InputLabel;
