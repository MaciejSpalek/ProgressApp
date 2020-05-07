import React, { Component } from 'react';
import styled from 'styled-components';
import Table from './Table/table'
import Input from '../../Components/input';
import Button from '../../Components/Button';
import TogglePanel from '../../Components/togglePanel';
import helpers from '../../Components/helpers';
import { variables, Container, FlexComponent } from '../../Components/styleHelpers';
import { faRuler } from '@fortawesome/free-solid-svg-icons'

const StyledContainer = styled(Container)`
    flex-direction: column; 
    align-items: flex-start;
    justify-content: flex-start;
    overflow-y: scroll;
`

const StyledToggleWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`

const StyledTablesWrapper = styled(FlexComponent) `
    flex-direction: column;
    padding: .5em;
`
const Form = styled.form`
    width: 100%;
    padding: .5em;
`

class Measurements extends Component {
    _isMounted = true;
    constructor(props) {
        super(props)
        this.state = {
            isPanelFormActive: true,
            measurementTables: []
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setMeasurements()
    }

    componentDidUpdate() {
        this._isMounted = false;
    }

    setMeasurements() {

    }

    updateMeasurementTables(e) {
        e.preventDefault();
        const { measurementTables } = this.state;
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
            data: helpers.getDate(),
            neck: neck.value,
            chest: chest.value,
            biceps: biceps.value,
            waist: waist.value,
            forearm: forearm.value,
            thigh: thigh.value,
            calf: calf.value
        }
        this.setState({
            measurementTables: [inputParameters, ...measurementTables]
        }, ()=> {
            this.setMeasurements()
        })
    }
   
    
    renderTables = () => {
        const { measurementTables } = this.state;
        return measurementTables.map((parameter, index) =>{
            return  (
                <Table 
                    date={helpers.getDate()}
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
            isPanelFormActive
        } = this.state;
        return (
            <StyledContainer>
                <StyledToggleWrapper>
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
                    { isPanelFormActive ? 
                    <Form onSubmit={(e)=> this.updateMeasurementTables(e)}>
                        <Input style={{margin: ".5em 0"}} name={"neck"}  placeholder="kark" handleFunction={()=> {}}/>
                        <Input style={{margin: ".5em 0"}} name={"chest"}  placeholder="klatka piersiowa" handleFunction={()=> {}}/>
                        <Input style={{margin: ".5em 0"}} name={"biceps"}  placeholder="biceps" handleFunction={()=> {}}/>
                        <Input style={{margin: ".5em 0"}} name={"forearm"}  placeholder="przedramię" handleFunction={()=> {}}/>
                        <Input style={{margin: ".5em 0"}} name={"waist"}  placeholder="talia" handleFunction={()=> {}}/>
                        <Input style={{margin: ".5em 0"}} name={"thigh"}  placeholder="udo" handleFunction={()=> {}}/>
                        <Input style={{margin: ".5em 0"}} name={"calf"}  placeholder="łydka" handleFunction={()=> {}}/>
                        <Button text={"Dodaj"} handleClick={()=> {}} />
                    </Form> :null }
                </StyledToggleWrapper>
                <StyledTablesWrapper>
                    {this.renderTables()}
                </StyledTablesWrapper>
            </StyledContainer>
        );
    }
}

export default Measurements;