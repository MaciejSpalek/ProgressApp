import React from 'react';
import styled from 'styled-components'
import TableHeader from './thead'
import TableBody from './tbody'
import TableFooter from './tfoot'


const Table = styled.table`
    border-collapse: separate;
    background: #fff;
    border-radius: 5px;
    width: 100%;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`

const DayTable = ({ id, type, trainingDay, trainingDays, amountOfSeries }) => {
    return (
        <Table>
            <TableHeader type={type}/>
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
        </Table>
    )
}

export default DayTable;