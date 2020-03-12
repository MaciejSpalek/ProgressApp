import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components"
import classNames from "classnames";
import * as styleHelpers  from '../../Components/styleHelpers'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserSecret, faImages, faPenSquare, faCameraRetro, faUser, faExternalLinkSquareAlt } from '@fortawesome/free-solid-svg-icons'

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
const ProfileCard = styled.div`
    ${flexCenter};
    position: relative;
    width: 280px;
    height: 500px;
`



const Frontside = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    height: 100%;
    border-radius: .5em;
    transition: .3s linear;
    transform-origin: center;
    z-index: 1;
    backface-visibility: hidden;
    box-shadow: 0 .2em .5em .1em black;
`
const Backside = styled.div`
    ${flexCenter};
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    border-radius: .5em;
    transition: .3s linear;
    transform-origin: center;
    transform:  rotateY(180deg);
    z-index: -1;
    box-shadow: 0 .5em .5em .1em black;
`
const PhotoBox = styled.section`
    ${flexCenter}
    position: relative;
    width: 100%;
    flex: 1;
    background-color: ${variables.$blue};
    border-top-right-radius: .5em;
    border-top-left-radius: .5em;
    transition: .5s linear;
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
    background-color: ${variables.$darkBlue};
    border-radius: .5em;
`



const AddBox = styled.div`
    display:grid;
    grid-template-columns: repeat(1, 1fr);
    grid-gap: .5em;
    width: 100%;
    border-bottom-right-radius: .5em;
    border-bottom-left-radius: .5em;
    padding: .5em;
`
const Input = styled.input`
    grid-gap: 0;
    width: 100%;
    height: 35px;
    font-size: 1em;
    font-weight: bold;
    border-radius: 0.2em;
    background-color: white;
    border: none;
    padding: 0 .3em;
    color: ${variables.$grayBlue};
    &::placeholder {
        color: ${variables.$blue};
        font-weight: 100;
    }

`


class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditButtonActive: false
        }
    }

    capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    editButtonHandle() {
        this.setState(prevState => ({
            isEditButtonActive: !prevState.isEditButtonActive
        }))
    }
    render() {
        const { isEditButtonActive } = this.state;
        const frontActive = {
            transform:  "rotateY(360deg)",
            zIndex: 1
        }
        const backActive = {
            transform: "rotateY(180deg)"
        }
       
        return (
            <Container>
                <ProfileCard>
                    <Frontside style={isEditButtonActive ? backActive : null}>
                        <PhotoBox>
                            <FontAwesomeIcon icon={faUser} style={{fontSize: 150}} color={variables.$darkBlue} />
                            <Nick> {app.getCurrentUser() ? this.capitalizeFirstLetter(app.getCurrentUser().displayName) : null} </Nick>
                        </PhotoBox>
                        <ButtonBox>
                            <FontAwesomeIcon icon={faCameraRetro} style={{fontSize: 35, margin: '.1em'}} color={variables.$orange} />
                            <FontAwesomeIcon icon={faImages} style={{fontSize: 35, margin: '.1em'}} color={variables.$orange}/>
                            <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{fontSize: 35, margin: '.1em'}} color={variables.$orange}  onClick={this.editButtonHandle.bind(this)}/>
                        </ButtonBox>
                    </Frontside>
                    <Backside style={isEditButtonActive ? frontActive : null}>
                        <ButtonBox style={{borderBottomLeftRadius: 0, borderBottomRightRadius: 0}}>
                            <FontAwesomeIcon icon={faPenSquare} style={{fontSize: 35, margin: '.1em'}} color={variables.$orange}/>
                            <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{fontSize: 35 , margin: '.1em'}} color={variables.$orange}  onClick={this.editButtonHandle.bind(this)}/>
                        </ButtonBox>
                        <AddBox>
                            <Input placeholder="staż tren."></Input>
                            <Input placeholder="wiek"></Input>
                            <Input placeholder="waga"></Input>
                            <Input placeholder="wzrost"></Input>
                            <Input placeholder="sport"></Input>
                            <Input placeholder="płeć"></Input>

                            {/* <Input placeholder="..."></Input>
                            <Input placeholder="..."></Input> */}
                        </AddBox> 
                    </Backside>
                </ProfileCard>
            </Container>
        )
    }
}

export default Profile;