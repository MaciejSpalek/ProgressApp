import React from "./node_modules/react"
import styled from './node_modules/styled-components';
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome'
import { faBars, faTimes } from './node_modules/@fortawesome/free-solid-svg-icons'
import { variables } from "../../Components/styleHelpers";

const onStyle = {
    "fontSize": "40", 
    "transition": ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"
};

const offStyle = {
    "fontSize": "50", 
    "transition": ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"
}

const StyledIcon = styled(FontAwesomeIcon)`
    @media only screen and (min-width: 1200px) {
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

