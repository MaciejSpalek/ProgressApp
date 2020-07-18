import React from 'react';
import styled from 'styled-components'

const StyledDot = styled.span`
    position: ${props => props.position};
    bottom: ${props => props.gap};
    right: ${props => props.gap};
    width: ${props => props.size};
    height: ${props => props.size};
    border: ${props => props.dotBorder} solid white;
    border-radius: 50%;
    background-color: ${props => props.isLogged ? "green" : "red"};
`

const OnlineDot = ({ 
    dotBorder, 
    isLogged, 
    position, 
    size,
    gap 
}) => {
    return (
        <StyledDot 
            dotBorder={dotBorder}
            position={position}
            isLogged={isLogged}
            size={size}
            gap={gap}
        />
    )
}

export default OnlineDot;