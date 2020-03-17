import React from "react";
import app from "../../Components/base";
import styled from "styled-components";

import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import {   } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    border-radius: .5em;
    background-color: ${variables.$grayBlue};
    padding: .5em;
    margin: 2em 0;
`
const TopBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    width: 100%;
    border-bottom: .15em solid ${variables.$darkBlue};
`

const ContentBox = styled.div`
    width: 100%;
`

const BottomBox = styled.div`
`

const Image = styled.div`
    border-radius: 50%;
    border: .3em solid ${variables.$grayBlue};
    width: 3em;
    height: 3em;
    background-position: center;
    background-size: cover;
`
const Nick = styled.div`
    color: white;
    font-size: 1.5em;
`

const Post = ({ url, nick, content }) => {
    return (
        <Container>
            <TopBox>
                <Image style={{backgroundImage: `url(${url})`}}></Image>
                <Nick> { nick }</Nick>
            </TopBox>
            <ContentBox>
                { content }
            </ContentBox>
            {/* <BottomBox>

            </BottomBox> */}
        </Container>
    )
}

export default Post;