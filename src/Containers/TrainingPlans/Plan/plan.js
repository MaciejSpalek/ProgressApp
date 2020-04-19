import React, { Component } from 'react';
import styled from 'styled-components';
import Exercise from '../Exercise/exercise';
import app from '../../../base';
import helpers from '../../../Components/helpers';
import TogglePanel from '../../../Components/togglePanel';
import { 
    variables, 
    flexCenter, 
    FlexWrapper,
    Paragraph,
    FlexComponent
} from '../../../Components/styleHelpers';
import { faTasks, faRunning } from '@fortawesome/free-solid-svg-icons';


const toggleFlexStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white"
}

const Container = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 100%;
    border: .1em solid ${variables.$lightGray};
    height: ${props => props.isHidden ? "auto" : "100%"};
`

const StyledPlanList = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-start;
    overflow: scroll;
    padding: 0;
`
const StyledAddPanel = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`

const PlanContent = styled.div`
    ${flexCenter};
    flex-direction: column;
    justify-content: ${props => props.isHidden ? "space-between" : "flex-end"};
    width: 100%;
    height: 100%;
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
    border-radius: .3em;
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
            isAddPanelHidden: false,
            exercises: [],
            radio: "repsWithWeight"
        }
    }

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
    handleAddPanel() {
        this.setState(prevState =>({
            isAddPanelHidden: !prevState.isAddPanelHidden
        }))
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
        const { radio } = this.state;
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
                type: radio,
                currentTraining: 1,
                currentSeries: 1
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
                    planKey={exercise.planKey}
                    currentSeries={exercise.currentSeries}
                    currentTraining={exercise.currentTraining}
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
  

    render() {
        const { date, planKey, id, isHidden } = this.props;
        const { radio, isAddPanelHidden } = this.state;
        const AddPanel =    <StyledAddPanel>
                                {!isAddPanelHidden ?
                                <Form onSubmit={(e)=> this.addExercise(e, planKey)}>
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
                                                    value="repsWithoutWeight" 
                                                    checked={radio === "repsWithoutWeight"} 
                                                    onChange={(e) => this.handleRadioButton(e)}>
                                            </Radio> 
                                            na powt. bez ciężaru 
                                        </Label>
                                        <Label>
                                            <Radio  type="radio" 
                                                    name="radio" 
                                                    value="repsWithWeight" 
                                                    checked={radio === "repsWithWeight"} 
                                                    onChange={(e) => this.handleRadioButton(e)}>
                                            </Radio>
                                            na powt. z ciężarem 
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
                                : null}
                                <TogglePanel 
                                    flexStyles={toggleFlexStyles}
                                    text={`Nowe ćwiczenie`}   
                                    isHidden={isAddPanelHidden}
                                    handleFunction={()=> this.handleAddPanel()} 
                                    buttonBackgroundColor={variables.$grayBlue}
                                    buttonColor={variables.$orange}
                                    iconName={faRunning} 
                                    iconColor={variables.$grayBlue}
                                    iconFontSize={25}
                                />
                            </StyledAddPanel>
        const planContent = <PlanContent isHidden={isAddPanelHidden}>
                                {isAddPanelHidden ?
                                    <StyledPlanList>
                                        <Caption> { this.isExercisesExist() ? `Lista ćwiczeń (${this.getAmountOfExercises()})` : "Brak dodanych ćwiczeń"}</Caption>
                                        {this.renderExercise()}
                                    </StyledPlanList> : null}
                                {AddPanel}
                            </PlanContent>

        console.log(this.state.exercises)
        return (
            <Container isHidden={isHidden}>
                <TogglePanel 
                    flexStyles={toggleFlexStyles}
                    text={`Plan ${id},  ${date}`}   
                    handleFunction={()=> this.changeHiddenState(planKey, isHidden)} 
                    buttonBackgroundColor={variables.$grayBlue}
                    buttonColor={variables.$orange}
                    isHidden={isHidden}
                    iconName={faTasks} 
                    iconColor={variables.$grayBlue}
                    iconFontSize={30}
                />
                {!isHidden ? planContent : null}
            </Container>
        )
    }
}

export default Plan;