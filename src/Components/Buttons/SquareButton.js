import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { flexCenter } from '../styleHelpers'

const StyledButton = styled.button`
    ${flexCenter};
    position: absolute;
    border: none;
    border-radius: .3em;
    background-color: transparent;
`
const SquareButton = ({ 
    iconName, 
    iconColor, 
    iconStyle,
    buttonStyles, 
    handleFunction 
}) => {
    return (
        <StyledButton style={buttonStyles} onClick={(e)=> handleFunction(e)}>
            <FontAwesomeIcon 
                icon={iconName} 
                color={iconColor} 
                style={iconStyle}
            />
        </StyledButton>
    )
}

export default SquareButton;