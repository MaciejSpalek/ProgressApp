import React from "react";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers';
import Helpers from "../../Components/helpers";
import relativeTime from'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import 'dayjs/locale/pl';
import { Link } from "react-router-dom";

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;


const linkStyles = {
    "display": "flex",
    "justifyContent": "flexStart",
    "position": "relative",
    "width": "100%",
    "padding": ".3em",
    "textDecoration": "none",
    "color": "black"
}
const Container = styled.div`
    ${flexCenter};
    flex-direction: column;
    width: 100%;
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

const Comment = ({data:{nick, url, content, date}}) => {
    dayjs.locale("pl")
    dayjs.extend(relativeTime);
    return (
        <Container>
            <Link style={linkStyles} to={`/${nick}`}>
                <Image url={url}/>
                <DescriptionWrapper>
                    <Nick> { Helpers.capitalizeFirstLetter(nick) }</Nick>
                    <Date> {dayjs(date).fromNow()} </Date>
                </DescriptionWrapper>
            </Link>
            <ContentBox>
                { content }
            </ContentBox>
        </Container>
    )
}

export default Comment;