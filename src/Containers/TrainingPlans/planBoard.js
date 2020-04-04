import React, {Component} from 'react';
import app from '../../Components/base';
import helpers from '../../Components/helpers';
import { Container, variables, flexCenter, FlexWrapper } from '../../Components/styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusSquare, faListOl } from '@fortawesome/free-solid-svg-icons'
import styled from 'styled-components';
import Plan from './plan';

const containerStyled = {
    "justifyContent": "flex-start",
    "flexDirection": "column"
}

const AddPlanWrapper = styled.div`
    ${flexCenter}
    justify-content: space-between;
    width: 100%;
    background-color: ${variables.$grayBlue};
    padding: .5em;
`
const PlanWrapper = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    
`
const Text = styled.h2`
    color: white;
`
const CaseText = styled.h2`
    color: ${variables.$grayBlue};
    font-size: 2em;
`
const Placeholder = styled.div`
    ${flexCenter};
    flex-direction: column;
`


const PlanForm = styled.form`
    ${flexCenter};
    flex-direction: column;
    justify-content: flex-end;
    height: 100%;
    width: 100%;
    background-color: ${variables.$lightGray};
`
const AddTaskForm = styled.form`
    ${flexCenter};
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
`
const Input = styled.input`
    width: 100%;
    border: none;
    font-size: 1.2em;
    padding: .5em; 
`
const Button = styled.button`
    width: 100%;
    background-color: ${variables.$grayBlue};
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    padding: .5em; 
    border: none;
`
const Label = styled.label`
    font-size: 1.2em;
    padding: .25em .5em;
`
const Radio = styled.input`
    width: 1.2em;
    height: 1.2em;
`

class PlanBoard extends Component {
    constructor() {
        super();
        this.state = {
            plans: [],
            isPlanFormHidden: true
        }
    }

    componentDidMount() {
        this.setDataFromDocument();
    }
    
    setDataFromDocument = ()=> {
        const document = app.getUserCollection();
        document.get().then(doc => {
            this.setState({
                plans: doc.data().plans
            })
        })
    }

    updatePlans = ()=> {
        app.getUserCollection().update({
            "plans": this.state.plans
        })
    }

    createPlan = ()=> {
        const plan = {
            date: helpers.getCurrentDate("/"),
        }
        this.setState({
            plans: [...this.state.plans, plan]
        }, ()=> {
            this.updatePlans();
        })   
    }

    renderPlans = ()=> {
        return this.state.plans.map((plan, index) => {
            return (
                <Plan
                    key={index}
                    date={plan.date}
                />
            )
        })
    }

    render() {
        const { plans } = this.state;
        const placeholder = <Placeholder>
                                <FontAwesomeIcon icon={faListOl} style={{fontSize: 120, color: variables.$grayBlue}}/>
                                <CaseText>Brak planów</CaseText>
                            </Placeholder>

        
        return (
            <Container style={containerStyled}>
                <AddPlanWrapper onClick={()=> this.createPlan()}>
                    <Text> Nowy plan</Text>
                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$orange}}/>
                </AddPlanWrapper>
                <PlanWrapper style={plans.length ? {"justifyContent": "flex-start"} : {}}>
                    { plans.length ? this.renderPlans() : placeholder }
                </PlanWrapper>
            </Container>
        )
    }
}

export default PlanBoard;