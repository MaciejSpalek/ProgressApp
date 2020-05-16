import React from 'react';
import styled from 'styled-components'
import { FlexComponent } from '../../Components/styleHelpers';
import Parameter from './parameter';
import { 
    faVenusMars, 
    faMale, 
    faWeightHanging, 
    faBolt, 
    faSignInAlt ,
    faAddressCard
} from '@fortawesome/free-solid-svg-icons';


const StyledContainer = styled(FlexComponent)`
    height: 100%;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const BottomWrapper = ({ user }) => {
    const {  
        trainingExperience,
        dateOfCreation,
        description,
        weight, 
        height,
        sex, 
    } = user;

    const getText = (caption, profileData, unit="") => {
        if(profileData !== "-") {
            return `${caption}: ${profileData}${unit}`;
        } else {
            return `${caption}: brak`;
        }
    }
    
    return (
        <StyledContainer>
            <Parameter icon={faSignInAlt} text={ getText("Utworzono", dateOfCreation) }/>
            <Parameter icon={faMale} text={ getText("Wzrost", height, "cm") }/>
            <Parameter icon={faWeightHanging} text={ getText("Waga", weight, "kg") }/>
            <Parameter icon={faBolt} text={ getText("Staż", trainingExperience, "l") }/>
            <Parameter icon={faVenusMars} text={ getText("Płeć", sex) }/>
            <Parameter icon={faAddressCard} text={ getText("Opis", description) }/>
        </StyledContainer>
    )
}

export default BottomWrapper;