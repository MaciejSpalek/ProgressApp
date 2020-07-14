import React, { Component } from 'react';
import styled from 'styled-components';
import TogglePanel from '../../../Components/togglePanel';
import Content from './content';
import app from '../../../base';
import { variables, flexCenter } from '../../../Components/styleHelpers';
import { faHourglassStart, faDumbbell, faEllipsisV } from '@fortawesome/free-solid-svg-icons';


const toggleStyles = {
    "justifyContent": "space-between",
    "borderBottomRightRadius": ".3em",
    "borderBottomLeftRadius": ".3em",
    "width": "calc(100% - .5em)",
    "backgroundColor": "white",
    "margin": ".25em .25em 0",
    "borderRadius": ".3em"
}

const modifyToggleStyles = {
    "backgroundColor": `${variables.$gray}`,
    "justifyContent": "space-between",
    "borderBottomRightRadius": "0",
    "borderBottomLeftRadius": "0",
    "width": "calc(100% - .5em)",
    "margin": ".25em .25em 0",
    "borderRadius": ".3em",
    "borderBottom": "none"
}

const Container = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;

    @media only screen and (min-width: 768px) {
        width: ${props => props.isOpened ? "100%" : "400px"};
    }
`

class exercise extends Component {
    changeExerciseOpenState() {
        const {exerciseObject: {
            exerciseKey, 
            planKey,
            isOpened
        }} = this.props;

        app.getRealTimeDatabase()
            .ref("users-plans")
            .child(app.getUserID())
            .child(planKey)
            .child(exerciseKey)
            .update({
                isOpened: !isOpened
            })
    }
    
    setExerciseIcon(radioValue) {
        if(radioValue === "repsWithWeight") {
            return faDumbbell;
        } else if(radioValue === "repsWithoutWeight") {
            return faEllipsisV;
        } else {
            return faHourglassStart;
        }
    }

    render() {
        const {
            trainingDays,
                exerciseObject: {
                    currentTraining,
                    amountOfSeries,
                    currentSeries, 
                    exerciseKey, 
                    priority,
                    isOpened,
                    planKey, 
                    name, 
                    type
                }
            } = this.props;

        return (
            <Container isOpened={isOpened}>
                <TogglePanel 
                    flexStyles={isOpened ? modifyToggleStyles: toggleStyles}
                    handleFunction={()=> this.changeExerciseOpenState()} 
                    buttonBackgroundColor={variables.$grayBlue}
                    iconName={this.setExerciseIcon(type)} 
                    iconColor={variables.$grayBlue}
                    textFontWeight={"bold"}
                    textFontSize={"1.1em"}
                    buttonColor={"white"}
                    isHidden={!isOpened}
                    iconFontSize={25}
                    text={name}  
                />
                {isOpened ?    
                    <Content 
                        currentTraining={currentTraining}
                        amountOfSeries={amountOfSeries}
                        currentSeries={currentSeries}
                        trainingDays={trainingDays}
                        exerciseKey={exerciseKey}
                        priority={priority}
                        planKey={planKey}
                        type={type} 
                    /> : null}
            </Container>
        )
    }
}

export default exercise
