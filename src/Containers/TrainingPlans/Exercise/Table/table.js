import React from 'react';
import styled from 'styled-components'
import TableHeader from './thead'
import TableBody from './tbody'
import TableFooter from './tfoot'
import { Table } from '../../../../Components/styleHelpers';


const StyledTable = styled(Table)`
    @media only screen and (min-width: 768px) {
        margin: 1em;
        max-width: 400px;
    }
`
const DayTable = ({ id, type, trainingDay, trainingDays, amountOfSeries }) => {
    return (
        <StyledTable>
            <TableHeader 
                type={type}
                id={id}
            />
            <TableBody 
                trainingDay={trainingDay}
                type={type} 
            />
            <TableFooter
                amountOfSeries={amountOfSeries}
                trainingDays={trainingDays}
                trainingDay={trainingDay}
                type={type}
                id={id} 
            />
        </StyledTable>
    )
}

export default DayTable;