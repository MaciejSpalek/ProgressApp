import React from 'react';
import styled from 'styled-components'


const ImageWrapper = styled.img`
    width: ${props => props.width};
    height: ${props => props.height};
    border-radius: 50%;
`

const Image = ({ url, height, width, margin }) => {
    return (
        <ImageWrapper 
            src={url} 
            width={width}
            height={height}
            style={{margin: margin}}
        />
       
    )
}

export default Image;