import React from 'react';
import styled from 'styled-components'
import AddPanel from './addPanel';
import { 
    variables, 
    flexCenter, 
    FlexComponent
} from '../../../Components/styleHelpers';

const StyledPlanList = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    padding: 0;
`

const StyledPlanContent = styled.div`
    ${flexCenter};
    flex-direction: column;
    justify-content: ${props => props.isHidden ? "space-between" : "flex-end"};
    width: 100%;
    height: 100%;
    overflow: auto;
`
const StyledCaption = styled.h2`
    font-size: 1.5em;
    color: ${variables.$gray};
    padding: .5em;
`


const PlanContent = ({ 
    getAmountOfExercises,
    handleRadioButton, 
    isAddPanelHidden, 
    isExercisesExist,
    handleAddPanel, 
    renderExercise,
    addExercise, 
    planKey, 
    radio
}) => {
    return (
        <StyledPlanContent isHidden={isAddPanelHidden}>
            {isAddPanelHidden ?
            <StyledPlanList>
                <StyledCaption> { isExercisesExist() ? `Lista ćwiczeń (${getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</StyledCaption>
                {renderExercise()}
            </StyledPlanList> : null}
            <AddPanel 
                radio={radio}
                planKey={planKey}
                addExercise={(e)=> addExercise(e, planKey)}
                handleRadioButton={(e)=> handleRadioButton(e)}
                handleAddPanel={()=> handleAddPanel()}
                isAddPanelHidden={isAddPanelHidden}
            />
        </StyledPlanContent>
    )
}

export default PlanContent;