import React from 'react';
import styled from 'styled-components'
import { flexCenter } from '../Components/styleHelpers';

const StyledImage = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 50%;
`
const StyledFigure = styled.figure`
    ${flexCenter};
`
const StyledFigCaption = styled.figcaption`

`

const Image = ({ 
    url, 
    alt,
    width, 
    height, 
    margin,
    figCaption,
    figCaptionStyle 
}) => {
    return (
        <StyledFigure>
            <StyledImage 
                alt={alt}
                src={url} 
                width={width}
                height={height}
                style={{margin: margin}}
            />
            <StyledFigCaption 
                style={figCaptionStyle}>
                {figCaption}
            </StyledFigCaption>
        </StyledFigure>
    )
}

export default Image;