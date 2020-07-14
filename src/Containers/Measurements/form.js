import React from 'react';
import styled from 'styled-components'
import Input from '../../Components/input';
import Button from '../../Components/Button';
import { flexCenter } from '../../Components/styleHelpers';

const StyledForm = styled.form`
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    padding: .5em;
    overflow-y: auto;
    height: 100%;
`

const StyledWrapper = styled.div`
    width: 100%;
`

const Form = ({ handleFunction }) => {
    return (
        <StyledForm onSubmit={(e)=> handleFunction(e)}>
            <StyledWrapper>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"neck"}  placeholder="kark" handleFunction={()=> {}}/>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"chest"}  placeholder="klatka piersiowa" handleFunction={()=> {}}/>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"biceps"}  placeholder="biceps" handleFunction={()=> {}}/>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"forearm"}  placeholder="przedramię" handleFunction={()=> {}}/>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"waist"}  placeholder="talia" handleFunction={()=> {}}/>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"thigh"}  placeholder="udo" handleFunction={()=> {}}/>
                <Input style={{margin: ".5em 0"}} type={"number"} isRequired={true} name={"calf"}  placeholder="łydka" handleFunction={()=> {}}/>
            </StyledWrapper>
            <StyledWrapper>
                <Button 
                    style={{marginTop: ".5em"}} 
                    text={"Dodaj"} 
                    handleClick={()=> {}} 
                />
            </StyledWrapper>
        </StyledForm>
    )
}

export default Form;