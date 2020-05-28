import React from 'react';
import styled from "styled-components";
import { flexCenter, FlexComponent } from "../../Components/styleHelpers";

const Container = styled.div`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    padding: .5em;
`

const StyledWrapper = styled(FlexComponent)`
    width: auto;
    padding: 0;
`
const Image = styled.div`
    position: relative;
    border-radius: 50%;
    width: 3.5em;
    height: 3.5em;
    background-image: url(${props => props.url});
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
    background-color: ${props => props.isLogged ? "green" : "red"};
    border-radius: 50%;
`

const FriendBoxItem = ({ user, handleConversation }) => {
    return (
        <Container onClick={() => handleConversation(user)}>
            <StyledWrapper>
                <Image url={user.url}/>
                <Nick> {user.nick} </Nick>
            </StyledWrapper>
            <LogDot isLogged={user.isLogged} />
        </Container>
    )
}

export default FriendBoxItem;