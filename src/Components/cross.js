import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { variables } from './styleHelpers'

const StyledIcon = styled(FontAwesomeIcon)`
    color: ${variables.$gray};
`
const StyledIconButton = styled.div`
    cursor: pointer;
`

const Cross = ({
    styled, 
    fontSize, 
    color, 
    handleClick
}) => {
    return (
        <StyledIconButton 
            onClick={() => handleClick()}
            style={styled} 
            role="button"
            aria-label="Close">
            <StyledIcon 
                style={{fontSize: fontSize}}
                icon={faTimes} 
                color={color}
            />
        </StyledIconButton>
    )
}

export default Cross;