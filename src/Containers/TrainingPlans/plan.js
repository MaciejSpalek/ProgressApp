import React, { Component } from 'react';
import styled from 'styled-components';
import { variables, flexCenter, SpaceBetweenWrapper, FlexWrapper } from '../../Components/styleHelpers';
import ArrowButton from '../../Components/arrowButton';
import Exercise from './exercise';
import app from '../../Components/base';

const Container = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    border: .05em solid ${variables.$lightGray};
`
const Date = styled.p`
    color: ${variables.$gray};
    font-size: 1.5em;
    font-weight: bold;
`


const PlanContent = styled.div`
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    min-height: 70vh;
`



const AddExerciseForm = styled.form`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
`
const Input = styled.input`
    width: 100%;
    border: none;
    font-size: 1.2em;
    padding: .5em; 
`
const Button = styled.button`
    width: 100%;
    background-color: ${variables.$grayBlue};
    color: white;
    font-weight: bold;
    font-size: 1.2em;
    padding: .5em; 
    border: none;
`
const Label = styled.label`
    font-size: 1.2em;
    padding: .25em .5em;
`
const Radio = styled.input`
    width: 1.2em;
    height: 1.2em;
`

class Plan extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            exercises: [],
            radio: "reps"
        }
    }

    componentDidMount() {
        // this.assignExercisesToState();
    }

    handleArrowButton() {
        this.setState( prevState => ({
            isHidden: !prevState.isHidden
        }))
    }

    handleRadioButton(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }



    assignExercisesToState() {
        const userID = app.getUserID();
        const usersPlansRef = app.getRealTimeDatabase().ref('users-plans').child(userID);
        usersPlansRef.on("value", snapshot => {
            // const plans = helpers.snapshotToArray(snapshot);
            // if (this._isMounted) {
            //     this.setState({plans})
            // }
        })
    }


    addExercise(e, planKey){
        e.preventDefault()
        const radioValue = this.state.radio;
        const { name } = e.target.elements;
        
        const userID = app.getUserID();
        const currentPlanRef = app.getRealTimeDatabase().ref('users-plans').child(userID).child(planKey);
        const exerciseKey = currentPlanRef.push().key;
        const updates = {};
        const data = {
            exerciseKey: exerciseKey,
            name: name.value,
            type: radioValue
        }

        updates[`users-plans/${userID}/${planKey}/${exerciseKey}`] = data;
        return app.getRealTimeDatabase().ref().update(updates);
    }

    
  
    renderExercise() {
        return this.state.exercises.map((exercise, index) => {
            return (
                <Exercise
                    key={index}
                    exerciseKey={exercise.exerciseKey}
                    name={exercise.name}
                    type={exercise.type}
                />
            )
        })
    }

    render() {
        const { date, planKey } = this.props;
        const { isHidden, exercises, radio } = this.state;

        const AddingBox =   <AddExerciseForm onSubmit={(e)=> this.addExercise(e, planKey)}>
                                <Input type="text" name="name" placeholder="Nazwa ćwiczenia"></Input>
                                <FlexWrapper style={{ padding: '.5em 0' }}>
                                    <Label><Radio type="radio" name="radio" value="reps" checked={radio === "reps"} onChange={(e) => this.handleRadioButton(e)}></Radio> na powótrzenia </Label>
                                    <Label><Radio type="radio" name="radio" value="time" checked={radio === "time"} onChange={(e) => this.handleRadioButton(e)}></Radio> na czas </Label>
                                </FlexWrapper>
                                <Button>Dodaj</Button>
                            </AddExerciseForm>

        const planContent = <PlanContent style={ exercises.length ? {"justifyContent": "space-between"} : {"justifyContent": "flex-end"}}>
                                {this.renderExercise()}
                                {AddingBox}
                            </PlanContent>
        
        return (
            <Container>
                <SpaceBetweenWrapper style={{backgroundColor: "white"}}>
                    <Date> {date} </Date>
                    <ArrowButton
                        isHide={isHidden}
                        handleArrowButton={()=> this.handleArrowButton()}
                    />
                </SpaceBetweenWrapper>
                {!isHidden ? planContent : null}
            </Container>
        )
    }
}

export default Plan;