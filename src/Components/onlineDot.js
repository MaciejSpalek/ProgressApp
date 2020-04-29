import React from 'react';
import styled from 'styled-components'

const StyledDot = styled.input`
    position: absolute;
    bottom: 1.2em;
    right: 1.2em;
    background-color: ${props => props.isLogged ? "green" : "red"};
    width: ${props => props.size};
    height: ${props => props.size};
    border: .2em solid white;
    border-radius: 50%;
`

const OnlineDot = ({ size, isLogged }) => {
    return (
        <StyledDot 
            size={size}
            isLogged={isLogged}
        />
    )
}

export default OnlineDot;