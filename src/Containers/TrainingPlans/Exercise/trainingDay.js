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
        const array = this.filterSeries();
        return array.map(series => {
            return (
                <Paragraph 
                    text={` ${series.id}) ${series.reps} x ${series.weight}kg `}
                    color={variables.$gray}
                    fontSize={"1.2em"}
                    align={"flex-start"}
                    key={series.id}
                />
            )
        })
    }

    render() {
        const { id } = this.props;
        return (
            <StyledContainer>
                <HeaderWrapper>
                    <Paragraph 
                        text={`Dzień ${id+1}`}
                        align={"flex-start"}
                        fontWeight={"bold"}
                        fontSize={"1.2em"}
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