import React from 'react';
import styled from 'styled-components'
import { FlexComponent, variables } from '../../Components/styleHelpers';
import Parameter from './parameter';
import {  
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
const StyledDescriptionWrapper = styled.div`
    width: 100%;
    border: .1em solid ${variables.$lightGray};
    padding: .5em;
    border-radius: .3em;
    margin-top: .25em;
`

const StyledDescriptionText = styled.p`
    font-size: 1.2em;
    text-align: left;
    color: black;
    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
`

const BottomWrapper = ({ user }) => {
    const {  
        trainingExperience,
        dateOfCreation,
        description,
        weight, 
        height
    } = user;

    const getText = (caption, profileData, unit="") => {
        if(profileData !== "-") {
            return `${caption}: ${profileData}${unit}`;
        } else {
            return `${caption}: brak`;
        }
    }

    const doesStringHaveOnlyWhiteSpaces = string => {
        return !string.replace(/\s/g, '').length
    }

    return (
        <StyledContainer>
            <Parameter icon={faSignInAlt} text={ getText("Utworzono", dateOfCreation) }/>
            <Parameter icon={faMale} text={ getText("Wzrost", height, "cm") }/>
            <Parameter icon={faWeightHanging} text={ getText("Waga", weight, "kg") }/>
            <Parameter icon={faBolt} text={ getText("Staż", trainingExperience, "l") }/>
            <Parameter icon={faAddressCard} text={`Opis: ${description !== "-" && !doesStringHaveOnlyWhiteSpaces(description) ? "" : "brak"}`}/>
            {description !== "-" && !doesStringHaveOnlyWhiteSpaces(description) ?
                <StyledDescriptionWrapper>
                    <StyledDescriptionText>
                        { description }
                    </StyledDescriptionText>
                </StyledDescriptionWrapper> 
            : null }
        </StyledContainer>
    )
}

export default BottomWrapper;