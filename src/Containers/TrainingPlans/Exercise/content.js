import React, { Component } from 'react'
import styled from 'styled-components'
import helpers from '../../../Components/helpers';
import app from '../../../base';
import PlusButton from '../../../Components/plusButton';
import ChartButton from './chartButton';
import Input from '../../../Components/input';
import Paragraph from '../../../Components/paragraph';
import TrainingDay from './trainingDay';
import Chart from './chart';
import Timer from './timer';
import { variables, flexCenter, FlexComponent } from '../../../Components/styleHelpers'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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
    border-bottom-right-radius: .3em;
    border-bottom-left-radius: .3em;
    width: calc(100% - .5em);
    background-color: white;
    flex-direction: column;
`

const StyledHeaderWrapper = styled(FlexComponent)`
    border-bottom: .1em solid ${variables.$lightGray};
    justify-content: space-between;
    padding: .5em 0;
    width: 100%;
`
const Form = styled.form`
    justify-content: space-between;
    background-color: white;
    width: calc(100%);
    padding: .5em 0 2em;
    ${flexCenter};
`






class Content extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isChartButtonHidden: true,
            time: 0
        }
        this.timerInterval = null;
    }

    // returns array with days' numbers [1,2,3,4,5 ...], which use to chart.js as values on X axis
    getTrainingDaysArray() {
        const { trainingDays, amountOfSeries } = this.props
        const trainingDaysArray = helpers.getTrainingDays(trainingDays);
        const filteredArray = trainingDaysArray.filter(day => day.length === +amountOfSeries).map((el, index)=> index+1);
        return filteredArray;
    }
    // returns array with training volumes [1000, 1200, 1800, 1340 ...], which use to chart.js as values on Y axis
    getTrainingVolumesArray() {
        const { trainingDays, amountOfSeries, type } = this.props;
        const trainingDaysArray = helpers.getTrainingDays(trainingDays)
        const filteredArray = trainingDaysArray.map(day => day.length === +amountOfSeries ? helpers.getTreningVolume(day, type) : null)
        return filteredArray;
    }
    startTimer() {
        this.timerInterval = setInterval(()=> {
            this.setState(prevState => ({
                time: prevState.time + 1
            }))
        }, 1000)
    }
    stopTimer(e){  
        clearInterval(this.timerInterval)
        this.addSeries(e)
        this.setState({time: 0})
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
    areInputsEmpty(type, weight, reps) {
        if(type === "repsWithWeight") {
            return !helpers.isInputEmpty(weight) && !helpers.isInputEmpty(reps)
        } else if(type === "repsWithoutWeight") {
            return !helpers.isInputEmpty(reps)
        } else {
            return true;
        }
    }

    getSeriesData(type, weight, reps, currentSeries, exerciseKey) {
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
                time: this.state.time   
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
        
            let weight = null;
            let reps = null;

            if(type !== "time") {
                weight = e.target.elements.weight;
                reps = e.target.elements.reps;
            }


        if(this.areInputsEmpty(type, weight, reps)) {
            const currentTrainingRef = app.getRealTimeDatabase().ref(`training-days`).child(currentTraining);
            const seriesKey = currentTrainingRef.push().key;
            const updates = {};
            const seriesData = this.getSeriesData(type, weight, reps, currentSeries, exerciseKey);
    
            this.updateExerciseCounters();
            updates[`training-days/${currentTraining}${exerciseKey}/${seriesKey}`] = seriesData;
            return app.getRealTimeDatabase().ref().update(updates);
        }
    }
    renderTrainingDays() {
        const { trainingDays, amountOfSeries, type } = this.props;
        return trainingDays.map((day, index) => {
            return (
                <TrainingDay 
                    id={index}
                    key={index}
                    type={type}
                    trainingDay={day}
                    trainingDays={trainingDays}
                    amountOfSeries={amountOfSeries}
                />
            )
        })
    }
    handleChartButton() {
        this.setState(prevState => ({
            isChartButtonHidden: !prevState.isChartButtonHidden
        }))
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
                        handleFunction={()=> {}}
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
                        handleFunction={()=> {}}
                    />
                    <PlusButton 
                        onClickFunction={()=> {}}
                        iconColor={variables.$grayBlue}
                        styles={{
                            marginLeft: ".5em"
                        }}
                    />
                </> 
                :
                <>
                    <Input 
                        name={"reps"}  
                        type={"number"}
                        style={modifyInputStyles}
                        placeholder={"powtórzenia"}
                        handleFunction={()=> {}}
                    />                
                     <PlusButton 
                        onClickFunction={()=> {}}
                        iconColor={variables.$grayBlue}
                        styles={{
                            marginLeft: ".5em"
                        }}
                     />
                </>} 
            </Form>
        )
    }
    renderChart() {
        return (
                <Chart 
                    trainingDays={this.getTrainingDaysArray()}
                    trainingVolumes={this.getTrainingVolumesArray()}
                /> 
            )
        
    }
    render() {
        const { isChartButtonHidden, time } = this.state;
        const { type } = this.props;
        return (
            <StyledFormWrapper>
                <StyledHeaderWrapper>
                    <Paragraph
                        color={variables.$gray}
                        text={"Nowa seria"}
                        fontSize={"1.3em"}
                        padding={".3em 0"}
                    />
                    <ChartButton handleFunction={()=> this.handleChartButton()}/>
                </StyledHeaderWrapper>
                {type !== "time" ? this.renderForm() : 
                <Timer 
                    time={time} 
                    startTimer={()=> this.startTimer()}
                    stopTimer={(e)=> this.stopTimer(e)}
                />}
                {!isChartButtonHidden ? this.renderChart() : null}
                {this.renderTrainingDays()}
            </StyledFormWrapper>
        )
    }
}

export default Content
