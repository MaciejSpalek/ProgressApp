import React from "react";

const Input = ({name, placeholder, value, onChange}) => {
    return (
        <label className="form__label">
            <input 
                className="form__input" 
                name={name} 
                placeholder={placeholder}  
                value={value} 
                onChange={onChange}
            /> cm 
        </label>
    )
}

export default Input;