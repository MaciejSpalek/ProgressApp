import React, { Component } from "react";
import styled from "styled-components"
import ShareBox from "../../Components/shareBox";
import PostBoard from "../MyPosts/postBoard";
import * as styleHelpers  from '../../Components/styleHelpers'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {} from '@fortawesome/free-solid-svg-icons'


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


class Home extends Component {
    render() {
        return (
            <Container>
                <ShareBox/>
                <PostBoard/>
            </Container>
        )
    }
}

export default Home;