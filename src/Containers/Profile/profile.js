import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components"
import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret, faImages, faPenSquare, faCameraRetro } from '@fortawesome/free-solid-svg-icons'

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.section`
    ${flexCenter}
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 100%;
    background-color: ${variables.$grayBlue};
    padding: .5em;
    overflow-y: scroll;
`
const Wrapper = styled.div`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    width: 280px;
    height: 500px;
    /* border: .2em solid ${variables.$blue}; */
    box-shadow: 0 .5em .5em .1em black;
    border-radius: .5em;
`
const PhotoBox = styled.section`
    ${flexCenter}
    position: relative;
    width: 100%;
    flex: 1;
    background-color: ${variables.$blue};
    border-top-right-radius: .5em;
    border-top-left-radius: .5em;
`
const InfoBox = styled.section`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    position: relative;
    width: 100%;
    flex:1;
    background-color: ${variables.$darkBlue };
    border-bottom-right-radius: .5em;
    border-bottom-left-radius: .5em;
    padding: 0 .5em;
`

const Nick = styled.span`
    position:absolute;
    bottom: .5em;
    left: .5em;
    font-size: 1.5em;
    font-weight: bold;
    color: white;
    line-height:1;
`

const ButtonBox = styled.div`
    ${flexCenter}
    justify-content: flex-end;
    width: 100%;
    border-bottom: .2em solid ${variables.$blue};
    padding: .1em;
`
const Input = styled.input`
    grid-gap: 0;
    width: 80%;
    border-radius: .2em;
    height: 35px;
    font-size: 1em;
    font-weight: bold;
    border-radius: 0.2em;
    border: none;
    margin: 0 auto;
    padding: 0 .3em;
    &::placeholder {
        color: ${variables.$blue};
        font-weight: 100;
    }

`
const AddBox = styled.div`
    display:grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(4, 1fr);
    width: 100%;
    height: 100%;
    padding: .5em;
`



class Profile extends Component {
    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
    render() {
        return (
            <Container>
                <Wrapper>
                    <PhotoBox>
                        <FontAwesomeIcon icon={faUserSecret} style={{fontSize: 150}} color={variables.$darkBlue} />
                        <Nick> {app.getCurrentUser() ? this.capitalizeFirstLetter(app.getCurrentUser().displayName) : null} </Nick>
                    </PhotoBox>
                    <InfoBox>
                        <ButtonBox>
                            <FontAwesomeIcon icon={faCameraRetro} style={{fontSize: 40, margin: '.1em'}} color={variables.$orange} />
                            <FontAwesomeIcon icon={faImages} style={{fontSize: 40, margin: '.1em'}} color={variables.$orange}/>
                            <FontAwesomeIcon icon={faPenSquare} style={{fontSize: 40, margin: '.1em'}} color={variables.$orange} />
                        </ButtonBox>
                        <AddBox>
                            <Input placeholder="staż tren."></Input>
                            <Input placeholder="wiek"></Input>
                            <Input placeholder="waga"></Input>
                            <Input placeholder="wzrost"></Input>
                            <Input placeholder="sport"></Input>
                        </AddBox>
                    </InfoBox>
                </Wrapper>
            </Container>
        )
    }
}

export default Profile;