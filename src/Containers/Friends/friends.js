import React, { Component } from "react";
import styled from "styled-components";
import { flexCenter, variables }  from "../../Components/styleHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import app from "../../Components/base";
import UserProfile from "./userProfile";
import FriendBoxItem from "./friendBoxItem";
import ArrowButton from "../../Components/arrowButton";


const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    justify-content: space-between;
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background-color: white;
    padding: .5em;
`
const TopBox = styled.div`
    width: 100%;
`
const SearchBox = styled.div`
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



const BottomBox = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    padding: .5em;

`
const ToggleBox = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
    padding-top: 1em;
`
const FriendBox = styled.div`
    width: 100%;
`
const Caption = styled.p`
    color: ${variables.$gray};
    font-size: 1.5em;
    font-weight: bold;
`



class Friends extends Component {
    constructor() {
        super();
        this.textInput = React.createRef();
        this.state = {
            constUsersArray: [],
            mutableUsersArray: [],
            friends: [],
            amountOfFriends: 0,
            isBottomBoxHide: true
        }
    }

    componentDidMount = () => {
        console.log("ComponentDidMount")
        app.getAllUsers((tempArray) => {
            this.setState({
                constUsersArray: tempArray
            })
        })
       
        app.getAllFriends((tempArray) => {
            this.setState({
                friends: tempArray
            })
        })
        app.countFriends((counter) => {
            this.setState({
                amountOfFriends: counter
            })
        })
    }

    componentDidUpdate() {
        app.getRealTimeDatabase().ref("users").on('child_changed', snapshot => {
            app.getAllFriends((tempArray) => {
                this.setState({
                    friends: tempArray
                })
            })
        });
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
                mutableUsersArray: tempUsersArray,
                isBottomBoxHide: true
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
                    user={user}
                    key = {index}
                />
            )
        })
    }

    renderUserFriends() {
        return this.state.friends.map((friend, index) => {
            return (
                <FriendBoxItem
                    user={friend}
                    key={index}
                />
            )
        })
    }

    handleArrowButton = () => {
        this.setState(prevstate => ({
            isBottomBoxHide: !prevstate.isBottomBoxHide
        }))

        if(this.state.isBottomBoxHide && this.textInput.current.value !== "") {
            this.textInput.current.value = "";
            this.setState({
                mutableUsersArray: []
            })
        }
    }

    render() {
        const { isBottomBoxHide, amountOfFriends } = this.state;
        return (
            <Container>
                <TopBox>
                    <SearchBox>
                        <Input placeholder="Szukaj znajomych..."  ref={this.textInput} onChange={(e)=> this.filterNicks(e)} />
                        <FontAwesomeIcon icon={faSearch} color={variables.$gray} style={{fontSize: "1.5em"}}/>
                    </SearchBox>
                    <ProfileBox>
                        {this.renderProfiles()}
                    </ProfileBox>
                </TopBox>
                <BottomBox>
                    <FriendBox>
                        {!isBottomBoxHide ? this.renderUserFriends() : null}
                    </FriendBox>
                    <ToggleBox>
                        <Caption>Znajomi ({amountOfFriends})</Caption>
                        <ArrowButton 
                            handleArrowButton={() => this.handleArrowButton()}
                            isHide={isBottomBoxHide}
                        />
                    </ToggleBox>
                </BottomBox>
            </Container>
        )
    }
}

export default Friends;