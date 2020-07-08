import React from 'react';
import styled from 'styled-components'
import Input from '../../../Components/input'
import Button from '../../../Components/Button'
import RadioLabel from '../../../Components/RadioLabel'
import TogglePanel from '../../../Components/togglePanel';

import { 
    variables, 
    flexCenter, 
    FlexWrapper,
    Paragraph,
    FlexComponent
} from '../../../Components/styleHelpers';
import { faRunning } from '@fortawesome/free-solid-svg-icons';

const toggleFlexStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white"
}

const StyledAddPanel = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`
const StyledRadioWrapper = styled(FlexWrapper)`
    padding: .5em 0;
    flex-direction: column;
    align-items: flex-start;
`
const Form = styled.form`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
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

const AddPanel = ({ planKey, addExercise, handleRadioButton, handleAddPanel, isAddPanelHidden, radio }) => {
    return (
        <StyledAddPanel>
            {!isAddPanelHidden ?
            <Form onSubmit={(e)=> addExercise(e, planKey)}>
                <Input  
                    isRequired={true}
                    type="text" 
                    name="name" 
                    placeholder="nazwa ćwiczenia" 
                    handleFunction={()=> {}}
                    style={{margin: ".5em 0"}}
                />

                <Input  
                    isRequired={true}
                    type={"number"} 
                    name={"amountOfSeries"}  
                    min={1}
                    max={20} 
                    placeholder="ilość serii" 
                    handleFunction={()=> {}}
                    style={{margin: ".5em 0"}}
                />
            
                <Paragraph>Priorytet ćwiczenia</Paragraph>
                <Select name="priority">
                    <Option value="0">Niski</Option>
                    <Option value="1">Średni</Option>
                    <Option value="2">Wysoki</Option>
                </Select>

                <Paragraph>Jak chcesz mierzyć serie ?</Paragraph>
                <StyledRadioWrapper>
                    <RadioLabel  
                        value={"repsWithoutWeight"} 
                        isChecked={radio === "repsWithoutWeight"} 
                        handleFunction={(e) => handleRadioButton(e)}
                        text={"na powt. bez ciężaru"}
                    />
                    <RadioLabel 
                        value={"repsWithWeight"} 
                        checked={radio === "repsWithWeight"} 
                        handleFunction={(e) => handleRadioButton(e)}
                        text={"na powt. z ciężarem"}
                    />
                    <RadioLabel 
                        value={"time"} 
                        isChecked={radio === "time"} 
                        handleFunction={(e) => handleRadioButton(e)}
                        text={"na czas"}
                    />
                </StyledRadioWrapper>
                <Button 
                    text={"Dodaj"} 
                    handleClick={()=> {}}   
                />
            </Form> : null}
            <TogglePanel 
                handleFunction={()=> handleAddPanel()} 
                buttonBackgroundColor={variables.$grayBlue}
                iconColor={variables.$grayBlue}
                iconName={faRunning} 
                iconFontSize={25}
                text={`Nowe ćwiczenie`}   
                textFontWeight={"bold"}
                textFontSize={"1.3em"}
                flexStyles={toggleFlexStyles}
                isHidden={isAddPanelHidden}
            />
        </StyledAddPanel>
    )
}

export default AddPanel;