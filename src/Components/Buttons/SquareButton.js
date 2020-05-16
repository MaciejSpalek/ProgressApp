import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const StyledButton = styled.button`
    border: none;
    border-radius: .3em;
`
const SquareButton = ({ 
    iconName, 
    iconFontSize, 
    iconColor, 
    buttonStyles, 
    handleFunction 
}) => {
    return (
        <StyledButton style={buttonStyles} onClick={(e)=> handleFunction(e)}>
            <FontAwesomeIcon icon={iconName} style={{fontSize: iconFontSize, color: iconColor}}/>
        </StyledButton>
    )
}

export default SquareButton;