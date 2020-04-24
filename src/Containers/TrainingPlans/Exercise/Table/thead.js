import React from 'react';
import styled from 'styled-components';
import { Th } from '../../../../Components/styleHelpers';


const Thead = styled.thead`
    border-radius: 5px;
`

const Tr = styled.tr`

`


const TableHeader = ({ type }) => {
    const renderHeader = () => {
        if(type === "repsWithWeight") {
            return (
                <Thead>
                    <Tr>
                        <Th>seria</Th>
                        <Th>powtórzenia</Th>
                        <Th>ciężar [kg]</Th>
                    </Tr>
                </Thead>
            )
        } else if(type === "repsWithoutWeight") {
            return (
                <Thead>
                    <Tr>
                        <Th colSpan="2">seria</Th>
                        <Th colSpan="2">powtórzenia</Th>
                    </Tr>
                </Thead>
            )
        } else {
            return (
                <Thead>
                    <Tr>
                        <Th colSpan="2">seria</Th>
                        <Th colSpan="2">czas [s]</Th>
                    </Tr>
                </Thead>
            )
        }
    }

   

    return (
       renderHeader()
    )
}

export default TableHeader;