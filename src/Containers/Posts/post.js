import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components";

import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {   } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    border-radius: .5em;
    padding: .5em;
`
const TopBox = styled.div`

`
const ContentBox = styled.div`

`
const BottomBox = styled.div`

`
const Image = styled.div`
    border-radius: 50%;
    width: 5em;
    height: 5em;
`
const Nick = styled.div`
`

const Post = () => {
    return (
        <Container>
            <TopBox>
                <Image></Image>
                <Nick></Nick>
            </TopBox>
            <ContentBox>

            </ContentBox>
            <BottomBox>

            </BottomBox>
        </Container>
    )
}

export default Post;