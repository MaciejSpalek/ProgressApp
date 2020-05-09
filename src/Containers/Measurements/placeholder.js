import React from 'react';
import styled from 'styled-components';
import { FlexComponent, variables } from '../../Components/styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const CaseText = styled.h2`
    color: ${variables.$grayBlue};
    font-size: 2em;
`
const StyledPlaceholder = styled(FlexComponent)`
    height: 100%;
    flex-direction: column;
`

const Placeholder = ({ iconName, text }) => {
    return (
    <StyledPlaceholder>
        <FontAwesomeIcon 
            icon={iconName} 
            style={{
                fontSize: 100, 
                color: variables.$grayBlue,
                marginBottom: ".2em"

            }}/>
        <CaseText>{text}</CaseText>
    </StyledPlaceholder>
    )
}

export default Placeholder;