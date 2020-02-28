import React from "react"
import styled from 'styled-components';

const DataParagraph = styled.p`
  font-size: 1.5em;
  font-weight: bold;
  color: white;
`;

const getCurrentDate = (separator='') => {
    let newDate = new Date()
    let date = newDate.getDate();
    let month = newDate.getMonth() + 1;
    let year = newDate.getFullYear();
    return `${date}${separator}${month<10?`0${month}`:`${month}`}${separator}${year}`
    }

const Data = () => {
    return (
        <DataParagraph>{ getCurrentDate("-") }</DataParagraph>
    )
}

export default Data;