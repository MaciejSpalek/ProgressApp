import React from 'react'
import styled from 'styled-components'
import { faPlusSquare } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { variables } from './styleHelpers'


const Button = styled.button`
    background-color: transparent;
    border: none;
`
const PlusButton = () => {
    return (
        <Button>
            <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$grayBlue}}/>
        </Button>
    )
}

export default PlusButton;