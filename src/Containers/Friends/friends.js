import React, { Component } from "react";
import styled from "styled-components";
import { flexCenter, variables, FlexWrapper }  from "../../Components/styleHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faTimes } from "@fortawesome/free-solid-svg-icons";
import app from "../../Components/base";
import UserProfile from "./userProfile";
import FriendBoxItem from "./friendBoxItem";
import ArrowButton from "../../Components/arrowButton";
import Cross from "../../Components/cross";


const Container = styled.div`
    ${flexCenter}
    flex-direction: column;
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background-color: white;
    /* padding: .5em; */
`

const MainBox = styled.div`
    ${flexCenter};
    justify-content: flex-end;
    flex-direction: column;
    width: 100%;
    height: 100%;
`

const SearchBox = styled.div`
    ${flexCenter};
    width: 100%;
    height:45px;
    padding: .2em .5em;
    border-bottom: .05em solid ${variables.$gray};
    background-color: ${variables.$blue};
`
const Input = styled.input`
    width: 100%;
    height: 100%;
    border: none;
    outline: none;
    font-size:1.3em;
    margin-right: .5em;
    background-color: ${variables.$blue};
`
const ProfileBox = styled.div`
    width: 100%;
    overflow-y: scroll;
`




const ToggleBox = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
    background-color: ${variables.$blue};
    padding: .5em;
`
const FriendBox = styled.div`
    width: 100%;
    padding: .5em;
`
const Caption = styled.p`
    color: ${variables.$gray};
    font-size: 1.5em;
    font-weight: bold;
`




const MessageWindow = styled.div`
    width: 100%;
    height: 100%;
`

const MessageWindowHeader = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
    padding: .5em;
    border-bottom: .15em solid ${variables.$gray};
`
const Nick = styled.p`
    color: ${variables.$grayBlue};
    font-size: 1.5em;
    font-weight: bold;
`
const Image = styled.div`
    position:relative;
    width:2.5em;
    height: 2.5em;
    background-position: center;
    background-size: cover;
    border-radius: 50%;
    margin-right: .5em;
`

const LogDot = styled.span`
    position: absolute;
    bottom: .02em;
    right:.02em;
    width: .8em;
    height: .8em;
    background-color: red;
    border-radius: 50%;
    border: .15em solid white;
`

const crossStyled = {
    color: `${variables.$grayBlue}`
}

class Friends extends Component {
    constructor() {
        super();
        // this.textInput = React.createRef();
        this.state = {
            constUsersArray: [],
            mutableUsersArray: [],
            friends: [],
            amountOfFriends: 0,
            isBottomBoxHide: false,
            inputText: "",

            isConversationOpen: false,
            isConversationUserLogged: false,
            conversationUsersNick: "",
            conversationUsersPhoto: ""
            
        }
    }

    componentDidMount = () => {
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
                inputText: inputValue
            }) 
        } else {
            this.setState({
                mutableUsersArray: [],
                inputText: inputValue
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


    renderFriends() {
        return this.state.friends.map((friend, index) => {
            return (
                <FriendBoxItem
                    user={friend}
                    key={index}
                    handleConversation={this.openConversation}
                />
            )
        })
    }

    handleArrowButton = () => {
        this.setState(prevstate => ({
            isBottomBoxHide: !prevstate.isBottomBoxHide
        }))
    }

    openConversation = (user) => {
        this.setState({
            isConversationOpen: true,
            conversationUsersNick: user.nick,
            isConversationUserLogged: user.isLogged,
            conversationUsersPhoto: user.url
        })
        
    }

    hideConversation = () => {
        this.setState({
            isConversationOpen: false
        })
    }

    render() {
        const { 
            inputText,
            isBottomBoxHide, 
            amountOfFriends, 
            isConversationOpen, 
            isConversationUserLogged, 
            conversationUsersNick, 
            conversationUsersPhoto, 
            
        } = this.state;

        const content = <>
                            <FriendBox>
                                {inputText == "" ? this.renderFriends(): null}
                            </FriendBox>
                            
                            <ProfileBox>
                                {this.renderProfiles()}
                            </ProfileBox>
                            
                            <SearchBox>
                                <Input placeholder="Szukaj znajomych..." onChange={(e)=> this.filterNicks(e)} />
                                <FontAwesomeIcon icon={faSearch} color={variables.$gray} style={{fontSize: "1.5em"}}/>
                            </SearchBox>
                        </>
        return (
            <Container>
                {!isConversationOpen ?
                <MainBox>
                    {!isBottomBoxHide ? content : null}
                    <ToggleBox>
                        <Caption> Znajomi ({amountOfFriends}) </Caption>
                        <ArrowButton 
                            handleArrowButton={() => this.handleArrowButton()}
                            isHide={isBottomBoxHide}
                        />
                    </ToggleBox>
                </MainBox> 
                :
                <MessageWindow>
                    <MessageWindowHeader>
                        <FlexWrapper>
                            <Image style={{backgroundImage: `url(${conversationUsersPhoto})`}}>
                                <LogDot style={isConversationUserLogged ? {backgroundColor: "green"} : {backgroundColor: "red"}}></LogDot>
                            </Image>
                            <Nick> {conversationUsersNick} </Nick>
                        </FlexWrapper>
                        <Cross 
                            handleClick={this.hideConversation}
                            styled={crossStyled}
                            fontSize={{fontSize: "2em"}}
                        />
                    </MessageWindowHeader>
                </MessageWindow>
                }
            </Container>
        )
    }
}

export default Friends;