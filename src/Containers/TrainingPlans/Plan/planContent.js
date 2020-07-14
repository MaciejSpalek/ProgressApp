import React, { Component } from 'react';
import styled from 'styled-components'
import AddPanel from './addPanel';
import { 
    variables, 
    flexCenter, 
    FlexComponent,
    RWD
} from '../../../Components/styleHelpers';

const StyledPlanContent = styled.div`
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;

    @media only screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: center;
    }
`


const StyledWrapper = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-start;
    height: ${props => props.isAddPanelHidden ? "calc(100vh - 64px - 50px - 50px - .5em )" : "100%"};
    position: ${props => props.isAddPanelHidden ? "absolute" : "static"};
    top: 0;
    left: 0;
`

const StyledExerciseList = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-start;
    overflow: auto;
    padding: 0;
    @media only screen and (min-width: 768px) {
        flex-direction: row;
        justify-content: center;

        align-items: flex-start;
        flex-wrap: wrap;
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
                <StyledPlanContent>
                    <StyledWrapper>
                        <StyledCaption> { isExercisesExist() ? `Lista ćwiczeń (${getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</StyledCaption>
                        <StyledExerciseList>
                            {renderExercise()}
                        </StyledExerciseList>
                    </StyledWrapper>
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
                <StyledPlanContent isAddPanelHidden={isAddPanelHidden}>
                    {isAddPanelHidden ?
                    <StyledWrapper isAddPanelHidden={isAddPanelHidden}>
                        <StyledCaption> { isExercisesExist() ? `Lista ćwiczeń (${getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</StyledCaption>
                        <StyledExerciseList>
                            {renderExercise()}
                        </StyledExerciseList>
                    </StyledWrapper> : null}
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