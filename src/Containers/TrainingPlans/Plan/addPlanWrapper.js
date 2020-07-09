import React from 'react';
import styled from 'styled-components'
import PlusButton from '../../../Components/plusButton'
import { variables, flexCenter, RWD } from '../../../Components/styleHelpers';

const StyledContainer = styled.div`
    ${flexCenter}
    justify-content: space-between;
    width: 100%;
    background-color: ${props => props.areThereTooManyPlans ? variables.$lightRed : "white"};
    margin-bottom: 1em;
    padding: .5em;
    @media only screen and (min-width: ${RWD.$desktop}) {
        width: 500px;
    }
`
const Text = styled.h2`
    color: ${props => props.areThereTooManyPlans ? variables.$red : variables.$gray};
`


const AddPlanWrapper = ({ addPlan, areThereTooManyPlans }) => {
    return (
        <StyledContainer areThereTooManyPlans={areThereTooManyPlans}>
            <Text areThereTooManyPlans={areThereTooManyPlans}> {areThereTooManyPlans ? "Limit planów" : "Nowy plan"} </Text>
            <PlusButton 
                iconColor={areThereTooManyPlans ? variables.$red : variables.$grayBlue}
                isDisabled={areThereTooManyPlans}
                onClickFunction={()=> addPlan()}
            />
        </StyledContainer>
    )
}

export default AddPlanWrapper;