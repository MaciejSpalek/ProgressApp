import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledButton = styled.button`
    position: absolute;
    border: none;
    border-radius: .3em;
    background-color: white;
`
const SquareButton = ({ 
    iconName, 
    iconColor, 
    buttonStyles, 
    handleFunction 
}) => {
    return (
        <StyledButton style={buttonStyles} onClick={(e)=> handleFunction(e)}>
            <FontAwesomeIcon icon={iconName} color={iconColor} />
        </StyledButton>
    )
}

export default SquareButton;