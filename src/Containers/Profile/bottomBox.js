import React from 'react';
import styled from 'styled-components'
import ProfileButton from './profileButton';
import { FlexComponent } from '../../Components/styleHelpers';
import { faRuler, faMedal, faMale } from '@fortawesome/free-solid-svg-icons';


const StyledContainer = styled(FlexComponent)`
    height: 100%;
    justify-content: space-evenly;
    align-items: flex-start;
`


const BottomWrapper = () => {
    return (
        <StyledContainer>
            <ProfileButton icon={faMale} text={"Ogólne"} handleFunction={()=> {}}/>
            <ProfileButton icon={faRuler} text={"Wymiary"} handleFunction={()=> {}}/>
            <ProfileButton icon={faMedal} text={"Rekordy"} handleFunction={()=> {}}/>
        </StyledContainer>
    )
}

export default BottomWrapper;