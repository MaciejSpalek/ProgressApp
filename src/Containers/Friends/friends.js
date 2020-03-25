import React, { Component } from "react";
import styled from "styled-components";
import {flexCenter, variables }  from '../../Components/styleHelpers';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import app from "../../Components/base";
import UserProfile from "./userProfile";

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
    font-size:1.3em;
    margin-right: .5em;
`
const ProfileBox = styled.div`
    width: 100%;
    padding: .5em;
    overflow-y: scroll;
`

class Friends extends Component {
    constructor() {
        super();
        this.state = {
            constUsersArray: [],
            mutableUsersArray: []
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
                usersArray.push(users[user]);
            }
            this.setState({
                constUsersArray: usersArray
            })
        })
    }
    
    // return true if find some nick match with inputText
    isInputTextMatch(inputText, nick) {
        const regex = new RegExp(`^${inputText}`, "i");
        return regex.test(nick)
    }
    // function invokes onChange event and set mutableNicksArray, which stores nicks beginning on letters pass by input
    filterNicks(e) {
        const inputValue = e.target.value;
        const tempUsersArray = [];
        this.state.constUsersArray.forEach(user => {
            if(this.isInputTextMatch(inputValue, user.nick)) {
                tempUsersArray.push(user);
            }
        })
        if(inputValue !== "") {
            this.setState({
                mutableUsersArray: tempUsersArray
            }) 
        } else {
            this.setState({
                mutableUsersArray: []
            }) 
        }
          
    }

    renderProfiles() {
      return this.state.mutableUsersArray.map((user, index) => {
          return (
            <UserProfile
                nick = {user.nick}
                url = {user.url}
                key = {index}>
            </UserProfile>
          )
      })
    }
    render() {
        return (
            <Container>
                <SearchBox>
                    <Input placeholder="Szukaj znajomych..." onChange={(e)=> this.filterNicks(e)}/>
                    <FontAwesomeIcon icon={faSearch} color={variables.$gray} style={{fontSize: "1.5em"}}/>
                </SearchBox>
                <ProfileBox>
                    {this.renderProfiles()}
                </ProfileBox>
            </Container>
        )
    }
}

export default Friends;