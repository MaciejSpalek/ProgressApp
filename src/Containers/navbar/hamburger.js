import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'

const onStyle = {
    "fontSize": "40", 
    "transition": ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"
};

const offStyle = {
    "fontSize": "50", 
    "transition": ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"
}

const Hamburger = ({ handleFunction, isMenuActive }) => {
    return (
        <FontAwesomeIcon 
            icon={!isMenuActive ? faBars: faTimes} 
            color="#FF8E00" 
            style={!isMenuActive ? onStyle : offStyle} 
            onClick={()=> handleFunction()}
        />
    );
}

export default Hamburger;

