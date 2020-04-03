import React, {Component} from 'react';
import { Container, variables, flexCenter, FlexWrapper } from '../../Components/styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faListOl } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';

const containerStyled = {
    "justifyContent": "flex-start",
    "flexDirection": "column"
}

const AddPlanWrapper = styled.form`
    ${flexCenter}
    justify-content: space-between;
    width: 100%;
    background-color: ${variables.$grayBlue};
    padding: .5em;
`
const PlanWrapper = styled.div`
    ${flexCenter}
    width: 100%;
    height: 100%;
    padding: .5em;
`

const Text = styled.h2`
    color: white;
`
const CaseText = styled.h2`
    color: ${variables.$grayBlue};
    font-size: 2em;
`



const AddTaskForm = styled.form`
    width: 100%;
    padding: .5em;
    background-color: ${variables.$lightGray};
`
const Input = styled.input`
    width: 100%;
    height: 35px;
    padding: .5em;
`

class Plan extends Component {
    constructor() {
        super();
        this.state = {
            plans: [],
            amountOfPlans: 0,
            isPlanFormHidden: true
        }
    }

    createPlan = () => {
        
    }

    openPlanForm = () => {
        this.setState(prevState =>({
            isPlanFormHidden: !prevState.isPlanFormHidden
        }))
    }
    render() {
        const { amountOfPlans, plans, isPlanFormHidden } = this.state;
        const placeholder = <FlexWrapper style={{ flexDirection: "column" }}>
                                <FontAwesomeIcon icon={faListOl} style={{fontSize: 120, color: variables.$grayBlue}}/>
                                <CaseText>Brak planów</CaseText>
                            </FlexWrapper>

        const planForm =    <FlexWrapper style={{ flexDirection: "column" }}>
                                <AddTaskForm>
                                    <Input placeholder="Nazwa ćwiczenia"></Input>
                                    <Button>Dodaj</Button>
                                </AddTaskForm>
                            </FlexWrapper>
        return (
            <Container style={containerStyled}>
                <AddPlanWrapper onClick={()=> this.openPlanForm()}>
                    <Text> Stwórz plan</Text>
                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$orange}}/>
                </AddPlanWrapper>
                <PlanWrapper>
                    { isPlanFormHidden ? placeholder: planForm }
                </PlanWrapper>
            </Container>
        )
    }
}

export default Plan;