import React, { Component } from 'react'
import styled from 'styled-components'
import Input from '../../../Components/input';
import Paragraph from '../../../Components/paragraph';
import TrainingDay from './trainingDay';
import helpers from '../../../Components/helpers';
import app from '../../../base';
import { variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers'
import { faPlusSquare, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import PlusButton from '../../../Components/plusButton';
import ChartButton from './chartButton';


const inputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "borderRadius": ".3em",
    "padding": ".5em",
    "height": "35px",
    "width": "100%",
}

const modifyInputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "borderRadius": ".3em",
    "marginRight": ".5em",
    "padding": ".5em",
    "height": "35px",
    "width": "100%",
}

const StyledFormWrapper = styled(FlexComponent)`
    flex-direction: column;
    background-color: white;
    width: calc(100% - .5em);
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
`

const StyledHeaderWrapper = styled(FlexComponent)`
    justify-content: space-between;
    width: 100%;
    padding: .5em 0;
`
const Form = styled.form`
    ${flexCenter};
    justify-content: space-between;
    background-color: white;
    width: calc(100%);
    border-top: .1em solid ${variables.$lightGray};
    padding: .5em 0;
`






class Content extends Component {
    constructor(props) {
        super(props);
    }
    

    updateExerciseCounters() {
        const { 
            currentTraining,
            amountOfSeries, 
            currentSeries, 
            exerciseKey, 
            planKey, 
        } = this.props;

        let tempCurrentSeries = currentSeries;
        let tempCurrentTraining = currentTraining;

        if(tempCurrentSeries >= amountOfSeries) {
            tempCurrentSeries = 0;
            tempCurrentTraining++;
        }

        app.getRealTimeDatabase()
            .ref("users-plans")
            .child(app.getUserID())
            .child(planKey)
            .child(exerciseKey)
            .update({
                currentSeries: tempCurrentSeries + 1,
                currentTraining: tempCurrentTraining
            })
    }
    areInputsEmpty(type, weight, reps, time) {
        if(type === "repsWithWeight") {
            return !helpers.isInputEmpty(weight) && !helpers.isInputEmpty(reps)
        }
         
        else if(type === "repsWithoutWeight") {
            return !helpers.isInputEmpty(reps)
        } 
        
        else {
            return !helpers.isInputEmpty(time) 
        }
    }
    getSeriesData(type, weight, reps, time, currentSeries, exerciseKey) {
        
        if(type === "repsWithWeight") {
            return {
                id: currentSeries,
                exerciseKey: exerciseKey,  
                reps:  reps.value,
                weight: weight.value
            }
        } else if(type === "repsWithoutWeight") {
            return {
                id: currentSeries,
                exerciseKey: exerciseKey,  
                reps:  reps.value,
            }
        } else {
            return {
                id: currentSeries,
                exerciseKey: exerciseKey,  
                time:  time.value,   
            }
        }
    }
    addSeries(e){
        e.preventDefault()
         const { 
             currentTraining,
             currentSeries, 
             exerciseKey, 
             type,
        } = this.props;
        
        const { 
            weight, 
            reps, 
            time, 
        } = e.target.elements;


        if(this.areInputsEmpty(type, weight, reps, time)) {
            const currentTrainingRef = app.getRealTimeDatabase().ref(`training-days`).child(currentTraining);
            const seriesKey = currentTrainingRef.push().key;
            const updates = {};
            const seriesData = this.getSeriesData(type, weight, reps, time, currentSeries, exerciseKey);
            console.log(seriesData)
            this.updateExerciseCounters();
            updates[`training-days/${currentTraining}${exerciseKey}/${seriesKey}`] = seriesData;
            return app.getRealTimeDatabase().ref().update(updates);
        }
    }
    renderTrainingDays() {
        const array = this.props.trainingDays;
        return array.map((day, index) => {
            return (
                <TrainingDay 
                    id={index}
                    key={index}
                    day={day}
                />
            )
        })
    }
    renderForm() {
        const { type } = this.props;
        return (
            <Form onSubmit={(e)=> this.addSeries(e)}>
                {type === "repsWithWeight" ?
                <>
                    <Input 
                        name={"reps"}  
                        type={"number"}
                        style={inputStyles}
                        placeholder={"powt."}
                    />
                    <FontAwesomeIcon 
                        icon={faTimes} 
                        style={{
                            fontSize: 20, 
                            color: variables.$gray,
                            margin: "0 .5em"
                        }}
                    />
                    <Input 
                        name={"weight"}  
                        type={"number"}
                        style={inputStyles}
                        placeholder={"kg"}
                    />
                    <PlusButton styles={{
                        marginLeft: ".5em"
                    }}/>
                </> :
                <>
                    <Input 
                        name={type === "repsWithoutWeight" ? "reps" : "time"}  
                        type={"number"}
                        style={modifyInputStyles}
                        placeholder={type === "repsWithoutWeight" ? "powtórzenia" : "czas"}
                    />                
                    <FontAwesomeIcon 
                        icon={faPlusSquare} 
                        style={{
                            fontSize: 40, 
                            color: variables.$grayBlue
                        }}  
                    />
                </>} 
            </Form>
        )
    }
    render() {
        return (
            <StyledFormWrapper>
                <StyledHeaderWrapper>
                    <Paragraph
                        text={"Nowa seria"}
                        fontSize={"1.3em"}
                        padding={".3em 0"}
                        color={variables.$gray}
                    />
                    <ChartButton />
                </StyledHeaderWrapper>
                {this.renderForm()}
                {this.renderTrainingDays()}
            </StyledFormWrapper>
        )
    }
}

export default Content
