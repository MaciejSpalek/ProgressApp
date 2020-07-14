import React, {Component} from 'react';
import helpers from '../../../Components/helpers';
import app from '../../../base';
import styled from 'styled-components';
import Plan from './plan';
import AddPlanWrapper from './addPlanWrapper';
import { Container, variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers';
import { faListOl } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StyledContainer = styled(Container)`
    flex-direction: column;
    background-color: ${variables.$lightGray};
`
const StyledWrapper = styled(FlexComponent)`
    flex-direction: column;
    max-width: ${props => props.isSomePlanOpened ? "100%" : "600px"};
    height: 100%;
    padding: 0;
    @media only screen and (min-width: 600px) {
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
        height: ${props => props.isSomePlanOpened ? "100%" : "auto"};
        max-width: ${props => props.isSomePlanOpened ? "100%" : "500px"};
        padding: ${props => props.isSomePlanOpened ? "0" : ".5em"};
        border-radius: ${props => props.isSomePlanOpened ? "0" : ".5em"};
        background-color: ${props => props.isSomePlanOpened ? "transparent" : "white"};
    }
`

const StyledPlanWrapper = styled(FlexComponent)`
    flex-direction: column;
    height: 100%;
    padding:0;

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

    areThereTooManyPlans() {
        return this.state.plans.length > 2
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
    
    isSomePlanOpened() {
        let isSomePlanOpened = false;
        this.state.plans.forEach(plan => {
            if(!plan.isHidden) {
                isSomePlanOpened = true;
            }
        })
        return isSomePlanOpened;
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
    
    render() {
        const { plans } = this.state;
        const placeholder = <Placeholder>
                                <FontAwesomeIcon icon={faListOl} style={{fontSize: 120, color: variables.$grayBlue}}/>
                                <CaseText>Brak planów</CaseText>
                            </Placeholder>

        return (
            <StyledContainer>
                <StyledWrapper isSomePlanOpened={this.isSomePlanOpened()}>
                    {!this.isSomePlanOpened() ? 
                        <AddPlanWrapper 
                            addPlan={()=> this.addPlan()}
                            areThereTooManyPlans={this.areThereTooManyPlans()}
                        /> : null
                    }
                    <StyledPlanWrapper style={plans.length ? {"justifyContent": "flex-start"} : {}}>
                        { plans.length ? this.renderPlans() : placeholder }
                    </StyledPlanWrapper>
                </StyledWrapper>
            </StyledContainer>
        )
    }
}

export default PlanBoard;