import React from 'react';
import helpers from '../../../Components/helpers';
import { StyledTh, Thead, Tr, Th } from '../../../Components/styleHelpers';


const TableHead = ({ date }) => {
    return (
        <Thead>
            <Tr>
                <StyledTh colSpan="2">{ helpers.getCurrentDate(date, ".") }</StyledTh>
            </Tr>
            <Tr>
                <Th>Partia</Th>
                <Th>Obwód</Th>
            </Tr>
        </Thead>
    )
}

export default TableHead;