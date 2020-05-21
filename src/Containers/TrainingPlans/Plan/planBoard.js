import React, {Component} from 'react';

import helpers from '../../../Components/helpers';
import app from '../../../base';
import styled from 'styled-components';
import Plan from './plan';

import { Container, variables, flexCenter, RWD } from '../../../Components/styleHelpers';
import { faPlusSquare, faListOl } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


const StyledContainer = styled(Container)`
    flex-direction: column;
    background-color: ${variables.$lightGray};
`

const AddPlanWrapper = styled.div`
    ${flexCenter}
    justify-content: space-between;
    width: 100%;
    background-color:white;
    margin-bottom: 1em;
    padding: .5em;
    @media only screen and (min-width: ${RWD.$desktop}) {
        width: 500px;
    }
`
const PlanWrapper = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    @media only screen and (min-width: ${RWD.$desktop}) {
        width: 500px;
    }
    
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
            isHidden: true,
            date: helpers.getCurrentDate(new Date(), "."),
            id: this.state.plans.length+1
        }

        updates[`users-plans/${userID}/${planKey}`] = plan;
        return app.getRealTimeDatabase().ref().update(updates);
    }
   

    // if exist some opened plan, return only this plan, otherwise return all plans
    filterPlans(array) {
        let tempPlan = null;
        let isSomePlanOpened = false;


        array.forEach(plan => {
            // if some item is opened (!hidden)
            if(!plan.isHidden) {
                isSomePlanOpened = true;
                tempPlan = plan;
            }
        })

        if(isSomePlanOpened) {
            array = [];
            array.push(tempPlan)
        } 

        return array;
    }
    renderPlans() {
        return this.filterPlans(this.state.plans).map((plan, index) => {
            return (
                <Plan
                    key={index}
                    planKey={plan.planKey}
                    date={plan.date}
                    id={plan.id}
                    isHidden={plan.isHidden}
                />
            )
        })
    }

    isSomePlanOpened() {
        let isSomePlanOpened = false;
        this.state.plans.forEach(plan => {
            if(!plan.isHidden) {
                isSomePlanOpened = true;
            }
        })
        return isSomePlanOpened;
    }
    render() {
        const { plans } = this.state;
        const placeholder = <Placeholder>
                                <FontAwesomeIcon icon={faListOl} style={{fontSize: 120, color: variables.$grayBlue}}/>
                                <CaseText>Brak planów</CaseText>
                            </Placeholder>

        const addPlanWrapper =  <AddPlanWrapper onClick={()=> this.addPlan()}>
                                    <Text> Nowy plan</Text>
                                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$grayBlue}}/>
                                </AddPlanWrapper>
        return (
            <StyledContainer>
                {!this.isSomePlanOpened() ? addPlanWrapper : null}
                <PlanWrapper style={plans.length ? {"justifyContent": "flex-start"} : {}}>
                    { plans.length ? this.renderPlans() : placeholder }
                </PlanWrapper>
            </StyledContainer>
        )
    }
}

export default PlanBoard;