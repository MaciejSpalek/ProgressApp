import React from 'react';
import styled from 'styled-components'
import InputLabel from '../../Components/InputLabel';
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
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"neck"}  
                    text={"Kark"}
                    min={0}
                    max={100} 
                />
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"chest"}  
                    text={"Klatka"}
                    min={0}
                    max={250} 
                />
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"biceps"}  
                    text={"Biceps"}
                    min={0}
                    max={100} 
                />
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"forearm"}  
                    text={"Przedramię"}
                    min={0}
                    max={100} 
                />
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"waist"}  
                    text={"Talia"}
                    min={0}
                    max={300} 
                />
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"thigh"}  
                    text={"Udo"}
                    min={0}
                    max={200} 
                />
                <InputLabel
                    handleFunction={()=> {}}
                    isRequired={true} 
                    type={"number"} 
                    name={"calf"}  
                    text={"Łydka"}
                    min={0}
                    max={100} 
                />
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