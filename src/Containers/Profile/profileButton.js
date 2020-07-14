import React from 'react';
import styled from 'styled-components';
import Paragraph from '../../Components/paragraph';
import { FlexComponent, variables } from '../../Components/styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    background-color: ${variables.$lightGray};
    border-radius: .2em;
    margin: .5em;
    padding: .5em .2em;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);

`


const ProfileButton = ({ icon, bgcolor,  text, handleFunction}) => {
    return (
        <StyledContainer 
            onClick={(e)=> handleFunction(e)}
            bgcolor = {bgcolor}>
            <FontAwesomeIcon 
                icon={icon} 
                style={{fontSize: 50}} 
                color={variables.$grayBlue} 
            />
            <Paragraph
                text={text}
                fontSize={"1em"}
                fontWeight={"bold"}
                color={variables.$grayBlue}
            />
        </StyledContainer>
    )
}

export default ProfileButton;