import React, { Component } from 'react';
import styled from 'styled-components';
import Table from './Table/table'
import app from '../../base';
import TogglePanel from '../../Components/togglePanel';
import Form from './form';
import helpers from '../../Components/helpers';
import { variables, Container, FlexComponent } from '../../Components/styleHelpers';
import { faRuler } from '@fortawesome/free-solid-svg-icons'
import Placeholder from './placeholder';

const StyledContainer = styled(Container)`
    flex-direction: column; 
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: scroll;
`

const StyledToggleWrapper = styled(FlexComponent)`
    flex-direction: column;
    justify-content: space-between;
    height: ${props => props.state ? "100%" : "auto"};
    padding: 0;
`

const StyledTablesWrapper = styled(FlexComponent) `
    flex-direction: column;
    justify-content: flex-start;
    height: 100%;
    padding: .5em;
    overflow-y: scroll;
`


class Measurements extends Component {
    _isMounted = true;
    constructor(props) {
        super(props)
        this.state = {
            isPanelFormActive: false,
            measurementTables: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.assignMeasurementsToState()
    }

    componentDidUpdate() {
        this._isMounted = true;
        this.updateMeasurements()
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    updateMeasurements() {
        const userID = app.getUserID();
        const measurementsRef = app.getRealTimeDatabase().ref('users-measurements').child(userID)
        measurementsRef.on('child_changed', snapshot => {
            const usersMeasurements = helpers.snapshotToArray(snapshot);
            if (this._isMounted) {
                this.setState({
                    measurementTables: usersMeasurements
                })
            }
        })
    }

    assignMeasurementsToState() {
        const userID = app.getUserID();
        const measurementsRef = app.getRealTimeDatabase().ref('users-measurements').child(userID);
        measurementsRef.on("value", snapshot => {
            const usersMeasurements = helpers.snapshotToArray(snapshot);
            if (this._isMounted) {
                this.setState({
                    measurementTables: usersMeasurements
                })
            }
        })
    }

    addMeasurements(e) {
        e.preventDefault();
        const userID = app.getUserID();
        const measurementsRef = app.getRealTimeDatabase().ref('users-measurements').child(userID);
        const measurementsKey = measurementsRef.push().key;
        const updates = {};
        const { 
            neck, 
            chest, 
            biceps, 
            waist, 
            forearm, 
            thigh, 
            calf 
        } = e.target.elements;

        const inputParameters = {
            measurementsKey: measurementsKey,
            date: helpers.getCurrentDate(new Date(), "."),
            neck: neck.value,
            chest: chest.value,
            biceps: biceps.value,
            waist: waist.value,
            forearm: forearm.value,
            thigh: thigh.value,
            calf: calf.value
        }

        updates[`users-measurements/${userID}/${measurementsKey}`] = inputParameters;
        return app.getRealTimeDatabase().ref().update(updates);
    }
   
    
    renderTables = () => {
        const { measurementTables } = this.state;
        // const sortedArray = helpers.sortByDate(measurementTables);
        return sortedArray.map((parameter, index) =>{
            return  (
                <Table 
                    parameters={parameter}
                    key={index}
                /> 
            )
        })
    }
    
    handleTogglePanel() {
        this.setState(prevState => ({
            isPanelFormActive: !prevState.isPanelFormActive
        }))
    }

    render() {
        const { 
            isPanelFormActive,
            measurementTables
        } = this.state;
        return (
            <StyledContainer>
                <StyledToggleWrapper state={isPanelFormActive}>
                    <TogglePanel 
                        handleFunction={()=> this.handleTogglePanel()} 
                        buttonBackgroundColor={variables.$grayBlue}
                        iconName={faRuler} 
                        iconColor={variables.$grayBlue}
                        textFontWeight={"bold"}
                        textFontSize={"1.2em"}
                        isHidden={isPanelFormActive}
                        iconFontSize={25}
                        text={"Dodaj wymiary"}  
                    />
                    { isPanelFormActive ? <Form handleFunction={(e)=> this.addMeasurements(e)} /> :null }
                </StyledToggleWrapper>
                {!isPanelFormActive ? 
                    <StyledTablesWrapper>
                        { measurementTables.length ? 
                            this.renderTables() : 
                            <Placeholder 
                                iconName={faRuler} 
                                text={"brak dodanych wymiarów"}
                            /> 
                        }
                    </StyledTablesWrapper> 
                : null}
            </StyledContainer>
        );
    }
}

export default Measurements;