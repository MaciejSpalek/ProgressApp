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
    background-color:white;
    border-bottom: .1em solid ${variables.$gray};
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
    color: ${variables.$gray};
`
const CaseText = styled.h2`
    color: ${variables.$grayBlue};
    font-size: 2em;
`
const Placeholder = styled.div`
    ${flexCenter};
    flex-direction: column;
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
                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$grayBlue}}/>
                </AddPlanWrapper>
                <PlanWrapper style={plans.length ? {"justifyContent": "flex-start"} : {}}>
                    { plans.length ? this.renderPlans() : placeholder }
                </PlanWrapper>
            </Container>
        )
    }
}

export default PlanBoard;