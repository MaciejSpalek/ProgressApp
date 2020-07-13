import React from 'react';
import styled from 'styled-components'
import Input from '../../../Components/input'
import Button from '../../../Components/Button'
import RadioLabel from '../../../Components/RadioLabel'
import TogglePanel from '../../../Components/togglePanel';
import SelectWrapper from '../../../Components/SelectWrapper';
import InputLabel from '../../../Components/InputLabel';
import Paragraph from '../../../Components/paragraph';
import { faRunning } from '@fortawesome/free-solid-svg-icons';
import { 
    variables, 
    flexCenter, 
    FlexComponent
} from '../../../Components/styleHelpers';



const toggleFlexStyles = {
    "justifyContent": "space-between",
    "backgroundColor": "white"
}

const StyledAddPanel = styled(FlexComponent)`
    flex-direction: column;
    padding: 0;
    @media only screen and (min-width: 768px) {
        width: 450px;
        height: 100%;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
`

const StyledRadioWrapper = styled(FlexComponent)`
    padding: 0;
    margin-top: .75em;
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
                    <InputLabel
                        handleFunction={()=> {}}
                        text={"Nazwa ćwiczenia"} 
                        isRequired={true}
                        maxLength={22} 
                        type="text" 
                        name="name" 
                    />
                    <InputLabel 
                        handleFunction={()=> {}}
                        name={"amountOfSeries"}  
                        text={"Ilość serii"}
                        isRequired={true}
                        type={"number"} 
                        max={20} 
                        min={1}
                    />
                    <SelectWrapper />
                    <StyledRadioWrapper>
                        <Paragraph
                            text={"Typ ćwiczenia"}
                            color={variables.$gray}
                            align={"flex-start"}
                            fontSize={"1.3em"}
                            fontWeight={"bold"}
                        /> 
                        <RadioLabel  
                            value={"repsWithoutWeight"} 
                            isChecked={radio === "repsWithoutWeight"} 
                            handleFunction={(e) => handleRadioButton(e)}
                            text={"powtórzenia bez ciężaru"}
                        />
                        <RadioLabel 
                            value={"repsWithWeight"} 
                            isChecked={radio === "repsWithWeight"} 
                            handleFunction={(e) => handleRadioButton(e)}
                            text={"powtórzenia z ciężarem"}
                        />
                        <RadioLabel 
                            value={"time"} 
                            isChecked={radio === "time"} 
                            handleFunction={(e) => handleRadioButton(e)}
                            text={"czasówka"}
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