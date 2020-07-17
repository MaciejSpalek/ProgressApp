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
                alt={alt}
                url={url}
                width={imgWidth}
                height={imgHeight}
            />
            <OnlineDot 
                size={dotSize}
                isLogged={isLogged}
                dotBorder={dotBorder}
            />
        </StyledImageWrapper>
    )
}

export default ImageWrapper;