import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'

const handleHamburger = () => {
    console.log("hamburger click!")
}


const Hamburger = () => {
    return (
        <FontAwesomeIcon icon={faBars} color="#FF8E00" style={{fontSize:40}} onClick={handleHamburger}/>
    );
}

export default Hamburger;

