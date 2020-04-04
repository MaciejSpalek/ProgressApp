import React, { Component } from 'react';
import styled from 'styled-components';
import { variables, flexCenter, SpaceBetweenWrapper } from '../../Components/styleHelpers';
import ArrowButton from '../../Components/arrowButton';

const Container = styled.div`
    ${flexCenter}
    width: 100%;
    padding: .5em;
`
const Date = styled.p`
    color: ${variables.$gray};
    font-size: 1.5em;
    font-weight: bold;
`
class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHide: true 
        }
    }

    handleArrowButton() {
        this.setState( prevState => ({
            isHide: !prevState.isHide
        }))
    }

    render() {
        const { date } = this.props;
        const { isHide } = this.state;
        // const planForm =    <PlanForm>
        //                         <AddTaskForm>
        //                             <Input placeholder="Nazwa ćwiczenia"></Input>
        //                             <FlexWrapper style={{padding: '.5em 0'}}>
        //                                 <Label><Radio type="radio" name="seriesType" checked></Radio> Powótrzenia </Label>
        //                                 <Label><Radio type="radio" name="seriesType"></Radio> Czasowo </Label>
        //                             </FlexWrapper>
        //                             <Button>Dodaj</Button>
        //                         </AddTaskForm>
        //                     </PlanForm>
        return (
            <Container>
                <SpaceBetweenWrapper style={{backgroundColor: "white"}}>
                    <Date> {date} </Date>
                    <ArrowButton
                        isHide={isHide}
                        handleArrowButton={()=> this.handleArrowButton()}
                    />
                </SpaceBetweenWrapper>
            </Container>
        )
    }
}

export default Plan;