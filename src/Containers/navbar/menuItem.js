import React from './node_modules/react';
import styled from './node_modules/styled-components'
import { NavLink } from './node_modules/react-router-dom';
import { variables, flexCenter }  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from './node_modules/@fortawesome/react-fontawesome'

const activeStyle = {
    "backgroundColor": "black"
}

const StyledNavLink = styled(NavLink)` 
    text-decoration: none;
    transition: .2s linear;
    &:hover { background-color: rgba(16, 24, 70, 0.801); }

    @media only screen and (min-width: 1200px) {
        ${flexCenter};
        position: relative;
        width: auto;
        &:hover {
            background-color: transparent;
        } 
        &:hover::before {
            content: "";
            position: absolute;
            bottom: 0%;
            width: 100%;
            height: 3px;
            background-color: ${variables.$orange};
        }
    }
`


const StyledIconWrapper = styled.div`
    @media only screen and (max-width: 1200px) {
        width: 3.5em;
        margin: .5em 1em;
    }
`

const Icon = styled(FontAwesomeIcon)`
    width: 1.5em;
    font-size: 60px;
    color: ${variables.$orange};
    @media only screen and (min-width: 1200px) {
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
    @media only screen and (min-width: 1200px) {
        font-size: 1em;
    }
`


const MenuItem = ({ route, iconName, caption, handleFunction  }) => {
    return (
        <StyledNavLink exact to={route} activeStyle={activeStyle} onClick={()=> handleFunction()}>
            <ListItem>
                <StyledIconWrapper>
                    <Icon icon={iconName} />
                </StyledIconWrapper>
                <Caption>{caption}</Caption>
            </ListItem>
        </StyledNavLink>
    )
}

export default MenuItem;