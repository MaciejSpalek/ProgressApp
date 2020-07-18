import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flexCenter } from '../styleHelpers'

const StyledButton = styled.button`
    ${flexCenter};
    position: ${props => props.position ? props.position : "static"};
    border: none;
    border-radius: .3em;
    background-color: transparent;
    cursor: pointer;
`
const SquareButton = ({ 
    iconName, 
    position, 
    iconColor,
    iconStyle,
    buttonStyles, 
    handleFunction 
}) => {
    return (
        <StyledButton 
            onClick={(e)=> handleFunction(e)}
            style={buttonStyles}
            position={position}>
            <FontAwesomeIcon 
                icon={iconName} 
                color={iconColor} 
                style={iconStyle}
            />
        </StyledButton>
    )
}

export default SquareButton;