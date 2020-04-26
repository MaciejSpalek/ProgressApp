import React from 'react';
import styled from 'styled-components';
import { Th } from '../../../../Components/styleHelpers';


const Thead = styled.thead`
    border-radius: 5px;
`

const Tr = styled.tr`

`

const StyledTh = styled(Th)`
    :first-child {
        border-top-left-radius: 5px;
    }
    :last-child {
        border-top-right-radius: 5px;
    }
    font-size: 1.3em;
    font-weight: bold;
`


const TableHeader = ({ type, id }) => {
    const renderHeader = () => {
        if(type === "repsWithWeight") {
            return (
                <Thead>
                    <Tr>
                        <StyledTh colSpan="3">{`Dzień ${id+1}`}</StyledTh>
                    </Tr>
                    <Tr>
                        <Th>Seria</Th>
                        <Th>Powtórzenia</Th>
                        <Th>Ciężar [kg]</Th>
                    </Tr>
                </Thead>
            )
        } else if(type === "repsWithoutWeight") {
            return (
                <Thead>
                     <Tr>
                        <StyledTh colSpan="3">{`Dzień ${id+1}`}</StyledTh>
                    </Tr>
                    <Tr>
                        <Th colSpan="2">Seria</Th>
                        <Th colSpan="2">Powtórzenia</Th>
                    </Tr>
                </Thead>
            )
        } else {
            return (
                <Thead>
                    <Tr>
                        <StyledTh colSpan="3">{`Dzień ${id+1}`}</StyledTh>
                    </Tr>
                    <Tr>
                        <Th colSpan="2">Seria</Th>
                        <Th colSpan="2">Czas [s]</Th>
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