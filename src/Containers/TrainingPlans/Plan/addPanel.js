import React from 'react';
import styled from 'styled-components'
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

const StyledAddPanel = styled(FlexComponent)`
    flex-direction: column;
    justify-content: space-between;
    height: ${props => props.isAddPanelHidden ? "auto" : "100%"};
    position: ${props => props.isAddPanelHidden ? "absolute" : "static"};
    bottom: 0;
    left: 0;
    padding: 0;

    @media only screen and (min-width: 768px) {
        width: 450px;
        box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    }
`

const Form = styled.form`
    ${flexCenter};
    flex-direction: column;
    justify-content: flex-start;
    width: 100%;
    height: 100%;
    padding: .5em;
    overflow: auto;
`

const StyledRadioWrapper = styled(FlexComponent)`
    flex-direction: column;
    align-items: flex-start;
    margin: .75em 0;
    padding: 0;
`




const AddPanel = ({ 
    isArrowButtonHidden, 
    handleRadioButton, 
    isAddPanelHidden, 
    handleAddPanel, 
    addExercise, 
    planKey, 
    radio, 
}) => {
    return (
        <StyledAddPanel isAddPanelHidden={isAddPanelHidden}>
            {!isAddPanelHidden ?
            <Form onSubmit={(e)=> addExercise(e, planKey)}>
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
                        color={variables.$gray}
                        text={"Typ ćwiczenia"}
                        align={"flex-start"}
                        fontWeight={"bold"}
                        fontSize={"1.3em"}
                    /> 
                    <RadioLabel  
                        handleFunction={(e) => handleRadioButton(e)}
                        isChecked={radio === "repsWithoutWeight"} 
                        text={"powtórzenia bez ciężaru"}
                        value={"repsWithoutWeight"} 
                    />
                    <RadioLabel 
                        handleFunction={(e) => handleRadioButton(e)}
                        isChecked={radio === "repsWithWeight"} 
                        text={"powtórzenia z ciężarem"}
                        value={"repsWithWeight"} 
                    />
                    <RadioLabel 
                        handleFunction={(e) => handleRadioButton(e)}
                        isChecked={radio === "time"} 
                        text={"czasówka"}
                        value={"time"} 
                    />
                </StyledRadioWrapper>
                <Button 
                    text={"Dodaj"} 
                    handleClick={()=> {}}   
                />
            </Form> : null}
            <TogglePanel 
                buttonBackgroundColor={variables.$grayBlue}
                isArrowButtonHidden={isArrowButtonHidden}
                handleFunction={()=> handleAddPanel()} 
                iconColor={variables.$grayBlue}
                isHidden={isAddPanelHidden}
                text={`Nowe ćwiczenie`}   
                textFontWeight={"bold"}
                textFontSize={"1.3em"}
                iconName={faRunning} 
                iconFontSize={25}
            />
        </StyledAddPanel>
    )
}

export default AddPanel;