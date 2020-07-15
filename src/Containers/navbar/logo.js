import React from 'react'
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartLine } from '@fortawesome/free-solid-svg-icons';
import { variables, flexCenter } from '../../Components/styleHelpers';

const StyledLogo = styled.div`
    ${flexCenter};
`;

const Title = styled.h1`
    font-size: 1.8em;
    font-weight: bold;
`;

const Logo = () => {
    return (
        <StyledLogo>
            <FontAwesomeIcon 
                icon={faChartLine} 
                color={variables.$orange} 
                style={{fontSize:30}} 
            />
            <Title> ProgressApp </Title>
        </StyledLogo>
    )
}

export default Logo;

