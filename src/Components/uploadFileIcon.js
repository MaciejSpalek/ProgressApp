import React from 'react';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Input = styled.input``
const StyledLabel = styled.label`
    position: absolute;
    right: .5em;
    top: .5em;
    background-color: white;
`

const UploadFileIcon = ({ icon, color, styles, onChangeFunction }) => {
    return (
        <StyledLabel>
            <FontAwesomeIcon 
                icon={icon} 
                color={color} 
                style={styles}
            /> 
            <Input 
                type="file" 
                style={{display: "none"}} 
                onChange={(e) => onChangeFunction(e)}
            />
        </StyledLabel>
    )
}

export default UploadFileIcon;