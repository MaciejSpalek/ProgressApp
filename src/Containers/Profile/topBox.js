import React from 'react';
import styled from 'styled-components'
import Image from '../../Components/image';
import Paragraph from '../../Components/paragraph';
import OnlineDot from '../../Components/onlineDot';
import UploadFileIcon from '../../Components/uploadFileIcon';
import { FlexComponent, variables } from '../../Components/styleHelpers';
import { faImages, faPenSquare } from '@fortawesome/free-solid-svg-icons';

const StyledWrapper = styled(FlexComponent)`
    position: relative;
    flex-direction: column;
    padding: 1em;
    border-bottom: 1px solid ${variables.$lightGray};
`
const StyledImageWrapper = styled.div`
    position:relative;
`

const TopWrapper = ({ 
    url, 
    width, 
    height, 
    paragraphText, 
    isLogged,
    onChangefunction
}) => {
    return (
        <StyledWrapper>
            <StyledImageWrapper>
                <Image 
                    url={url}
                    width={width}
                    height={height}
                />
                <OnlineDot 
                    size={"22px"}
                    isLogged={isLogged}
                />
            </StyledImageWrapper>
            <UploadFileIcon 
                icon={faPenSquare}
                color={variables.$grayBlue}
                styles={{fontSize: 35}}
                onChangeFunction={(e) => onChangefunction(e)}
            />
            <Paragraph
                text={paragraphText}
                fontSize={"1.5em"}
                fontWeight={"bold"}
                padding={".3em 0"}
            />
        </StyledWrapper>
    )
}

export default TopWrapper;