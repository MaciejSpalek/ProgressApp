import React from "react"
import Hamburger from "./hamburger"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine } from '@fortawesome/free-solid-svg-icons'
import * as styleHelpers  from '../../Components/styleHelpers'
import styled from 'styled-components';


const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;
const Nav = styled.div`
    ${flexCenter};
    justify-content: space-between;
    padding: .2em .5em;
    color: white;
    background-color: ${variables.$darkBlue};
    height: 4em;
    font-size: 1em;
`;

const Logo = styled.div`
    ${flexCenter};
`;

const Title = styled.span`
    font-size: 1.8em;
    font-weight: bold;
`;


const Navbar = () => {
    return (
        <Nav >
            <Logo>
                <FontAwesomeIcon icon={faChartLine} color="#FF8E00" style={{fontSize:30}} />
                <Title> ProgressApp </Title>
            </Logo>
            <Hamburger/>
        </Nav>
    );
}

export default Navbar;

