import React from 'react';
import styled from 'styled-components';
import { Tbody, Td } from '../../../Components/styleHelpers';

const Tr = styled.tr`
    :nth-child(2n) {
        background: #f0f3f5;
    }
`


const TableBody = ({ parameters: {
    neck,
    chest,
    biceps,
    forearm,
    waist,
    calf,
    thigh
}}) => {
    return (
        <Tbody>
            <Tr>
                <Td> Kark </Td>
                <Td> {neck} </Td>
            </Tr>
            <Tr>
                <Td> Klata </Td>
                <Td> {chest} </Td>
            </Tr>
            <Tr>
                <Td> Biceps </Td>
                <Td> {biceps} </Td>
            </Tr>
            <Tr>
                <Td> Przedramię </Td>
                <Td> {forearm} </Td>
            </Tr>
            <Tr>
                <Td> Talia </Td>
                <Td> {waist} </Td>
            </Tr>
            <Tr>
                <Td> Udo </Td>
                <Td> {thigh} </Td>
            </Tr>
            <Tr>
                <Td> Łydka </Td>
                <Td> {calf} </Td>
            </Tr>
        </Tbody>
    )
}

export default TableBody;