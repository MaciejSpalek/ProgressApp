import React from 'react'
import { variables, flexCenter } from '../../../Components/styleHelpers'
import { faChartBar } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styled from 'styled-components'
import Paragraph from '../../../Components/paragraph'


const Button = styled.button`
    ${flexCenter};
    width: 100%;
    padding: .5em;
    background-color: ${variables.$grayBlue};
    border: none;
    border-radius: .5em;
    margin: .5em 0 1em;
`
const ChartButton = () => {
    return (
        <Button>
            <FontAwesomeIcon icon={faChartBar} style={{color: variables.$orange, fontSize: 40, marginRight: ".2em"}} />
            <Paragraph 
                text={"Wykres postępu"}
                fontSize={"1.8em"}
                fontWeight={"bold"}
                padding={".3em 0"}
                color={"white"} 
            />
        </Button>
    )
}

export default ChartButton;