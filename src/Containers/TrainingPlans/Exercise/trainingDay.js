import React, { Component } from 'react';
import styled from 'styled-components';
import { FlexComponent, variables } from '../../../Components/styleHelpers';
import Paragraph from '../../../Components/paragraph';

const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    padding: 0 0 .5em;
`

const HeaderWrapper = styled(FlexComponent)`
    border-bottom: .1em solid ${variables.$lightGray};
    flex-direction: column;
    padding: 0;
`

const SeriesWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`
class TrainingDay extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: []
        }
    }

    filterSeries() {
        const array = this.props.day;
        const tempArray = [];
        for(let dayKey in array) {
            tempArray.push(array[dayKey])
        }
        return tempArray;
    }

    renderSeries() {
        return this.filterSeries().map(series => {
            return (
                <Paragraph 
                    fontSize={"1.2em"}
                    color={variables.$gray}
                    text={` ${series.id}. ${series.reps} x ${series.weight} `}
                    align={"flex-start"}

                    key={series.id}
                />
                // <div key={series.id}> {series.id}. {series.reps} x {series.weight} </div>
            )
        })
    }

    render() {
        const { id } = this.props;
        return (
            <StyledContainer>
                <HeaderWrapper>
                    <Paragraph 
                        fontSize={"1.2em"}
                        fontWeight={"bold"}
                        color={variables.$gray}
                        text={`Dzień ${id+1}`}
                        align={"flex-start"}
                    />
                </HeaderWrapper>
                <SeriesWrapper>
                    {this.renderSeries()}
                </SeriesWrapper>
            </StyledContainer>
        )
    }
}

export default TrainingDay;