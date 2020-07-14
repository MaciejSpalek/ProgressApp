import React from 'react';
import styled from 'styled-components'
import Input from '../../Components/input';
import Button from '../../Components/Button';
import SquareButton from '../../Components/Buttons/SquareButton';
import { FlexComponent, variables, flexCenter } from '../../Components/styleHelpers';
import { faUndoAlt } from "@fortawesome/free-solid-svg-icons";


const squareButtonStyles = {
    position: "static",
    height: "100%",
    padding: ".5em",
    marginLeft: ".5em",
    backgroundColor: variables.$grayBlue
}
const StyledForm = styled.form`
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    max-width: 500px;
    min-height: 400px;
    border-radius: .3em;
    margin-bottom: .5em;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: .5em;

    @media only screen and (min-width: 1200px) {
        position: absolute;
        width: 320px;
        top: 0;
        right: calc(100% + 1em);
    }
`


const StyledButtonWrapper = styled(FlexComponent)`
    justify-content: space-between;
    padding: 0;
`
const StyledInputWrapper = styled(FlexComponent)`
    flex-direction: column;
    justify-content: space-between;
    padding: 0;
`

const StyledTextArea = styled.textarea`
    width: 100%;
    height: 195px;
    resize: none;
    border: none;
    border-radius: .3em;
    padding: .5em;
    font-size: 1.5em;
`

const Form = ({ handleFunction, handleEditButton, user }) => {

    const { 
        trainingExperience,
        weight,
        height,
        description
    } = user;

    return (
        <StyledForm onSubmit={(e)=> handleFunction(e)}>
            <StyledInputWrapper>
                <Input 
                    value={trainingExperience}
                    style={{margin: ".25em 0"}} 
                    type={"number"} 
                    name={"trainingExperience"} 
                    placeholder="staż treningowy"
                    handleFunction={()=> {}}
                />
                <Input 
                    value={weight}
                    style={{margin: ".25em 0"}} 
                    type={"number"} 
                    name={"weight"} 
                    placeholder="waga [kg]" 
                    handleFunction={()=> {}}
                />
                <Input 
                    value={height}
                    style={{margin: ".25em 0"}} 
                    type={"number"} 
                    name={"height"} 
                    placeholder="wzrost [cm]" 
                    handleFunction={()=> {}}
                />
                <StyledTextArea 
                    style={{margin: ".25em 0"}} 
                    name={"description"} 
                    placeholder="opis"
                    defaultValue={description}
                />
            </StyledInputWrapper>
            <StyledButtonWrapper>
                <Button  
                    text={"Dodaj"} 
                    handleClick={()=> {}} 
                />
                <SquareButton 
                    handleFunction={()=> handleEditButton()}
                    iconStyle={{fontSize: 29}}
                    iconName={faUndoAlt}  
                    iconColor={"white"} 
                    buttonStyles={squareButtonStyles}
                />
            </StyledButtonWrapper>
        </StyledForm>
    )
}

export default Form;
