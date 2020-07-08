import React from 'react';
import styled from 'styled-components'
import Tbody from './tbody';
import Thead from './thead';
import { Table } from '../../../Components/styleHelpers';

const StyledTable = styled(Table)`
    max-width: 350px;
    margin: 1em;
`

const MeasurementTable = ({ parameters }) => {
    return (
        <StyledTable>
            <Thead date={parameters.date}/>
            <Tbody parameters={parameters} />
        </StyledTable>
    )
}

export default MeasurementTable;