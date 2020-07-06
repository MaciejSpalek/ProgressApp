import React from "react"
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { variables, RWD } from "../../Components/styleHelpers";

const onStyle = {
    "fontSize": "40", 
    "transition": ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"
};

const offStyle = {
    "fontSize": "50", 
    "transition": ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"
}

const StyledIcon = styled(FontAwesomeIcon)`
    @media only screen and (min-width: ${RWD.$desktop}) {
       display: none;
    }
`

const Hamburger = ({ handleFunction, isMenuActive }) => {
    return (
        <StyledIcon 
            icon={!isMenuActive ? faBars: faTimes} 
            style={!isMenuActive ? onStyle : offStyle} 
            onClick={()=> handleFunction()}
            color={variables.$orange} 
        />
    );
}

export default Hamburger;

