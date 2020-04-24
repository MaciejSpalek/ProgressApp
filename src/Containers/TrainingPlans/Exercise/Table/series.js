import React from 'react';
import styled from 'styled-components'

const Tr = styled.tr`
    :nth-child(2n) {
        background: #f0f3f5;
    }
`
const Td = styled.td`
    padding: .5em;
`



const Series = ({series, type}) => {
    const renderSeries = () => {
        if(type === "repsWithWeight") {
            return (
                <Tr key={series.id}>
                    <Td> {series.id} </Td>
                    <Td> {series.reps} </Td>
                    <Td> {series.weight} </Td>
                </Tr>
            )
        } else if(type === "repsWithoutWeight") {
            return (
                <Tr key={series.id}>
                    <Td colSpan="2"> {series.id} </Td>
                    <Td colSpan="2"> {series.reps} </Td>
                </Tr>
            )
        } else {
            return (
                <Tr key={series.id}>
                    <Td colSpan="2"> {series.id} </Td>
                    <Td colSpan="2"> {series.time} </Td>
                </Tr>
            )
        }
    }

    return (
        renderSeries()
    )
}

export default Series;
