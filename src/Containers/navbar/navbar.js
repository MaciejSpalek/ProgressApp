import React from "react"
import Hamburger from "./hamburger"
import Menu from "./menu"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChartLine, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import * as styleHelpers  from '../../Components/styleHelpers'
import styled from 'styled-components';


const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;
const Nav = styled.div`
    position: fixed;
    ${flexCenter};
    justify-content: space-between;
    padding: .2em .5em;
    color: white;
    background-color: ${variables.$darkBlue};
    width: 100%;
    height: 64px;
    font-size: 1em;
    z-index: 999999;
`;

const Logo = styled.div`
    ${flexCenter};
`;

const Title = styled.span`
    font-size: 1.8em;
    font-weight: bold;
`;

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.handleHamburger = this.handleHamburger.bind(this)
        this.state = {
            isMenuActive: false
        }
    }
    
    handleHamburger = () => {
        this.setState(prevstate => ({
            isMenuActive: !prevstate.isMenuActive
        }))
    }
    render() {
        return (
            <Nav >
                <Logo>
                    <FontAwesomeIcon icon={faChartLine} color="#FF8E00" style={{fontSize:30}} />
                    <Title> ProgressApp </Title>
                </Logo>
                {/* <Hamburger onClick={handler}/> */}
                <FontAwesomeIcon 
                    icon={!this.state.isMenuActive ? faBars: faTimes} 
                    color="#FF8E00" 
                    style={!this.state.isMenuActive ? {fontSize:40, transition: ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"} : {fontSize: 50, transition: ".4s cubic-bezier(0.785, 0.135, 0.15, 0.86)"}} 
                    onClick={this.handleHamburger}
                />
                <Menu isMenuActive={this.state.isMenuActive}/>
            </Nav>
        );
    }
}

export default Navbar;

