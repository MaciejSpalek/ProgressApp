import React from "react"
import * as styleHelpers  from '../../Components/styleHelpers'
import { Link } from 'react-router-dom';
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartBar, faStar, faRuler, faListOl, faUsers, faIdCard, faTimes } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;
const transformMenu = {
    "transform": "translateX(0)"
}

const MenuComponent = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    transform: translateX(100%);
    background-color: ${variables.$grayBlue};
    transition: .4s cubic-bezier(0.785, 0.135, 0.15, 0.86);
    z-index:999;
`
const Caption = styled.h2`
    font-size: 1.6em;
    color: white;
`
const MenuList = styled.ul`
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(6, 1fr);
    background-color: $grayBlue;
    width: 100%;
    margin-top: 64px;

`
const ListItem = styled.li`
        ${flexCenter};
        justify-content: flex-start;
        background-color: ${variables.$blue};
        transition: .5s linear;
        text-decoration: none;
        padding: .5em;
        &:hover {
            background-color: rgb(0, 65, 102);
        }
`

const Icon = styled.div`
    width: 5em;
`

const Menu = ({isMenuActive}) => {
    return (
        <MenuComponent style={isMenuActive ? transformMenu:null}>
            <MenuList>
                <ListItem>
                    <Icon><FontAwesomeIcon icon={faIdCard} color="#FF8E00" style={{fontSize:50}} /></Icon>
                    <Caption>Profil</Caption>
                </ListItem>

                <ListItem>
                    <Icon><FontAwesomeIcon icon={faListOl} color="#FF8E00" style={{fontSize:50}} /></Icon>
                    <Caption>Plan</Caption>
                 </ListItem>

                <ListItem>
                    <Icon><FontAwesomeIcon icon={faUsers} color="#FF8E00" style={{fontSize:50}} /></Icon>
                    <Caption>Znajomi</Caption>
                </ListItem>

                <ListItem>
                    <Icon><FontAwesomeIcon icon={faChartBar} color="#FF8E00" style={{fontSize:50}} /></Icon>
                    <Caption>Wykresy</Caption>
                </ListItem>

                <ListItem>
                    <Icon><FontAwesomeIcon icon={faStar} color="#FF8E00" style={{fontSize:50}} /></Icon>
                    <Caption>Rekordy</Caption>
                </ListItem>

                <Link to="/measurements" className="box__item">
                    <Icon><FontAwesomeIcon icon={faRuler} color="#FF8E00" style={{fontSize:50}} /></Icon>
                    <Caption>Wymiary ciała</Caption>
                </Link>
            </MenuList>
            {/* <button className="button__logout" onClick={this.logout}>Wyloguj</button> */}
        </MenuComponent>
    )
}

export default Menu;

