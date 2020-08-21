import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { variables, flexCenter }  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const activeStyle = {
    "backgroundColor": "rgba(16, 24, 70, 0.801)"
}

const StyledNavLink = styled(NavLink)` 
    ${flexCenter};
    width: 100%;
    height: 100%;
    justify-content: flex-start;
    text-decoration: none;
    padding: .25em;

    @media only screen and (min-width: 1200px) {
        justify-content: center;
    }
`

const ListItem = styled.li`
    text-decoration: none;
    transition: .2s linear;
    &:hover { background-color: rgba(16, 24, 70, 0.801); }
    
    @media only screen and (min-width: 1200px) {
        ${flexCenter};
        position: relative;
        width: auto;
    }
`

const StyledIconWrapper = styled.span`
    width: 100px;
    @media only screen and (min-width: 1200px) {
        width: 3em;
    }
`

const Icon = styled(FontAwesomeIcon)`
    font-size: 60px;
    color: ${variables.$orange};
    @media only screen and (min-width: 1200px) {
        font-size: 40px;
    }
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
        <ListItem>
            <StyledNavLink exact to={route} activeStyle={activeStyle} onClick={()=> handleFunction()}>
                <StyledIconWrapper>
                    <Icon icon={iconName} />
                </StyledIconWrapper>
                <Caption>{caption}</Caption>
            </StyledNavLink>
        </ListItem>
    )
}

export default MenuItem;