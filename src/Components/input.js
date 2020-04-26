import React from 'react';

const Input = ({ name, type, style, placeholder }) => {
    return (
        <input 
            name={name}  
            type={type}
            style={style}
            placeholder={placeholder}
        />
    )
}

export default Input;