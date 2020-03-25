import React from "react";
import styled from "styled-components";
import Helpers from "../../Components/helpers"
import { variables, flexCenter } from "../../Components/styleHelpers";

const Container = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    width: 100%;
    border-bottom: .1em solid ${variables.$gray};
    padding: .3em;
`

const Image = styled.div`
    border-radius: 50%;
    width: 3.5em;
    height: 3.5em;
    background-position: center;
    background-size: cover;
    background-color: ${variables.$blue};
    margin-right: .5em;
`
const Nick = styled.div`
    color: black;
    font-size: 1em;
    font-weight: bold;
`

const UserProfile = ({ nick, url }) => {
    return (
        <Container>
            <Image style={{backgroundImage: `url(${url})`}}></Image>
            <Nick> { Helpers.capitalizeFirstLetter(nick) }</Nick>
        </Container>
    )
}

export default UserProfile