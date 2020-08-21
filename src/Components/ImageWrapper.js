import React from 'react';
import styled from 'styled-components'
import Image from './image';
import OnlineDot from './onlineDot';


const StyledImageWrapper = styled.div`
    position: relative;
    margin: ${props => props.margin};
`

const ImageWrapper = ({ 
    figCaptionStyle,
    figCaption, 
    dotBorder,
    imgHeight, 
    imgWidth, 
    isLogged, 
    dotSize, 
    margin, 
    url, 
    alt,
    gap
}) => {
    return (
        <StyledImageWrapper margin={margin}>
            <Image 
                figCaptionStyle={figCaptionStyle}
                figCaption={figCaption}
                height={imgHeight}
                width={imgWidth}
                alt={alt}
                url={url}
            />
            <OnlineDot 
                position={"absolute"}
                dotBorder={dotBorder}
                isLogged={isLogged}
                size={dotSize}
                gap={gap}
            />
        </StyledImageWrapper>
    )
}

export default ImageWrapper;