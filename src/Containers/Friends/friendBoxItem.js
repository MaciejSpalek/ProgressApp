import React from 'react';
import styled from "styled-components";
import { variables, flexCenter } from "../../Components/styleHelpers";
import Helpers from "../../Components/helpers"

const Container = styled.div`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    border-bottom: .1em solid ${variables.$gray};
    padding: .3em;
`
const DataWrapper = styled.div`
    ${flexCenter};
`
const Image = styled.div`
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
const FriendBoxItem = ({ user }) => {
    return (
        <Container>
            <DataWrapper>
                <Image style={{backgroundImage: `url(${user.url})`}}></Image>
                <Nick> { Helpers.capitalizeFirstLetter(user.nick) }</Nick>
            </DataWrapper>
        </Container>
    )
}

export default FriendBoxItem;