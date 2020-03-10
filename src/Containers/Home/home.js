import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components"
import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {} from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.section`
    ${flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 100%;
    background-color: ${variables.$blue};
    padding: 2em .5em 0 .5em;
    overflow-y: scroll;
`;

const Board = styled.textarea`
    ${flexCenter}
    width: 100%;
    height:200px;
    border-radius: .5em;
    border: none;
    background-color: white;
    color: black;
    padding: .5em;
    font-size: 1.2em;
    font-weight:bold;
    resize:none;
    &::placeholder {
        color: ${variables.$blue}
    }
`

class Home extends Component {
    render() {
        return (
            <Container>
               <Board type="text" placeholder="Co tam na treningu ?">

               </Board>
            </Container>
        )
    }
}

export default Home;