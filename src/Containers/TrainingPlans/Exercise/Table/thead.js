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
`


const TableHeader = ({ type }) => {
    const renderHeader = () => {
        if(type === "repsWithWeight") {
            return (
                <Thead>
                    <Tr>
                        <StyledTh>seria</StyledTh>
                        <StyledTh>powtórzenia</StyledTh>
                        <StyledTh>ciężar [kg]</StyledTh>
                    </Tr>
                </Thead>
            )
        } else if(type === "repsWithoutWeight") {
            return (
                <Thead>
                    <Tr>
                        <StyledTh colSpan="2">seria</StyledTh>
                        <StyledTh colSpan="2">powtórzenia</StyledTh>
                    </Tr>
                </Thead>
            )
        } else {
            return (
                <Thead>
                    <Tr>
                        <StyledTh colSpan="2">seria</StyledTh>
                        <StyledTh colSpan="2">czas [s]</StyledTh>
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