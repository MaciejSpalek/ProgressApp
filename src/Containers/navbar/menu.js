import React, { useState, useEffect } from "react"
import app from '../../base'
import styled from 'styled-components'
import MenuItem from './menuItem';
import { faRuler, faListOl, faSignOutAlt, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"


const transformMenu = {
    "transform": "translateX(0%)"
}

const MenuComponent = styled.div`
        position: fixed;
        top: 64px;
        left: 0;
        width: 100vw;
        height: calc(100vh - 64px);
        transform: translateX(100%);
        background-color: rgba(0, 3, 19, 0.969);
        transition: .3s cubic-bezier(0.785, 0.135, 0.15, 0.86);
        overflow-y: scroll;
`

const MenuList = styled.ul`
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        width: 100%;
`


const Menu = ({ isMenuActive, handleHamburger, usersData, currentUser }) => {
    const [ user, setUser ] = useState(null)

    const logout = () => {
        app.getRealTimeDatabase()
            .ref("users")
            .child(app.getUserID())
            .child("isLogged")
            .set(false);
        app.logout();
    }

    const getCurrentUserData = () => {
        const currentUserData = usersData.filter(userData => userData.userID === app.getUserID());
        setUser(currentUserData[0]);
    }
    
    
    useEffect(() => {
        if(currentUser) {
            getCurrentUserData();
        }
    })
    
    return (
        <MenuComponent style={isMenuActive ? transformMenu:null}>
            <MenuList>
                <MenuItem route={"/"} iconName={faHome} caption={"Główna"} handleFunction={()=> handleHamburger()}/>
                <MenuItem route={user ? `/${user.nick}` : `/`} iconName={faUser} caption={"Profil"} handleFunction={()=> handleHamburger()}/>
                <MenuItem route={"/planBoard"} iconName={faListOl} caption={"Plan"} handleFunction={()=> handleHamburger()}/>
                <MenuItem route={"/messanger"} iconName={faFacebookMessenger} caption={"Messanger"} handleFunction={()=> handleHamburger()}/>
                <MenuItem route={"/measurements"} iconName={faRuler} caption={"Wymiary"} handleFunction={()=> handleHamburger()}/>
                <MenuItem route={"/login"} iconName={faSignOutAlt} caption={"Wyloguj"} handleFunction={() => { logout(); handleHamburger();}}/>
            </MenuList>
        </MenuComponent>
    )
}

export default Menu;

