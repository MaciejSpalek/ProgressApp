import React from 'react'
import styled from 'styled-components'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { variables } from './styleHelpers'

const Button = styled.button`
    background-color: transparent;
    border: none;
    width: auto;
    height: auto;
    cursor: pointer;
    
`

const PlusButton = ({ iconColor, isDisabled, onClickFunction }) => {
    return (
        <Button 
            disabled={isDisabled}
            onClick={()=> onClickFunction()}>
            <FontAwesomeIcon 
                icon={faPlusSquare} 
                style={{
                    fontSize: 40, 
                    color: iconColor
                }}
            />
        </Button>
    )
}

export default PlusButton;