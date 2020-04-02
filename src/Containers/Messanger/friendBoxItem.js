import React from 'react';
import styled from "styled-components";
import { flexCenter, FlexWrapper } from "../../Components/styleHelpers";
import Helpers from "../../Components/helpers"

const Container = styled.div`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    padding: .3em;
`

const Image = styled.div`
    position: relative;
    border-radius: 50%;
    width: 3.5em;
    height: 3.5em;
    background-position: center;
    background-size: cover;
    margin-right: .5em;
`
const Nick = styled.div`
    color: black;
    font-size: 1em;
    font-weight: bold;
`

const LogDot = styled.span`
    width: .6em;
    height: .6em;
    background-color: red;
    border-radius: 50%;
`
const FriendBoxItem = ({ user, handleConversation }) => {
    
    return (
        <Container onClick={() => handleConversation(user)}>
            <FlexWrapper>
                <Image style={{backgroundImage: `url(${user.url})`}}></Image>
                <Nick> { Helpers.capitalizeFirstLetter(user.nick) }</Nick>
            </FlexWrapper>
            <LogDot style={user.isLogged ? {backgroundColor: "green"} : {backgroundColor: "red"}}></LogDot>
        </Container>
    )
}

export default FriendBoxItem;