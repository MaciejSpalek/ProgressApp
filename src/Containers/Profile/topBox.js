import React from 'react';
import styled from 'styled-components'
import Image from '../../Components/image';
import Paragraph from '../../Components/paragraph';
import OnlineDot from '../../Components/onlineDot';

import { FlexComponent, variables } from '../../Components/styleHelpers';

const StyledWrapper = styled(FlexComponent)`
    flex-direction: column;
    padding: 1em;
    border-bottom: 1px solid ${variables.$lightGray};
`
const StyledImageWrapper = styled.div`
    position:relative;
`

const TopWrapper = ({ url, width, height, paragraphText, isLogged }) => {
    return (
        <StyledWrapper>
            <StyledImageWrapper>
                <Image 
                    url={url}
                    width={width}
                    height={height}
                />
                <OnlineDot 
                    size={"1.8em"}
                    isLogged={isLogged}
                />
            </StyledImageWrapper>
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