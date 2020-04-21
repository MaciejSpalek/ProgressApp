import React, { Component } from 'react';
import styled from 'styled-components';
import Paragraph from '../../../Components/paragraph';
import ProgressSign from './progressSign';
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
    font-size: .9em;
    width: 100%;
    margin: 0 0 1.5em;
`


const Thead = styled.thead`
    background-color: ${variables.$grayBlue};
    color: white;
`
const Tbody = styled.tbody``
const Tfoot = styled.tfoot`
    border: .15em solid ${variables.$grayBlue};
    font-weight: bold;
    color: black;
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

    getTrainingDays() {
        const array = this.props.days;
        const allDays = [];
        
        array.forEach(day => {
            const oneDay = []
            for(let allSeries in day) {
                oneDay.push(day[allSeries])
            }
            allDays.push(oneDay)
        });
        return allDays;
    }
    getSeries(array) {
        const tempArray = [];
        for(let series in array) {
            tempArray.push(array[series])
        }
        return tempArray;
    }
    getProgressInPercentage(currentDay) {
        const { id } = this.props;
        const array = this.getTrainingDays();

        if(id === 0) {
            return 0
        } else {
            const previousVolume = this.getTreningVolume(array[id-1])
            const currentVolume = this.getTreningVolume(currentDay)
            const trainingVolume = (currentVolume/previousVolume)*100 - 100;
            const roundVolume = trainingVolume.toFixed(1);

            return roundVolume;
        }
    }
    getTreningVolume(array) {
        const tempArray = this.getSeries(array);
        return tempArray.reduce((volume, series) => volume + series.weight*series.reps, 0)
    }
    renderSeries = (series) =>      <BodyTr key={series.id}>
                                        <Td> {series.id} </Td>
                                        <Td> {series.reps} </Td>
                                        <Td> {series.weight} </Td>
                                    </BodyTr>
    renderTrainingDay() {
        const array = this.getSeries(this.props.day);
        return (
                <Table style={{width: "100%"}}>
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
                    <Tfoot>
                        <Tr>
                            <Td>Objętość</Td>
                            <Td> {this.getTreningVolume(array)} </Td>
                            <Td>
                                <ProgressSign 
                                    percents={this.getProgressInPercentage(array)}
                                /> 
                            </Td>
                        </Tr>
                    </Tfoot>
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