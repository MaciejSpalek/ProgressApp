import React from 'react';
import { FlexComponent, flexCenter, variables } from './styleHelpers';
import ArrowButton from '../Components/arrowButton';
import styled from 'styled-components';
import Paragraph from './paragraph';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const StyledContainer = styled(FlexComponent)`
    ${props => props.styles};
    justify-content: space-between;
    background-color: white;
`

const StyledWrapper = styled(FlexComponent)`
    ${flexCenter}
    justify-content: flex-start;
    padding: 0;
`

const SquareWrapper = styled.div`
    ${flexCenter}
    background-color: ${variables.$lightGray};
    width: 35px;
    height: 35px;
    border-radius: .3em;
    margin-right: .5em;
`

const TogglePanel = ({ 
    flexStyles, 
    buttonBackgroundColor, 
    buttonColor,
    isHidden,
    handleFunction,

    text, 
    textFontSize,
    textFontWeight,

    iconName,
    iconFontSize,
    iconColor,
    isArrowButtonHidden
    
}) => {
    return (
        <StyledContainer style={flexStyles}>
            <StyledWrapper>
                {typeof iconName !== "undefined" ?
                    <SquareWrapper>
                        <FontAwesomeIcon icon={iconName} style={{fontSize: iconFontSize, color: iconColor}}/> 
                    </SquareWrapper> : null
                }
                <Paragraph 
                    text={text}  
                    fontSize={textFontSize}
                    fontWeight={textFontWeight}
                /> 
            </StyledWrapper>
            {!isArrowButtonHidden ?
                <ArrowButton
                    handleFunction={()=> handleFunction()}
                    backgroundColor={buttonBackgroundColor}
                    fontColor={buttonColor}
                    isHide={isHidden}
                /> : null}
        </StyledContainer>
    )
}
export default TogglePanel;