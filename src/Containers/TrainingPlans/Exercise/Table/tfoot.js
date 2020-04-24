import React from 'react';
import styled from 'styled-components'
import Helpers from '../../../../Components/helpers';
import ProgressSign from '../progressSign';
import { Th } from '../../../../Components/styleHelpers';

const styleLeftBottomTd = {
    "borderBottomLeftRadius": "5px"
}
const styleRightBottomTd = {
    "borderBottomRightRadius": "5px",
    "backgroundColor": "#f0f3f5"
}
const styleRightTopTd = {
    "backgroundColor": "#f0f3f5",
    "color": "black"
}

const Tfoot = styled.tfoot`

`
const Tr = styled.tr`
`
const Td = styled(Th)`
    padding: .2em;
`

const TableFooter = ({ id, trainingDay, trainingDays, amountOfSeries }) => {
    const array = Helpers.getSeries(trainingDay);

    const isTrainingVolumeDisplayed = () => {
        const currentAmountOfSeries = Helpers.getAmountOfSeries(trainingDay)
        const setAmountOfSeries = amountOfSeries;
        return currentAmountOfSeries === +setAmountOfSeries
    }

    const getProgressInPercentage = (currentDay) => {
        const allTrainingDays = Helpers.getTrainingDays(trainingDays);
        if(id === 0) {
            return 0
        } else {
            const previousVolume = Helpers.getTreningVolume(allTrainingDays[id-1])
            const currentVolume = Helpers.getTreningVolume(currentDay)
            const trainingVolume = (currentVolume/previousVolume)*100 - 100;
            const roundVolume = trainingVolume.toFixed(1);

            return roundVolume;
        }
    }
    
    return (
        isTrainingVolumeDisplayed() ? 
            <Tfoot>
                <Tr>
                    <Td colSpan="2">Objętość</Td>
                    <Td style={styleRightTopTd}>
                        {Helpers.getTreningVolume(array)}
                    </Td>
                </Tr>
                <Tr>
                    <Td colSpan="2" style={styleLeftBottomTd}>Postęp</Td>
                    <Td style={styleRightBottomTd}>
                        <ProgressSign 
                            percents={getProgressInPercentage(array)}
                        /> 
                    </Td>
                </Tr>
            </Tfoot> 
        : null
    )
}

export default TableFooter