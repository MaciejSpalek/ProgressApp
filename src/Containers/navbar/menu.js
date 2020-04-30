import React, { useState, useEffect } from "react"
import * as styleHelpers  from '../../Components/styleHelpers'
import app from '../../base'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faStar, faRuler, faListOl, faSignOutAlt, faHome, faUser } from '@fortawesome/free-solid-svg-icons'
import { faFacebookMessenger } from "@fortawesome/free-brands-svg-icons"

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;
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
const ListItem = styled.li`
        ${flexCenter};
        justify-content: flex-start;
        transition: .5s linear;
        text-decoration: none;
        padding: .5em;
        &:hover {
            background-color: rgba(16, 24, 70, 0.801);
        }
`
const Caption = styled.h2`
        font-size: 1.6em;
        color: white;
`

const Icon = styled.div`
        width: 5em;
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

    const getCurrentUser = () => {
        const currentUserData = usersData.filter(userData => userData.userID === app.getUserID());
        setUser(currentUserData[0]);
    }
    
    
    useEffect(() => {
        if(currentUser) {
            getCurrentUser();
        } 
    })
    
    return (
        <MenuComponent style={isMenuActive ? transformMenu:null}>
            <MenuList>
                <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/">
                    <ListItem>
                        <Icon><FontAwesomeIcon icon={faHome} color="#FF8E00" style={{fontSize:50}} /></Icon>
                        <Caption>Główna</Caption>
                    </ListItem>
                </Link>
                <Link style={{textDecoration: "none"}} onClick={handleHamburger} to={user ? `/${user.nick}` : `/`} >
                    <ListItem>
                        <Icon><FontAwesomeIcon icon={faUser} color="#FF8E00" style={{fontSize:50}} /></Icon>
                        <Caption>Profil</Caption>
                    </ListItem>
                </Link>

                <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/planBoard">
                    <ListItem>
                        <Icon><FontAwesomeIcon icon={faListOl} color="#FF8E00" style={{fontSize:50}} /></Icon>
                        <Caption>Plan</Caption>
                    </ListItem>
                </Link>

                <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/messanger">
                    <ListItem>
                        <Icon><FontAwesomeIcon icon={faFacebookMessenger} color="#FF8E00" style={{fontSize:50}} /></Icon>
                        <Caption>Messanger</Caption>
                    </ListItem>
                </Link>

                <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/measurements">
                    <ListItem>
                        <Icon><FontAwesomeIcon icon={faRuler} color="#FF8E00" style={{fontSize:50}} /></Icon>
                        <Caption>Wymiary</Caption>
                    </ListItem>
                </Link>

                <Link style={{textDecoration: "none"}} onClick={() => { logout(); handleHamburger();}} to="/login">
                    <ListItem>
                        <Icon><FontAwesomeIcon icon={faSignOutAlt} color="#FF8E00" style={{fontSize:50}} /></Icon>
                        <Caption>Wyloguj</Caption>
                    </ListItem>
                </Link>
            </MenuList>
        </MenuComponent>
    )
}

export default Menu;

