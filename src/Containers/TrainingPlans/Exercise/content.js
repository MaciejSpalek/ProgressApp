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


const inputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "width": "80px",
    "height": "35px",
    "borderRadius": ".3em",
    "padding": ".5em"
}

const modifyInputStyles = {
    "border": `.1em solid ${variables.$lightGray}`,
    "width": "100%",
    "height": "35px",
    "borderRadius": ".3em",
    "padding": ".5em",
    "marginRight": ".5em"
}

const StyledFormWrapper = styled(FlexComponent)`
    flex-direction: column;
    background-color: white;
    width: calc(100% - .5em);
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
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
        const { planKey, 
                exerciseKey, 
                currentSeries, 
                currentTraining 
        } = this.props;

        let tempCurrentSeries = currentSeries;
        let tempCurrentTraining = currentTraining;

        if(tempCurrentSeries >=3) {
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

    addSeries(e){
        e.preventDefault()
         const { type,
                 exerciseKey, 
                 currentSeries, 
                 currentTraining 
        } = this.props;
        
        const { reps, time, weight } = e.target.elements;


        // if(!helpers.isInputEmpty()) {
            const currentTrainingRef = app.getRealTimeDatabase().ref(`training-days`).child(currentTraining);
            const seriesKey = currentTrainingRef.push().key;
            const updates = {};
            const seriesData = {
                id: currentSeries,
                exerciseKey: exerciseKey,  
                reps:  reps.value,
                weight: weight.value
            }
            this.updateExerciseCounters();
            updates[`training-days/${currentTraining}${exerciseKey}/${seriesKey}`] = seriesData;
            return app.getRealTimeDatabase().ref().update(updates);
        // }
    }

    renderTrainingDays() {
        return this.props.trainingDays.map((day, index) => {
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
                    <FontAwesomeIcon icon={faTimes} style={{fontSize: 20, color: variables.$gray}}/>
                    <Input 
                        name={"weight"}  
                        type={"number"}
                        style={inputStyles}
                        placeholder={"kg"}
                    />
                    <PlusButton />
                </> :
                <>
                    <Input 
                        name={"time"}  
                        type={"number"}
                        style={modifyInputStyles}
                        placeholder={type === "repsWithoutWeight" ? "powtórzenia" : "czas"}
                    />                
                    <FontAwesomeIcon icon={faPlusSquare} style={{fontSize: 40, color: variables.$grayBlue}}/>
                </>} 
            </Form>
        )
    }

    render() {
        return (
            <StyledFormWrapper>
                <Paragraph
                    text={"Dodaj serie!"}
                    fontSize={"1.3em"}
                    align={"flex-start"}
                    padding={".3em 0"}
                    color={variables.$gray}
                />
                {this.renderForm()}
                {this.renderTrainingDays()}
            </StyledFormWrapper>
        )
    }
}

export default Content
