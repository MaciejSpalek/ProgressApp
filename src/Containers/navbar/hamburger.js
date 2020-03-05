import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'


const Hamburger = () => {
    return (
        <FontAwesomeIcon icon={faBars} color="#FF8E00" style={{fontSize:40}} />
    );
}

export default Hamburger;

