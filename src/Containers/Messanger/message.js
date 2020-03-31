import React from "react";
import styled from "styled-components";
import { flexCenter, variables, FlexWrapper }  from "../../Components/styleHelpers";
import app from '../../Components/base';


const Container = styled.div`
    ${flexCenter}
    align-self: flex-end;
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
const isUser = (userID) => {
    return userID === app.getUserID();
}

const Message = ({userID, text}) => {
    return (
        <Container style={isUser(userID) ? userStyle : converserStyle}>
            {text}
        </Container>
    )
}

export default Message;