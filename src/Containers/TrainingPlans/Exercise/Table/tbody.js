import React from 'react';
import styled from 'styled-components'
import Series from './series';
import Helpers from '../../../../Components/helpers';


const Tbody = styled.tbody`

`

const TableBody = ({type, trainingDay}) => {
    const renderBody = () => {
        const array = Helpers.getSeries(trainingDay);
        return (
            <Tbody>
                {array.map((series, index) => <Series key={index} series={series} type={type} />)}
            </Tbody>
        )
    }

    return (
        renderBody()
    )
}

export default TableBody