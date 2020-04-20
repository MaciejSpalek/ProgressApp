import React, { Component } from 'react';
import styled from 'styled-components';
import { FlexComponent, variables } from '../../../Components/styleHelpers';
import Paragraph from '../../../Components/paragraph';

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
const Tbody = styled.tbody`
    
`

const Th = styled.th`
    padding: .5em;
`
const Tr = styled.tr`
    border-bottom: 1px solid ${variables.$lightGray};
    :nth-last-of-type(even) {
        background-color: ${variables.$lightGray};
    }
    :last-of-type {
        border-bottom: .1em solid ${variables.$grayBlue};
    }
`
const Td = styled.td`
    padding: .5em;
`



class TrainingDay extends Component {
    constructor(props) {
        super(props);
    }

    filterSeries() {
        const array = this.props.day;
        const tempArray = [];
        for(let dayKey in array) {
            tempArray.push(array[dayKey])
        }
        return tempArray;
    }

    renderSeries = (series) =>      <Tr key={series.id}>
                                        <Td> {series.id} </Td>
                                        <Td> {series.reps} </Td>
                                        <Td> {series.weight} </Td>
                                        <Td> {series.weight * series.reps} </Td>
                                    </Tr>
   
    renderTrainingDay() {
        const array = this.filterSeries();
        return (
      
                <Table style={{width: "100%"}}>
                    <Thead>
                        <Tr>
                            <Th>seria</Th>
                            <Th>powtórzenia</Th>
                            <Th>ciężar</Th>
                            <Th>objętość</Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {array.map(this.renderSeries)}
                    </Tbody>
                </Table>
            )
    }
    getProgressInPercentage() {
        const array = this.filterSeries();
        
    }
    getTreningVolume() {
        const array = this.filterSeries();
        return array.reduce((volume, series) => volume + series.weight*series.reps, 0)
    }
    render() {
        const { id } = this.props;
        const trainingVolume = this.getTreningVolume();
        
 
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
                    <Paragraph 
                        text={`Objętość: ${trainingVolume}`}
                        align={"flex-start"}
                        fontWeight={"bold"}
                        fontSize={"1.2em"}
                        color={variables.$gray}
                    />
                </SeriesWrapper>
            </StyledContainer>
        )
    }
}

export default TrainingDay;