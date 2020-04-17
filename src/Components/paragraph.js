import React from 'react';

const Paragraph = ({ color, fontSize, fontWeight, text, align, padding }) => {
    return (
        <p style={{
            fontSize: fontSize, 
            fontWeight: fontWeight, 
            color: color,
            alignSelf: align,
            padding: padding}}>
            {text}
        </p>
    )
}

export default Paragraph;