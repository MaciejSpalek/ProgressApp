import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../../Components/paragraph';
import { FlexComponent } from '../../../Components/styleHelpers';
import DayTable from './Table/table';


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


const TrainingDay = ({ id, type, trainingDay, trainingDays, amountOfSeries }) => {
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
                    <DayTable 
                        id={id}
                        type={type} 
                        trainingDay={trainingDay} 
                        trainingDays={trainingDays}
                        amountOfSeries={amountOfSeries}
                    />
                </SeriesWrapper>
            </StyledContainer>
        )
}

export default TrainingDay;