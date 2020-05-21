import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { variables, FlexComponent, flexCenter } from '../../Components/styleHelpers';

const StyledWrapper = styled(FlexComponent)`
    justify-content: flex-start;
    height: 35px;
    font-size: 1.1em;
    margin: .2em 0;
    border: none;
    border-radius: .3em;
    padding: 0;
`
const StyledText = styled.p`
    color: black;
    font-size: 1.2em;
`

const IconWrapper = styled.div`
    ${flexCenter};
    width: 2em;
    height: 2em;
    border-radius: .3em;
    background-color: ${variables.$lightGray};
    margin-right: .3em;
`
const Parameter = ({ icon, text }) => {
    return (
        <StyledWrapper>
            <IconWrapper>
                <FontAwesomeIcon 
                    icon={icon}
                    style={{
                        fontSize: 20,
                        color: variables.$grayBlue
                    }}
                />
            </IconWrapper>
            <StyledText>
                { text }
            </StyledText>
        </StyledWrapper>
    )
}

export default Parameter;