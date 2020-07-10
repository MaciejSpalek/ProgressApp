import React, { Component } from 'react';
import styled from 'styled-components'
import AddPanel from './addPanel';
import { 
    variables, 
    flexCenter, 
    FlexComponent,
    RWD
} from '../../../Components/styleHelpers';

const StyledExerciseList = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    padding: 0;
    @media only screen and (min-width: 768px) {
        flex: 1;
        height: 100%;
    }
`

const StyledPlanContent = styled.div`
    ${flexCenter};
    flex-direction: column;
    justify-content: ${props => props.isHidden ? "space-between" : "flex-end"};
    width: 100%;
    height: 100%;
    overflow: auto;

    @media only screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
    }
`
const StyledCaption = styled.h2`
    font-size: 1.5em;
    color: ${variables.$gray};
    padding: .5em;
`



class PlanContent extends Component { 
    _isMounted = false;
    constructor() {
        super();
        this.state = {
            windowWidth: 0,
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.handleResize()
        window.addEventListener('resize', ()=> this.handleResize());
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', ()=> this.handleResize());
    }

    handleResize() {
        this.setState({windowWidth: window.innerWidth});
    }

    getPlanContentView() {
        const { windowWidth } = this.state;
        const {
            getAmountOfExercises,
            handleRadioButton, 
            isAddPanelHidden, 
            isExercisesExist,
            handleAddPanel, 
            renderExercise,
            addExercise, 
            planKey, 
            radio 
        } = this.props;

        if(windowWidth > RWD.$tablet) {
            return (
                <StyledPlanContent isHidden={isAddPanelHidden}>
                    <StyledExerciseList>
                        <StyledCaption> { isExercisesExist() ? `Lista ćwiczeń (${getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</StyledCaption>
                        {renderExercise()}
                    </StyledExerciseList>
                    <AddPanel 
                        radio={radio}
                        planKey={planKey}
                        addExercise={(e)=> addExercise(e, planKey)}
                        handleRadioButton={(e)=> handleRadioButton(e)}
                        handleAddPanel={()=> handleAddPanel()}
                        isAddPanelHidden={false}
                        isArrowButtonHidden={true}
                    />
                </StyledPlanContent>
            )
        } else  {
            return (
                <StyledPlanContent isHidden={isAddPanelHidden}>
                    {isAddPanelHidden ?
                    <StyledExerciseList>
                        <StyledCaption> { isExercisesExist() ? `Lista ćwiczeń (${getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</StyledCaption>
                        {renderExercise()}
                    </StyledExerciseList> : null}
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
    }
    render() {
        return (
            this.getPlanContentView()
        )
    }
}

export default PlanContent;