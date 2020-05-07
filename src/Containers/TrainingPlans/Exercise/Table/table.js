import React from 'react';
import TableHeader from './thead'
import TableBody from './tbody'
import TableFooter from './tfoot'
import { Table } from '../../../../Components/styleHelpers';

const DayTable = ({ id, type, trainingDay, trainingDays, amountOfSeries }) => {
    return (
        <Table>
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
        </Table>
    )
}

export default DayTable;