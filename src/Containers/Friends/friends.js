import React, { Component } from "react";
import styled from "styled-components";
import {flexCenter, variables }  from '../../Components/styleHelpers';
import Helpers from "../../Components/helpers.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import app from "../../Components/base";


const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background-color: white;
    padding: .5em;
`
const SearchBox = styled.form`
    ${flexCenter};
    width: 100%;
    height:45px;
    padding: .2em .5em;
    border-radius: .5em;
    border: .1em solid ${variables.$gray};
`

const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    margin-right: .5em;
`
const ProfileBox = styled.div`
    width: 100%;
    padding: .5em;
`

class Friends extends Component {
    constructor() {
        super();
        this.state = {
            usersNicks: []
        }
    }

    componentDidMount() {
        this.getNicks()
    }
    getNicks() {
        const usersRef = app.getRealTimeDatabase().ref("users");
        usersRef.on('value', snapshot => {
            const users = snapshot.val();
            const usersArray = [];
            for(let user in users) {
                const userNick = users[user].nick; 
                usersArray.push(userNick);
            }
            this.setState({
                usersNicks: usersArray
            })
        })
    }
    render() {
        console.log(this.state.usersNicks)
        return (
            <Container>
                <SearchBox>
                    <Input placeholder="Szukaj znajomych..." />
                    <FontAwesomeIcon icon={faSearch} color={variables.$gray} style={{fontSize: "1.5em"}}/>
                </SearchBox>
                <ProfileBox>
                    
                </ProfileBox>
            </Container>
        )
    }
}

export default Friends;