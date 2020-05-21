import React from 'react';
import { StyledTh, Thead, Tr, Th } from '../../../Components/styleHelpers';


const TableHead = ({ date }) => {
    return (
        <Thead>
            <Tr>
                <StyledTh colSpan="2">{ date }</StyledTh>
            </Tr>
            <Tr>
                <Th>Partia</Th>
                <Th>Obwód [cm]</Th>
            </Tr>
        </Thead>
    )
}

export default TableHead;