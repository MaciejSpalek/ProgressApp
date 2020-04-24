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
`

class exercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            trainingDays: []
        }
    }
    handleArrowButton() {
        this.setState( prevState => ({
            isHidden: !prevState.isHidden
        }), ()=> {
            if(this.state.isHidden) {
                this.setState({
                    trainingDays: []
                })
            } else {
                app.getTrainingDays(this.props.exerciseKey, (tempArray)=> {
                    this.setState({
                        trainingDays: tempArray
                    })
                })
            }
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
            currentTraining,
            amountOfSeries,
            currentSeries, 
            exerciseKey, 
            priority,
            planKey, 
            name, 
            type, 
        } = this.props;

        const { 
            trainingDays, 
            isHidden, 
        } = this.state;
        
        return (
            <Container isHidden={isHidden}>
                <TogglePanel 
                    flexStyles={!isHidden ? modifyToggleStyles: toggleStyles}
                    handleFunction={()=> this.handleArrowButton()} 
                    buttonBackgroundColor={variables.$grayBlue}
                    iconName={this.setExerciseIcon(type)} 
                    iconColor={variables.$grayBlue}
                    textFontWeight={"bold"}
                    textFontSize={"1.1em"}
                    buttonColor={"white"}
                    isHidden={isHidden}
                    iconFontSize={25}
                    text={name}  
                />
                {!isHidden ?    <Content 
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
