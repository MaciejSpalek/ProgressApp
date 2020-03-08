import React from "react"
import * as styleHelpers  from '../../Components/styleHelpers'
import app from '../../Components/base'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faStar, faRuler, faListOl, faUsers, faIdCard, faSignOutAlt } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;
const transformMenu = {
    "transform": "translateX(0)"
}

const MenuComponent = styled.div`
        position: fixed;
        top: 64px;
        left: 0;
        width: 100vw;
        height: calc(100vh - 64px);
        transform: translateX(100%);
        background-color: ${variables.$grayBlue};
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
            background-color: rgb(0, 65, 102);
        }
`
const Caption = styled.h2`
        font-size: 1.6em;
        color: white;
`

const Icon = styled.div`
        width: 5em;
`

// const Menu = ({isMenuActive}) => {
    class Menu extends React.Component {

        logout() {
            app.logout();
        }

        render() {
            const { isMenuActive, handleHamburger } = this.props;
            return (
                <MenuComponent style={isMenuActive ? transformMenu:null}>
                    <MenuList>

                        <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faIdCard} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Profil</Caption>
                            </ListItem>
                        </Link>

                        <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/plan">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faListOl} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Plan</Caption>
                            </ListItem>
                        </Link>

                        <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/friends">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faUsers} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Znajomi</Caption>
                            </ListItem>
                        </Link>

                        <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/diagrams">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faChartBar} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Wykresy</Caption>
                            </ListItem>
                        </Link>

                        <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/records">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faStar} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Rekordy</Caption>
                            </ListItem>
                        </Link>

                        <Link style={{textDecoration: "none"}} onClick={handleHamburger}  to="/measurements">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faRuler} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Wymiary</Caption>
                            </ListItem>
                        </Link>

                        <Link style={{textDecoration: "none"}} onClick={() => { this.logout(); handleHamburger();}} to="/login">
                            <ListItem>
                                <Icon><FontAwesomeIcon icon={faSignOutAlt} color="#FF8E00" style={{fontSize:50}} /></Icon>
                                <Caption>Wyloguj</Caption>
                            </ListItem>
                        </Link>
                        
                    </MenuList>
                </MenuComponent>
            )
        }
}

export default Menu;

