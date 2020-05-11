import React from 'react';
import styled from 'styled-components'
import { NavLink } from 'react-router-dom';
import { variables, flexCenter }  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const activeStyle = {
    "backgroundColor": "black"
}

const StyledNavLink = styled(NavLink)` 
    text-decoration: none;
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
const Caption = styled.p`
    font-size: 1.6em;
    font-weight: bold;
    color: white;
`


const MenuItem = ({ route, iconName, caption, handleFunction  }) => {
    return (
        <StyledNavLink exact to={route} activeStyle={activeStyle} onClick={()=> handleFunction()}>
            <ListItem>
                <FontAwesomeIcon 
                    icon={iconName} 
                    style={{ fontSize:50, width: "1.5em", color: variables.$orange }} 
                />
                <Caption>{caption}</Caption>
            </ListItem>
        </StyledNavLink>
    )
}

export default MenuItem;