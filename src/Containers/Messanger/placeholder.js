import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { variables, FlexComponent } from '../../Components/styleHelpers';
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"

const StyledHeading = styled.h2`
    font-size: 2em;
`

const StyledContainer = styled(FlexComponent)`
    flex-direction: column;
    background-color: white;
    height: 100%;
`

const Placeholder = () => {
    return (
        <StyledContainer>
            <FontAwesomeIcon
                icon={faFacebookMessenger}
                style={{
                    fontSize: 100,
                    color: variables.$grayBlue
                }}
            />
            <StyledHeading>
                Messanger
            </StyledHeading>
        </StyledContainer>
    )
}

export default Placeholder;