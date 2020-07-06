import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { variables, flexCenter, RWD }  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const activeStyle = {
    "backgroundColor": "black"
}

const StyledNavLink = styled(NavLink)` 
    text-decoration: none;
    transition: .2s linear;
    &:hover { background-color: rgba(16, 24, 70, 0.801); }

    @media only screen and (min-width: ${RWD.$desktop}) {
        ${flexCenter};
        position: relative;
        width: auto;
        &:hover {
            background-color: transparent;
        } 
        &:hover::before {
            content: "ds";
            position: absolute;
            bottom: 0%;
            width: 100%;
            height: 3px;
            background-color: ${variables.$orange};
        }
    }
`
const Icon = styled(FontAwesomeIcon)`
    width: 1.5em;
    font-size: 50px;
    color: ${variables.$orange};
    @media only screen and (min-width: ${RWD.$desktop}) {
        font-size: 30px;
        width: 2.5em;
        margin-right: 5px;
    }
`

const ListItem = styled.li`
    ${flexCenter};
    justify-content: flex-start;
    text-decoration: none;
    padding: .5em;
`
const Caption = styled.p`
    font-size: 1.6em;
    font-weight: bold;
    color: white;
    @media only screen and (min-width: ${RWD.$desktop}) {
        font-size: 1em;
    }
`


const MenuItem = ({ route, iconName, caption, handleFunction  }) => {
    return (
        <StyledNavLink exact to={route} activeStyle={activeStyle} onClick={()=> handleFunction()}>
            <ListItem>
                <Icon 
                    icon={iconName} 
                />
                <Caption>{caption}</Caption>
            </ListItem>
        </StyledNavLink>
    )
}

export default MenuItem;