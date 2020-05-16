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
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"neck"}  placeholder="kark" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"chest"}  placeholder="klatka piersiowa" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"biceps"}  placeholder="biceps" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"forearm"}  placeholder="przedramię" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"waist"}  placeholder="talia" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"thigh"}  placeholder="udo" handleFunction={()=> {}}/>
            <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"calf"}  placeholder="łydka" handleFunction={()=> {}}/>
            <Button style={{marginTop: ".5em"}} text={"Dodaj"} handleClick={()=> {}} />
        </StyledForm>
    )
}

export default Form;