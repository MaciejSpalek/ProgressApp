import React, {useState} from "react";
import styled from "styled-components";
import { flexCenter, variables }  from "../../Components/styleHelpers";
import app from '../../Components/base';

const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    align-self: flex-start;
`

const Date = styled.p`
    margin-right: .3em;
    align-self: flex-start;
    color: ${variables.$gray};
    background-color: ${variables.$blue};
    border-radius: .5em;
    font-size: .8em;
    padding: .5em;
`


const ContentWrapper = styled.div`
    ${flexCenter}
    width: auto;
    padding: .5em;
    margin: .3em 0;
    border-radius: .5em;
`

const converserStyle = {
    "alignSelf": "flex-start",
    "color": "black",
    "backgroundColor": variables.$blue
}

const userStyle = {
    "alignSelf": "flex-end",
    "color": "white",
    "backgroundColor": variables.$grayBlue
}

const containerStyle = {
    "alignSelf": "flex-end"
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