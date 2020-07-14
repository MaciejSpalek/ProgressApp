import React from 'react'
import { variables, flexCenter } from '../../../Components/styleHelpers'
import { faChartArea } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import Paragraph from '../../../Components/paragraph'


const Button = styled.button`
    ${flexCenter};
    padding: .5em;
    background-color: ${variables.$grayBlue};
    border: none;
    border-radius: .5em;
    cursor: pointer;
`
const ChartButton = ({ handleFunction }) => {
    return (
        <Button onClick={()=> handleFunction()}>
            <FontAwesomeIcon icon={faChartArea} style={{color: variables.$orange, fontSize: 30, marginRight: ".2em"}} />
            <Paragraph 
                text={"Wykres"}
                fontSize={"1.3em"}
                fontWeight={"bold"}
                padding={".3em 0"}
                color={"white"} 
            />
        </Button>
    )
}

export default ChartButton;