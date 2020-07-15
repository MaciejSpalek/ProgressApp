import React, { useState } from './node_modules/react';
import Menu from './menu';
import Logo from './logo';
import styled from './node_modules/styled-components';
import Hamburger from './hamburger';
import { flexCenter, variables }  from '../../Components/styleHelpers';

const Nav = styled.nav`
    position: fixed;
    ${flexCenter};
    justify-content: space-between;
    color: white;
    background-color: ${variables.$grayBlue};
    width: 100%;
    height: 64px;
    font-size: 1em;
    padding: .2em .5em;
    z-index: 1;
`;


const Navbar = ({ user, usersData }) => {
    const [ activeStatus, setActiveStatus ] = useState(false)
    const handleHamburger = () => {
        setActiveStatus(!activeStatus)
    }

    return (
        <Nav>
            <Logo />
            { user ? <Hamburger 
                handleFunction={()=> handleHamburger()}
                isMenuActive={activeStatus}
            />: null }

            { user ? <Menu 
                handleHamburger={()=> handleHamburger()} 
                isMenuActive={activeStatus}
                usersData={usersData}
                currentUser={user}
            /> : null }
        </Nav>
    );
}

export default Navbar;

