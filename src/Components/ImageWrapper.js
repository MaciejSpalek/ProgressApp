import React from 'react';
import styled from 'styled-components'
import Image from './image';
import OnlineDot from './onlineDot';


const StyledImageWrapper = styled.div`
    position:relative;
    margin: ${props => props.margin};
`

const ImageWrapper = ({ 
    url, 
    alt,
    imgWidth, 
    imgHeight, 
    dotSize, 
    dotBorder, 
    isLogged, 
    margin 
}) => {
    return (
        <StyledImageWrapper margin={margin}>
            <Image 
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
            />
        </StyledImageWrapper>
    )
}

export default ImageWrapper;