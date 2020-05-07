import React from 'react';
import styled from 'styled-components'
import Tbody from './tbody';
import Thead from './thead';
import { Table } from '../../../Components/styleHelpers';

const StyledTable = styled(Table)`

`

const MeasurementTable = ({ parameters, date }) => {
    return (
        <StyledTable>
            <Thead date={date}/>
            <Tbody parameters={parameters} />
        </StyledTable>
    )
}

export default MeasurementTable;