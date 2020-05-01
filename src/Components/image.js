import React from 'react';
import styled from 'styled-components'

const ImageWrapper = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    background-image: url(${props => props.url});
    background-position: center;
    background-size: cover;
    border-radius: 50%;
`

const Image = ({ url, height, width, margin }) => {
    return (
        <ImageWrapper 
            url={url} 
            width={width}
            height={height}
            style={{margin: margin}}
        />
       
    )
}

export default Image;