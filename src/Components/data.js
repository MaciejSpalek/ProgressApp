import React from "react"
import styled from 'styled-components';

const DataParagraph = styled.p`
  font-size: 1.2em;
  font-weight: bold;
  color: white;
`;

const Data = ({data}) => {
    return (
        <DataParagraph>{data}</DataParagraph>
    )
}

export default Data;