import React, {useState} from "react";
import styled from "styled-components";
import app from '../../base';
import { flexCenter, variables }  from "../../Components/styleHelpers";

const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    align-self: flex-start;
`

const Date = styled.p`
    align-self: flex-start;
    color: ${variables.$gray};
    border-radius: .5em;
    font-size: .8em;
    padding: 0 .5em;
`


const ContentWrapper = styled.div`
    padding: .5em;
    margin: .3em 0;
    border-radius: .5em;
    text-align: left;

    -ms-word-break: break-all;
    word-break: break-all;
    word-break: break-word;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
`

const converserStyle = {
    "alignSelf": "flex-start",
    "color": "black",
    "backgroundColor": variables.$lightGray
}

const userStyle = {
    "alignSelf": "flex-end",
    "textAlign": "right",
    "color": "white",
    "backgroundColor": variables.$grayBlue
}

const containerStyle = {
    "alignSelf": "flex-end",
}

const dateStyle = {
    "alignSelf": "flex-end"
}
const Message = ({userID, text, date}) => {
    const [isDateShow, changeDateState] = useState(false)
    const isUser = (userID) => {
        return userID === app.getUserID();
    }
    
    return (
        <Container style={isUser(userID) ? containerStyle : null} onClick={() => changeDateState(!isDateShow)}>
            <ContentWrapper style={isUser(userID) ? userStyle : converserStyle}> { text } </ContentWrapper>
            {isDateShow ? <Date style={isUser(userID) ? dateStyle : null}> {date} </Date> : null}
        </Container>
    )
}

export default Message;