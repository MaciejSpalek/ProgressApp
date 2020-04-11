import React from 'react';
import styled from 'styled-components';
import { FlexComponent, Caption } from './styleHelpers';
import ArrowButton from '../Components/arrowButton';

const TogglePanel = ({ 
    flexStyles, 
    text, 
    handleFunction,
    buttonBackgroundColor, 
    arrowColor, 
    isHidden
}) => {
    return (
        <FlexComponent style={flexStyles}>
            <Caption> {text} </Caption>
            <ArrowButton
                handleFunction={()=> handleFunction()}
                backgroundColor={buttonBackgroundColor}
                fontColor={arrowColor}
                isHide={isHidden}
            />
        </FlexComponent>
    )
}
export default TogglePanel;