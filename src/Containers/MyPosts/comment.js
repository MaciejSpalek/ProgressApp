import React from "react";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers';
import Helpers from "../../Components/helpers";

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.div`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
`
const TopBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    position: relative; 
    width: 100%;
    padding: .3em;
`
const DescriptionWrapper = styled.div`
    ${flexCenter};
    align-items: flex-start;
    flex-direction: column;
`
const Image = styled.div`
    border-radius: 50%;
    width: 2.5em;
    height: 2.5em;
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
    width: 100%;
    color: white;
    text-align: left;
    border-bottom: .1em solid ${variables.$grayBlue};
    padding: .5em;
`

const Comment = ({data}) => {
    return (
        <Container>
            <TopBox>
                <Image style={{backgroundImage: `url(${data.url})`}}></Image>
                <DescriptionWrapper>
                    <Nick> { Helpers.capitalizeFirstLetter(data.nick) }</Nick>
                    <Date> {data.date} </Date>
                </DescriptionWrapper>
            </TopBox>
            <ContentBox>
                { data.content }
            </ContentBox>
        </Container>
    )
}

export default Comment;