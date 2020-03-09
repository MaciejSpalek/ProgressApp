import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components"
import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.section`
    ${flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 100%;
    background-color: ${variables.$blue};
    padding: 2em .5em 0 .5em;
    overflow-y: scroll;
`;

const Photo = styled.section`
    ${flexCenter}
    width: 15em;
    height: 15em;
    border: .3em solid ${variables.$grayBlue};
    border-radius: 50%;
`

const Nick = styled.span`
    font-size: 2em;
    font-weight: bold;
    color: white;
    
`

class Profile extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <Container>
                <Photo>
                    <FontAwesomeIcon icon={faUserSecret} style={{fontSize: 150}} color={variables.$darkBlue} />
                </Photo>
                <Nick> {app.getCurrentUser() ? this.capitalizeFirstLetter(app.getCurrentUser().displayName) : null} </Nick>
            </Container>
        )
    }
}

export default Profile;