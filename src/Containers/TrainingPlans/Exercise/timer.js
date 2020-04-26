import React, { useState, useEffect } from 'react';
import styled from 'styled-components'
import { FlexComponent, variables } from '../../../Components/styleHelpers';

const StyledContainer = styled(FlexComponent)`
    justify-content: space-between;
    padding: 0;
    margin: 1em 0;
`

const Square = styled.span`
    background-color: ${variables.$grayBlue};
    padding: .5em;
    color: white;
    font-size: 1.3em;
    font-weight: bold;
    font-family: 'Patua One', cursive;
    border-radius: .5em;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
`
const Button = styled.button`
    position: relative;
    color: white;
    font-size: 1.3em;
    font-weight: bold;
    font-family: 'Patua One', cursive;
    background-color: ${variables.$grayBlue};
    border-radius: .2em;
    border: none;
    text-shadow: 1px 1px 0px rgba(0, 0, 0, 0.5);
    padding: .5em;
    overflow: hidden;
    /* box-shadow: inset 0 -2px 5px black; */
    ::before {
        content: "";
        position: absolute;
        top: calc(100% - 3px);
        left: 0;
        width: 100%;
        height: 3px;
        background-color: #343d47;
    }
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
    
        return `${minutes} : ${seconds}`;
    }
  
    return (
        <StyledContainer>
            <Button  onClick={()=> startTimer()}> Start </Button>
            <Square> { getTime() } </Square>
            <Button  onClick={(e)=> stopTimer(e)}> Stop </Button>
        </StyledContainer>
    )
}

export default Timer;