import React, { Component } from 'react';
import styled from 'styled-components';
import Exercise from '../Exercise/exercise';
import app from '../../../base';
import helpers from '../../../Components/helpers';
import TogglePanel from '../../../Components/togglePanel';
import { 
    variables, 
    flexCenter
} from '../../../Components/styleHelpers';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import PlanContent from './planContent';


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


class Plan extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isAddPanelHidden: false,
            radio: "repsWithWeight",
            isHidden: true,
            exercises: []
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
        const { name, amountOfSeries, priority } = e.target.elements;

        if(!helpers.isInputEmpty(name)) {
            const userID = app.getUserID();
            const currentPlanRef = app.getRealTimeDatabase().ref('users-plans').child(userID).child(planKey);
            const exerciseKey = currentPlanRef.push().key;
            const updates = {};
            const exerciseData = {
                name: helpers.capitalizeFirstLetter(name.value),
                amountOfSeries: amountOfSeries.value,
                priority: priority.value,
                type: radio,

                planKey: this.props.planKey,
                exerciseKey: exerciseKey,
                
                currentTraining: 1,
                currentSeries: 1
            }
            updates[`users-plans/${userID}/${planKey}/${exerciseKey}`] = exerciseData;
            helpers.clearInput(name);
            helpers.clearInput(amountOfSeries);
            return app.getRealTimeDatabase().ref().update(updates);
        }
    }
    filterExercisesByPlanKey(array) {
        return array.filter(item => item.planKey === this.props.planKey);
    }
    renderExercise() {
        const filteredArray = this.filterExercisesByPlanKey(this.state.exercises);
        return filteredArray.map((exercise, index) => {
            return (
                <Exercise
                    currentTraining={exercise.currentTraining}
                    amountOfSeries={exercise.amountOfSeries}
                    currentSeries={exercise.currentSeries}
                    exerciseKey={exercise.exerciseKey}
                    priority={exercise.priority}
                    planKey={exercise.planKey}
                    type={exercise.type}
                    name={exercise.name}
                    key={index}                    
                />
            )
        })
    }
    isExercisesExist() {
        return this.state.exercises.length > 0;
    }
    getAmountOfExercises() {
        const filteredArray = this.filterExercisesByPlanKey(this.state.exercises);
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

        return (
            <Container isHidden={isHidden}>
                <TogglePanel 
                    handleFunction={()=> this.changeHiddenState(planKey, isHidden)} 
                    buttonBackgroundColor={variables.$grayBlue}
                    iconColor={variables.$grayBlue}
                    iconName={faTasks} 
                    iconFontSize={30}
                    text={`Plan ${id},  ${date}`} 
                    textFontWeight={"bold"}
                    textFontSize={"1.3em"}
                    flexStyles={toggleFlexStyles}
                    isHidden={isHidden}
                />
                {!isHidden ? 
                <PlanContent 
                    getAmountOfExercises={()=> this.getAmountOfExercises()}
                    handleRadioButton={(e)=> this.handleRadioButton(e)}
                    isAddPanelHidden={isAddPanelHidden}
                    isExercisesExist={()=> this.isExercisesExist()}
                    handleAddPanel={()=> this.handleAddPanel()}
                    renderExercise={()=> this.renderExercise()}
                    addExercise={(e)=> this.addExercise(e, planKey)}
                    planKey={planKey}
                    radio={radio}
                />
                : null}
            </Container>
        )
    }
}

export default Plan;