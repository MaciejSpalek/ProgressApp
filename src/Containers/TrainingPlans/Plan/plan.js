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
            exercises: [],
            trainingDays: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.assignExercisesToState();
        this.getAllTrainingDays()
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


    getAllTrainingDays() {
        const trainingDaysRef = app.getRealTimeDatabase().ref("training-days");
        trainingDaysRef.on('value', snapshot => {
            const trainingDays = snapshot.val();
            const tempArray = [];
            for(let day in trainingDays) {
                tempArray.push(trainingDays[day])
            }
            this.setState({
                trainingDays: tempArray 
            })
        })
    }
    

    getCurrentTrainingDays(exerciseKey, amountOfSeries) {
        const { trainingDays } = this.state
        const tempArray = [];
        let tempObject = {};
        let seriesCounter = 0;

        trainingDays.forEach(item => {
            for(let series in item) {
                if(exerciseKey === item[series].exerciseKey) {
                    if(seriesCounter === 0) {
                        tempArray.push(tempObject);
                    }
                    seriesCounter++;
                    tempObject[series] = item[series];
                    console.log(tempArray)
                    if(seriesCounter >= amountOfSeries) {
                        tempObject = {};
                        seriesCounter = 0;
                    }
                }
            }
        })
        return tempArray;
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
                currentSeries: 1,
                isOpened: false
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

    filterExercisesByOpenedState(array) {
        return array.filter(item => item.isOpened === true);
    }

    renderExercise() {
        const firstFilteredArray = this.filterExercisesByPlanKey(this.state.exercises);
        const secondFilteredArray = this.filterExercisesByOpenedState(firstFilteredArray);
        let finalFilteredArray = [];

        if (firstFilteredArray.every(item => item.isOpened === false)) {
            finalFilteredArray = firstFilteredArray;
        } else {
            finalFilteredArray = secondFilteredArray;
        }

        return finalFilteredArray.map((exercise, index) => {
            return (
                <Exercise
                    exerciseObject={exercise}
                    trainingDays={this.getCurrentTrainingDays(exercise.exerciseKey, exercise.amountOfSeries)}
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