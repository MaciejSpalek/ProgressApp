import React from 'react';
import styled from "styled-components";
import { flexCenter } from "../../Components/styleHelpers";
import Image from '../../Components/image';


const imageCaptionStyle = {
    "color": "black",
    "fontSize": "1em",
    "fontWeight": "bold",
    "marginLeft": ".5em"
}

const Container = styled.div`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    padding: .5em;
    cursor: pointer;
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
            <Image 
                height={"3.5em"}
                width={"3.5em"}
                url={user.url}
                alt={user.nick}
                figCaption={user.nick}
                figCaptionStyle={imageCaptionStyle}
            />
            <LogDot isLogged={user.isLogged} />
        </Container>
    )
}

export default FriendBoxItem;