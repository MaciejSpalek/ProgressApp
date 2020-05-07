import React from 'react';
import styled from 'styled-components'
import app from '../../base';
import Paragraph from '../../Components/paragraph';
import ImageWrapper from '../../Components/ImageWrapper';
import UploadFileIcon from '../../Components/uploadFileIcon';
import { faPenSquare } from '@fortawesome/free-solid-svg-icons';
import { FlexComponent, variables } from '../../Components/styleHelpers';

const StyledWrapper = styled(FlexComponent)`
    position: relative;
    flex-direction: column;
    padding: 1em;
    border-bottom: .1em solid ${variables.$lightGray};
`

const TopWrapper = ({ 
    url, 
    width, 
    height, 
    userID,
    isLogged,
    paragraphText, 
    onChangefunction
}) => {

    const isItYourUserProfile = () => {
        const currentUserID = app.getUserID();
        return currentUserID === userID
    }
    return (
        <StyledWrapper>
            <ImageWrapper 
                isLogged={isLogged}
                imgHeight={height}
                imgWidth={width}
                dotSize={"22px"}
                url={url}
            />

            {isItYourUserProfile() ? 
            <UploadFileIcon 
                onChangeFunction={(e) => onChangefunction(e)}
                color={variables.$grayBlue}
                styles={{fontSize: 35}}
                icon={faPenSquare}
            /> : null}
            <Paragraph
                text={paragraphText}
                fontWeight={"bold"}
                fontSize={"1.5em"}
                padding={".3em 0"}
            />
        </StyledWrapper>
    )
}

export default TopWrapper;