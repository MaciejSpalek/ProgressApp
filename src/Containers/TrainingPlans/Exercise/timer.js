import React from 'react';
import styled from 'styled-components'
import { FlexComponent, variables } from '../../../Components/styleHelpers';
import Button from '../../../Components/Button';

const StyledContainer = styled(FlexComponent)`
    justify-content: space-between;
    padding: 0;
    margin: 1em 0;
`

const Square = styled.span`
    background-color: ${variables.$grayBlue};
    width: 100%;
    padding: .5em;
    margin: 0 .5em;
    color: white;
    font-size: 1.3em;
    font-weight: bold;
    font-family: 'Patua One', cursive;
    border-radius: .5em;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
`

const Timer = ({ time, startTimer, stopTimer }) => {
    const getTimeParameter = parameter => {
        return parameter > 9 ? parameter : `0${parameter}`
    }

    const getTime = () => {
        let seconds = 0;
        let minutes = 0;

        const tempSeconds = (time%60);
        const tempMinutes = Math.floor((time/60))
        seconds = getTimeParameter(tempSeconds)
        minutes = getTimeParameter(tempMinutes);
    
        return `${minutes}:${seconds}`;
    }
  
    return (
        <StyledContainer>
            <Button  handleClick={()=> startTimer()} text={"Start"}/>
            <Square> { getTime() } </Square>
            <Button  handleClick={(e)=> stopTimer(e)} text={"Stop"}/>
        </StyledContainer>
    )
}

export default Timer;