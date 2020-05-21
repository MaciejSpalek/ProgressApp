import React from 'react';
import styled from 'styled-components'

const StyledDot = styled.input`
    position: absolute;
    bottom: 10%;
    right: 10%;
    background-color: ${props => props.isLogged ? "green" : "red"};
    width: ${props => props.size};
    height: ${props => props.size};
    border: ${props => props.dotBorder} solid white;
    border-radius: 50%;
`

const OnlineDot = ({ size, isLogged, dotBorder }) => {
    return (
        <StyledDot 
            size={size}
            isLogged={isLogged}
            dotBorder={dotBorder}
        />
    )
}

export default OnlineDot;