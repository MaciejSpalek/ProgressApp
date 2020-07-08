import React, { Component } from 'react';
import styled from 'styled-components';
import Table from './Table/table'
import app from '../../base';
import TogglePanel from '../../Components/togglePanel';
import Form from './form';
import helpers from '../../Components/helpers';
import { variables, Container, FlexComponent, flexCenter, RWD } from '../../Components/styleHelpers';
import { faRuler } from '@fortawesome/free-solid-svg-icons'
import Placeholder from './placeholder';

const StyledContainer = styled(Container)`
    flex-direction: column; 
    @media only screen and (min-width: 768px) {
        flex-direction: row;
    }
`

const StyledInnerWrapper = styled(FlexComponent)`
    flex-direction: column;
    justify-content: flex-start; 
    height: 100%;
    padding: 0;

    &:nth-of-type(1) {
        flex: 3;
    }
    &:nth-of-type(2) {
        max-width: 350px;
    }
`

const StyledToggleWrapper = styled(FlexComponent)`
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    height: 100%;
    @media only screen and (max-width: 768px) {
        height: ${props => props.state ? "100%" : "auto"};
    }
`

const StyledTablesWrapper = styled(FlexComponent) `
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    padding: .5em;
    flex-wrap: wrap;
    overflow-y: auto;

`


class Measurements extends Component {
    _isMounted = true;
    constructor(props) {
        super(props)
        this.state = {
            isPanelFormActive: false,
            measurementTables: [],
            windowWidth: 0
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.assignMeasurementsToState()
        this.handleResize()
        window.addEventListener('resize', ()=> this.handleResize());
    }

    componentDidUpdate() {
        this._isMounted = true;
        this.updateMeasurements()
    }

    componentWillUnmount() {
        this._isMounted = false;
        window.removeEventListener('resize', ()=> this.handleResize());
    }

    handleResize() {
        this.setState({windowWidth: window.innerWidth});
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
            id: this.state.measurementTables.length+1,
            date: helpers.getCurrentDate(new Date(), "."),
            neck: neck.value,
            chest: chest.value,
            biceps: biceps.value,
            waist: waist.value,
            forearm: forearm.value,
            thigh: thigh.value,
            calf: calf.value
        }
        this.handleTogglePanel();
        updates[`users-measurements/${userID}/${measurementsKey}`] = inputParameters;
        return app.getRealTimeDatabase().ref().update(updates);
    }
   
    
    renderTables = () => {
        const { measurementTables } = this.state;
        const sortedArrayById = measurementTables.sort((a, b) => b.id - a.id);
        return sortedArrayById.map((parameter, index) =>{
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


    getMeasurementsView() {
        const { 
            isPanelFormActive,
            measurementTables,
            windowWidth
        } = this.state;
        if(windowWidth > 768) {
            return (
                <StyledContainer>
                    <StyledInnerWrapper>
                        <StyledTablesWrapper>
                            { measurementTables.length ? 
                                this.renderTables() : 
                                <Placeholder 
                                    iconName={faRuler} 
                                    text={"brak dodanych wymiarów"}
                                /> 
                            }
                        </StyledTablesWrapper> 
                    </StyledInnerWrapper>
                    <StyledInnerWrapper>
                        <StyledToggleWrapper state={isPanelFormActive}>
                            <TogglePanel 
                                handleFunction={()=> this.handleTogglePanel()} 
                                buttonBackgroundColor={variables.$grayBlue}
                                iconName={faRuler} 
                                iconColor={variables.$grayBlue}
                                textFontWeight={"bold"}
                                textFontSize={"1.2em"}
                                isHidden={!isPanelFormActive}
                                iconFontSize={25}
                                text={"Dodaj wymiary"}  
                                isArrowButtonHidden={true}
                            />
                            <Form handleFunction={(e)=> this.addMeasurements(e)} />
                        </StyledToggleWrapper>
                    </StyledInnerWrapper>
                </StyledContainer>
            )
        } else  {
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
                            isHidden={!isPanelFormActive}
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
            )
        }
    }

    render() {
        return (
            this.getMeasurementsView()
        );
    }
}

export default Measurements;