import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const Icon = styled.span`
    cursor: pointer;
`

const Cross = ({styled, fontSize, handleClick}) => {
    return (
        <Icon style={styled} onClick={() => handleClick()}>
            <FontAwesomeIcon icon={faTimes} style={fontSize}/>
        </Icon>
    )
}

export default Cross;