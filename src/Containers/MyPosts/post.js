import React from "react";
import app from "../../Components/base";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faDumbbell, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;





const Container = styled.div`
    ${flexCenter}
    background-color: rgb(0, 111, 175);
    flex-direction: column;
    width: 100%;
    border-radius: .2em;
    /* padding: .5em; */
    margin: 1em 0;
`




const TopBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    width: 100%;
    background-color: ${variables.$grayBlue};
    /* border-bottom: .1em solid ${variables.$grayBlue}; */
    padding: .3em;
`
const DescriptionWrapper = styled.div`
    ${flexCenter};
    align-items: flex-start;
    flex-direction: column;
`
const Image = styled.div`
    border-radius: 50%;
    width: 3.5em;
    height: 3.5em;
    background-position: center;
    background-size: cover;
    background-color: ${variables.$blue};
    margin-right: .5em;
`
const Nick = styled.div`
    color: white;
    font-size: 1em;
    font-weight: bold;
`
const Date = styled.span`
    color: white;
    font-size: .8em;   
`




const ContentBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    width: 100%;
    color: white;
    text-align: left;
    padding: .5em;
`




const BottomBox = styled.div`
    ${flexCenter};
    width: 100%;
    justify-content: flex-start;
`
const IconBox = styled.div`
    ${flexCenter};
    margin-right: 1em;
    padding: .3em;
`
const IconCaption = styled.span`
    color: white;
    font-size: 1em;
    font-weight: bold;
`





const capitalizeFirstLetter = (string) => {
    if(typeof string !== "undefined") {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}
const Post = ({ url, nick, content, date }) => {
    return (
        <Container>
            <TopBox>
                <Image style={{backgroundImage: `url(${url})`}}></Image>
                <DescriptionWrapper>
                    <Nick> { capitalizeFirstLetter(nick) }</Nick>
                    <Date> {date} </Date>
                </DescriptionWrapper>
            </TopBox>
            <ContentBox>
                { content }
            </ContentBox>
            <BottomBox>
                <IconBox>
                    <FontAwesomeIcon icon={faThumbsUp} style={{fontSize: 25, margin: '.2em'}} color={variables.$orange} />
                    <IconCaption>Like</IconCaption>
                </IconBox>
                <IconBox>
                    <FontAwesomeIcon icon={faComment} style={{fontSize: 25, margin: '.2em'}} color={variables.$orange} />
                    <IconCaption>Komentarz</IconCaption>
                </IconBox>
            </BottomBox>
        </Container>
    )
}

export default Post;