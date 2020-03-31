import React, { Component } from "react";
import styled from "styled-components";
import { flexCenter, variables, FlexWrapper }  from "../../Components/styleHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
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
    height: 45px;
    padding: .2em .5em;
    border-bottom: .05em solid ${variables.$gray};
    background-color: ${variables.$blue};
`

const Input = styled.input`
    width: 100%;
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
    ${flexCenter};
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    height: 100%;
`
const MessageWindowHeader = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
    padding: .5em;
    border-bottom: .05em solid ${variables.$blue};
    
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

const MessageWindowContent = styled.div`
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding: .5em;
`

const FormBox = styled.form`
    ${flexCenter};
    width: 100%;
    height: 45px;
    padding: .2em .5em;
    border-bottom: .05em solid ${variables.$gray};
    background-color: ${variables.$blue};
`


const crossStyled = {
    color: `${variables.$gray}`
}

class Messanger extends Component {
    constructor() {
        super();
        this.state = {
            constUsersArray: [],
            mutableUsersArray: [],
            friends: [],
            amountOfFriends: 0,
            isBottomBoxHide: false,
            inputText: "",

            isConversationOpen: false,
            isConversationUserLogged: false,
            converserNick: "",
            converserPhotoURL: "",
            converserID: ""
            
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

        e.preventDefault();
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
            converserNick: user.nick,
            isConversationUserLogged: user.isLogged,
            converserPhotoURL: user.url,
            converserID: user.userID
        })
        
    }

    hideConversation = () => {
        this.setState({
            isConversationOpen: false
        })
    }

    renderMessages() {

    }

    isConversationExist(conversations, firstUserID, secondUserID) {
        let isConversationExist = false;
        if(conversations !== null) {
            for(let conv in conversations) {
                const contributors = conv.split("-")
                if(contributors.includes(firstUserID) && contributors.includes(secondUserID)) {
                    isConversationExist = true;
                } 
            }
        }
        return isConversationExist;
    }
    
    sendMessage = (e) => {
        e.preventDefault();
        const { input } = e.target.elements;
        const userID = app.getUserID(); 
        const converserID = this.state.converserID; // your friends' ID from state
        
        const messagesRef = app.getRealTimeDatabase().ref("messages");
        const yourMessage = {
            user: userID,
            text: input.value
        }

        messagesRef.once('value', snapshot=> {
            const conversations = snapshot.val();
            console.log("Konwersacje: ", conversations)
            console.log(userID, converserID)
            if(this.isConversationExist(conversations, userID, converserID)) {
                console.log(`Konwersacja istnieje między: ${userID}, a ${converserID}`)
                for(let conversation in conversations) {
                    const contributors = conversation.split("-")

                    // if you created conversation
                    if(contributors[0] === userID && contributors[1] === converserID) {
                        messagesRef.child(`${userID}-${converserID}`).push(yourMessage);
                        console.log("to ja stworzyłem konwe")
                    } 

                    // if you friend created conversation
                    else if(contributors[0] === converserID && contributors[1] === userID) { 
                        messagesRef.child(`${converserID}-${userID}`).push(yourMessage);
                        console.log("to on stworzył konwe")
                    } 
                }
            } else {
                console.log("Konwersacja nie istnieje, tworzę ją!")
                messagesRef.child(`${userID}-${converserID}`).push(yourMessage);
            }
        })

        input.value = "";
    }
    render() {
        const { 
            inputText,
            isBottomBoxHide, 
            amountOfFriends, 
            isConversationOpen, 
            isConversationUserLogged, 
            converserNick, 
            converserPhotoURL, 
            
        } = this.state;

        const content = <>
                            <FriendBox>
                                {inputText === "" ? this.renderFriends(): null}
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
                            <Image style={{backgroundImage: `url(${converserPhotoURL})`}}>
                                <LogDot style={isConversationUserLogged ? {backgroundColor: "green"} : {backgroundColor: "red"}}></LogDot>
                            </Image>
                            <Nick> {converserNick} </Nick>
                        </FlexWrapper>
                        <Cross 
                            handleClick={this.hideConversation}
                            styled={crossStyled}
                            fontSize={{fontSize: "2em"}}
                        />
                    </MessageWindowHeader>

                    <MessageWindowContent>
                        {this.renderMessages()}
                    </MessageWindowContent>

                    <FormBox style={{ border: "none", padding: "1em .5em"}} onSubmit = {(e) => this.sendMessage(e)}>
                        <Input name="input" style={{ margin: 0 }} placeholder="Napisz..."></Input>
                        <FontAwesomeIcon icon={faPaperPlane} color={variables.$grayBlue} style={{fontSize: "1.5em"}}/>
                    </FormBox>
                </MessageWindow>
                }
            </Container>
        )
    }
}

export default Messanger;