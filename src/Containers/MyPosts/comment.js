import React from "react";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers';
import Helpers from "../../Components/helpers";
import relativeTime from'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import 'dayjs/locale/pl';

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
    background-image: url(${props => props.url});
    background-position: center;
    background-size: cover;
    margin-right: .5em;
`
const Nick = styled.div`
    font-size: 1em;
    font-weight: bold;
`
const Date = styled.span`
    font-size: .8em;   
`
const ContentBox = styled.div`
    width: 100%;
    text-align: left;
    border-bottom: .05em solid ${variables.$lightGray};
    padding: .5em;
`

const Comment = ({data}) => {
    dayjs.locale("pl")
    dayjs.extend(relativeTime);
    return (
        <Container>
            <TopBox>
                <Image url={data.url}/>
                <DescriptionWrapper>
                    <Nick> { Helpers.capitalizeFirstLetter(data.nick) }</Nick>
                    <Date> {dayjs(data.date).fromNow()} </Date>
                </DescriptionWrapper>
            </TopBox>
            <ContentBox>
                { data.content }
            </ContentBox>
        </Container>
    )
}

export default Comment;