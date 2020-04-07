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
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            plans: [],
            isPlanFormHidden: true
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.assignPlansToState();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }


    assignPlansToState() {
        const userID = app.getUserID();
        const usersPlansRef = app.getRealTimeDatabase().ref('users-plans').child(userID);
        usersPlansRef.on("value", snapshot => {
            const plans = helpers.snapshotToArray(snapshot);
            if (this._isMounted) {
                this.setState({plans})
            }
        })
    }



    addPlan() {
        const userID = app.getUserID();
        const usersPlansRef = app.getRealTimeDatabase().ref('users-plans').child(userID);
        const planKey = usersPlansRef.push().key;
        const updates = {};
        const plan = {
            planKey: planKey,
            date: helpers.getCurrentDate("/")
        }

        updates[`users-plans/${userID}/${planKey}`] = plan;
        return app.getRealTimeDatabase().ref().update(updates);
    }
   


    renderPlans() {
        return this.state.plans.map((plan, index) => {
            return (
                <Plan
                    key={index}
                    planKey={plan.planKey}
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

        console.log(plans)
        return (
            <Container style={containerStyled}>
                <AddPlanWrapper onClick={()=> this.addPlan()}>
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