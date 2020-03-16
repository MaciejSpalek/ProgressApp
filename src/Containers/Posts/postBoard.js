import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components";

import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;


const Container = styled.div`
    width: 100%;
`


class PostBoard extends Component {
    constructor() {
        this.state = {
            
        }
    }

    renderPosts() {

    }

    render() {
        return (
            <Container>
                {this.renderPosts()}
            </Container>
        )
    }
}

export default PostBoard;