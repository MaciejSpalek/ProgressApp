import React from 'react';
import styled from 'styled-components';
import { flexCenter } from "../../Components/styleHelpers";
import Image from '../../Components/image';
import OnlineDot from '../../Components/onlineDot';

const imageCaptionStyle = {
    "color": "black",
    "fontSize": "1em",
    "fontWeight": "bold",
    "marginLeft": ".5em"
}

const Container = styled.li`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    padding: .5em;
    cursor: pointer;
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
            <OnlineDot 
                isLogged={user.isLogged}
                position={"static"}
                dotBorder={"0"}
                size={".6em"}
            />
        </Container>
    )
}

export default FriendBoxItem;