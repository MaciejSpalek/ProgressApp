import React, { Component } from 'react';
import styled from 'styled-components';
import Exercise from './exercise';
import app from '../../Components/base';
import helpers from '../../Components/helpers';
import TogglePanel from '../../Components/togglePanel';
import { 
    variables, 
    flexCenter, 
    FlexWrapper,
    Paragraph
} from '../../Components/styleHelpers';


const toggleFlexStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white"
}

const Container = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    border: .05em solid ${variables.$lightGray};
`

const PlanContent = styled.div`
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 70vh;
    overflow: scroll;
`


const Form = styled.form`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
    padding: .5em;
`
const Input = styled.input`
    width: 100%;
    border: none;
    font-size: 1.2em;
    color: ${variables.$gray};
    margin: .5em 0;
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

const Caption = styled.h2`
    font-size: 1.5em;
    color: ${variables.$gray};
    padding: .5em;
`




// select menu

const Select = styled.select`
    width: 100%;
    border: none;
    font-size: 1.2em;
    margin: .5em 0;
    padding: .5em;
    color: ${variables.$gray};
`

const Option = styled.option`
    height: 35px;
`

class Plan extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isHidden: true,
            exercises: [],
            radio: "reps"
        }
    }

    // life cycle methods
    componentDidMount() {
        this._isMounted = true;
        this.assignExercisesToState();
    }
    componentWillUnmount() {
        this._isMounted = false;
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
            const tempArray = [];
            const plans = snapshot.val()
            for(let planID in plans) {
                const properties = plans[planID];
                for(let prop in properties) {
                    const exercise = properties[prop];
                    if(typeof properties[prop] === "object") {
                        tempArray.push(exercise);
                    }
                }
            }
            if(this._isMounted) {
                this.setState({
                    exercises: tempArray
                })
            }
        })
    }
    addExercise(e, planKey){
        e.preventDefault()
        const radioValue = this.state.radio;
        const { name } = e.target.elements;

        if(!helpers.isInputEmpty(name)) {
            const userID = app.getUserID();
            const currentPlanRef = app.getRealTimeDatabase().ref('users-plans').child(userID).child(planKey);
            const exerciseKey = currentPlanRef.push().key;
            const updates = {};
            const data = {
                planKey: this.props.planKey,
                exerciseKey: exerciseKey,
                name: helpers.capitalizeFirstLetter(name.value),
                type: radioValue
            }
            updates[`users-plans/${userID}/${planKey}/${exerciseKey}`] = data;
            helpers.clearInput(name);
            return app.getRealTimeDatabase().ref().update(updates);
        }
    }
    filterExercises(array) {
        return array.filter(item => item.planKey === this.props.planKey);
    }
    renderExercise() {
        const filteredArray = this.filterExercises(this.state.exercises);
        return filteredArray.map((exercise, index) => {
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
    isExercisesExist() {
        return this.state.exercises.length > 0;
    }
    getAmountOfExercises() {
        const filteredArray = this.filterExercises(this.state.exercises);
        return filteredArray.length;
    }
    changeHiddenState(planKey, isHidden) {
        app.getRealTimeDatabase()
            .ref("users-plans")
            .child(app.getUserID())
            .child(planKey)
            .update({isHidden: !isHidden})
    }
    handleFunctions(...parameters) {
        this.changeHiddenState(...parameters);
    }

    render() {
        const { date, planKey, id, isHidden } = this.props;
        const { radio } = this.state;

        const AddPanel =   <Form onSubmit={(e)=> this.addExercise(e, planKey)}>
                                <Paragraph>Uzupełnij podstawowe dane</Paragraph>
                                <Input  type="text" 
                                        name="name" 
                                        placeholder="nazwa ćwiczenia">
                                </Input>
                                <Input  type="number" 
                                        name="amountOfSeries"  
                                        min="1" 
                                        max="20" 
                                        placeholder="ilość serii">
                                </Input>
                                <Paragraph>Priorytet ćwiczenia</Paragraph>
                                <Select>
                                    <Option value="0">Niski</Option>
                                    <Option value="1">Średni</Option>
                                    <Option value="2">Wysoki</Option>
                                </Select>
                                <Paragraph>Jak chcesz mierzyć serie ?</Paragraph>
                                <FlexWrapper style={{ 
                                    padding: '.5em 0', 
                                    flexDirection: "column", 
                                    alignItems: "flex-start" }}>
                                    <Label>
                                        <Radio  type="radio" 
                                                name="radio" 
                                                value="reps" 
                                                checked={radio === "reps"} 
                                                onChange={(e) => this.handleRadioButton(e)}>
                                        </Radio> 
                                        na powótrzenia 
                                    </Label>
                                    <Label>
                                        <Radio  type="radio" 
                                                name="radio" 
                                                value="time" 
                                                checked={radio === "time"} 
                                                onChange={(e) => this.handleRadioButton(e)}>
                                        </Radio>
                                        na czas 
                                    </Label>
                                </FlexWrapper>
                                <Button>Dodaj</Button>
                            </Form>

        const planContent = <PlanContent style={ this.isExercisesExist() ? {"justifyContent": "space-between"} : {"justifyContent": "flex-end"}}>
                                <FlexWrapper style={{
                                    flexDirection: "column",
                                    justifyContent: "flex-start", 
                                    overflow: 'scroll'}}>
                                    <Caption> { this.isExercisesExist() ? `Lista ćwiczeń (${this.getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</Caption>
                                    {this.renderExercise()}
                                </FlexWrapper>
                                {AddPanel}
                            </PlanContent>
        
        return (
            <Container>
                <TogglePanel 
                    flexStyles={toggleFlexStyles}
                    text={`Plan ${id},  ${date}`}   
                    handleFunctions={()=> this.handleFunctions(planKey, isHidden)} 
                    buttonBackgroundColor={variables.$grayBlue}
                    arrowColor={"white"}
                    isHidden={isHidden}
                />
                {!isHidden ? planContent : null}
            </Container>
        )
    }
}

export default Plan;