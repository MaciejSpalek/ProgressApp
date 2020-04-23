import React, { Component } from 'react';
import styled from 'styled-components';
import Paragraph from '../../../Components/paragraph';
import ProgressSign from './progressSign';
import Helpers from '../../../Components/helpers';
import { FlexComponent, variables } from '../../../Components/styleHelpers';


const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    padding: 0 0 .5em;
`

const HeaderWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`

const SeriesWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`


// table
const Table = styled.table`
    border-collapse: collapse;
    margin: 0 0 1.5em;
    font-size: .9em;
    width: 100%;
`


const Thead = styled.thead`
    background-color: ${variables.$grayBlue};
    color: white;
`
const Tbody = styled.tbody``
const Tfoot = styled.tfoot`
    border: .15em solid ${variables.$grayBlue};
    font-weight: bold;
    /* background-color: rgba(0, 92, 149, 0.5); */
`
const Th = styled.th`
    padding: .5em;
`
const BodyTr = styled.tr`
    /* border-bottom: 1px solid ${variables.$lightGray}; */
    :nth-child(even) {
        background-color: ${variables.$lightGray}
    }
    :last-of-type {
        border-bottom: .1em solid ${variables.$grayBlue};
    }
`
const Tr = styled.tr``
const Td = styled.td`
    padding: .5em;
`



class TrainingDay extends Component {
    constructor(props) {
        super(props);
    }

   
    isTrainingVolumeDisplayed() {
        const { trainingDay, amountOfSeries } = this.props;
        const currentAmountOfSeries = Helpers.getAmountOfSeries(trainingDay)
        const setAmountOfSeries = amountOfSeries;
        return currentAmountOfSeries === +setAmountOfSeries
    }

    getProgressInPercentage(currentDay) {
        const { id, trainingDays } = this.props;
        const array = Helpers.getTrainingDays(trainingDays);

        if(id === 0) {
            return 0
        } else {
            const previousVolume = Helpers.getTreningVolume(array[id-1])
            const currentVolume = Helpers.getTreningVolume(currentDay)
            const trainingVolume = (currentVolume/previousVolume)*100 - 100;
            const roundVolume = trainingVolume.toFixed(1);

            return roundVolume;
        }
    }
    
    renderSeries = (series) =>      <BodyTr key={series.id}>
                                        <Td> {series.id} </Td>
                                        <Td> {series.reps} </Td>
                                        <Td> {series.weight} </Td>
                                    </BodyTr>
   
    renderTrainingDay() {
        const { trainingDay } = this.props;
        const array = Helpers.getSeries(trainingDay);
        return (
                <Table>
                    <Thead>
                        <Tr>
                            <Th>seria</Th>
                            <Th>powtórzenia</Th>
                            <Th>ciężar</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {array.map(this.renderSeries)}
                    </Tbody>
                    { this.isTrainingVolumeDisplayed() ? <Tfoot>
                        <Tr>
                            <Td>Objętość</Td>
                            <Td> {Helpers.getTreningVolume(array)} </Td>
                            <Td>
                                <ProgressSign 
                                    percents={this.getProgressInPercentage(array)}
                                /> 
                            </Td>
                        </Tr>
                    </Tfoot> : null}
                </Table>
            )
        }
  

    render() {
        const { id } = this.props;
        return (
            <StyledContainer>
                <HeaderWrapper>
                    <Paragraph 
                        text={`Dzień ${id+1}`}
                        fontWeight={"bold"}
                        fontSize={"1.2em"}
                        padding={".5em"}
                    />
                </HeaderWrapper>
                <SeriesWrapper>
                    {this.renderTrainingDay()}
                </SeriesWrapper>
            </StyledContainer>
        )
    }
}

export default TrainingDay;