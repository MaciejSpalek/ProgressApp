import React from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'



const Navbar = () => {
    return (
        <div className="navbar">
            <FontAwesomeIcon icon={faChartLine} color="#FF8E00" style={{fontSize:35}} />
            <h1 className="navbar__title">ProgressApp</h1>
        </div>
    );
}

export default Navbar;