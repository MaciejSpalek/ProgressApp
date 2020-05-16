import React from 'react';
import styled from 'styled-components'
import Input from '../../Components/input';
import Button from '../../Components/Button';

const StyledForm = styled.form`
    width: 100%;
    padding: .5em;
`

const Form = ({ handleFunction }) => {
    return (
        <StyledForm onSubmit={(e)=> handleFunction(e)}>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"trainingExperience"}  placeholder="staż treningowy" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"weight"}  placeholder="waga" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"height"}  placeholder="wzrost" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"sex"}  placeholder="płeć" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"description"}  placeholder="opis" handleFunction={()=> {}}/>
            <Button style={{marginTop: ".5em"}} text={"Dodaj"} handleClick={()=> {}} />
        </StyledForm>
    )
}

export default Form;
