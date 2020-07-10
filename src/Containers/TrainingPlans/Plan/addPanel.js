import React from 'react';
import styled from 'styled-components'
import Input from '../../../Components/input'
import Button from '../../../Components/Button'
import RadioLabel from '../../../Components/RadioLabel'
import TogglePanel from '../../../Components/togglePanel';

import { 
    variables, 
    flexCenter, 
    Paragraph,
    FlexComponent,
    RWD
} from '../../../Components/styleHelpers';
import { faRunning } from '@fortawesome/free-solid-svg-icons';

const toggleFlexStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white"
}

const StyledAddPanel = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
    @media only screen and (min-width: 768px) {
        width: 350px;
        height: 100%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
`
const StyledRadioWrapper = styled(FlexComponent)`
    padding: .5em 0;
    flex-direction: column;
    align-items: flex-start;
    `
const Form = styled.form`
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    padding: .5em;
    overflow: auto;
`

const StyledPartWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
`
const Select = styled.select`
    width: 100%;
    height: 35px;
    border: none;
    font-size: 1.2em;
    color: ${variables.$gray};
`
const Option = styled.option`
    height: 35px;
`

const AddPanel = ({ 
    radio, 
    planKey, 
    addExercise, 
    handleRadioButton, 
    handleAddPanel, 
    isAddPanelHidden, 
    isArrowButtonHidden 
}) => {
    return (
        <StyledAddPanel>
            {!isAddPanelHidden ?
            <Form onSubmit={(e)=> addExercise(e, planKey)}>
                <StyledPartWrapper>
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
                </StyledPartWrapper>
                <StyledPartWrapper>
                    <Button 
                        text={"Dodaj"} 
                        handleClick={()=> {}}   
                    />
                </StyledPartWrapper>
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
                isArrowButtonHidden={isArrowButtonHidden}
            />
        </StyledAddPanel>
    )
}

export default AddPanel;