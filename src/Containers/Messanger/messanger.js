import React, { Component } from 'react';
import styled from 'styled-components';

import app from '../../base';
import UserProfile from './userProfile';
import Friend from './friend';
import Message from './message';
import helpers from '../../Components/helpers';
import FriendPanel from './FriendPanel';
import ConversationPanel from './ConversationPanel';
import { flexCenter, variables }  from '../../Components/styleHelpers';
import Placeholder from './placeholder';

const Container = styled.div`
    ${flexCenter}
    flex-direction: ${props=> props.windowWidth > "768" ? "row": "column"};
    position: fixed;
    top: 64px;
    left: 0;
    width: 100%;
    height: calc(100vh - 64px);
    background-color: ${variables.$lightGray};
`


class Messanger extends Component {
    _isMounted = false;
    constructor() {
        super();
        this.messageWindowRef = React.createRef();
        this.state = {
            isConversationUserLogged: false,
            isConversationOpen: false,
            isBottomBoxHide: false,
            converserPhotoURL: "",
            mutableUsersArray: [],
            constUsersArray: [],
            amountOfFriends: 0,
            converserNick: "",
            conversation: [],
            converserID: "",
            windowWidth: 0,
            inputText: "",
            friends: [],
        }
    }

    scrollToBottom() {
        this.messageWindowRef.current.scrollIntoView();
    };
  
    componentDidMount() {
        this._isMounted = true;
        this.handleResize()
        app.getAllUsers((tempArray) => {
            if(this._isMounted) {
                this.setState({
                    constUsersArray: tempArray
                })
            }
        })
        app.getAllFriends((tempArray) => {
            if(this._isMounted) {
                this.setState({
                    friends: tempArray
                })
            }
        })
        app.countFriends((counter) => {
            if(this._isMounted) {
                this.setState({
                    amountOfFriends: counter
                })
            }
        })
        window.addEventListener('resize', ()=> this.handleResize());
    }

    handleResize() {
        this.setState({windowWidth: window.innerWidth});
    }

    componentWillUnmount() {
        window.removeEventListener('resize', ()=> this.handleResize());
        this._isMounted = false;
    }

    componentDidUpdate() {
        this._isMounted = true;
        app.getRealTimeDatabase().ref("users").once('child_changed', snapshot => {
            app.getAllFriends((tempArray) => {
                if(this._isMounted) {
                    this.setState({
                        friends: tempArray
                    })
                }
            })
        });

        app.getRealTimeDatabase().ref("messages").once('child_changed', snapshot => {
            this.getCurrentConversation((tempArray) => {
                if(this._isMounted) {
                    this.setState({
                        conversation: tempArray
                    }, ()=> {
                        this.scrollToBottom();
                    });
                }
            });
        });
    }
    
    
    filterNicks(e) {
        const inputValue = e.target.value;
        const tempUsersArray = [];
        

        e.preventDefault();
        this.state.constUsersArray.forEach(user => {
            if(helpers.isInputTextMatch(inputValue, user.nick)) {
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
                <Friend
                    user={friend}
                    key={index}
                    handleConversation={()=> this.openConversation(friend)}
                />
            )
        })
    }

    
    renderMessages() {
        return this.state.conversation.map((message, index) => {
            return (
                <Message
                    key={index}
                    text={message.text}
                    userID={message.user}
                    date={message.date}
                />
            )
        })
    }


  

    async openConversation(user) {
        await this.setState({
            isConversationUserLogged: user.isLogged,
            converserPhotoURL: user.url,
            converserNick: user.nick,
            converserID: user.userID,
            isConversationOpen: true,
        })

        this.getCurrentConversation((tempArray) => {
            this.setState({
                conversation: tempArray
            })
        })   

        this.scrollToBottom();
    }

    hideConversation = () => {
        this.setState({
            isConversationOpen: false,
            conversation: []
        })
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
    
    getCurrentConversation = (setState) => {
        const userID = app.getUserID(); 
        const converserID = this.state.converserID; // your friends' ID from state
        const messagesRef = app.getRealTimeDatabase().ref("messages");

        messagesRef.once('value', snapshot=> {
            const conversations = snapshot.val();
            let tempConversation = [];
            if(this.isConversationExist(conversations, userID, converserID)) {
                for(let conversation in conversations) {
                    const contributors = conversation.split("-")
                    if(contributors[0] === userID && contributors[1] === converserID || contributors[0] === converserID && contributors[1] === userID) {
                        for(let messageID in conversations[conversation]) {
                            const message = conversations[conversation][messageID]
                            tempConversation.push(message)
                        }
                    } 
                }
            }
            setState(tempConversation);
        })
    }

    getMessangerView() {
        const { 
            inputText,
            windowWidth,
            converserNick, 
            amountOfFriends, 
            converserPhotoURL, 
            isConversationOpen, 
            isConversationUserLogged, 
        } = this.state;
        if(windowWidth > 768) {
            return (
                <Container windowWidth={windowWidth}>
                    {isConversationOpen ? <ConversationPanel 
                        windowWidth={windowWidth}
                        converserNick={converserNick}
                        converserPhotoURL={converserPhotoURL}
                        isConversationOpen={isConversationOpen}
                        isConversationUserLogged={isConversationUserLogged}
                        messageWindowRef={this.messageWindowRef}
                        sendMessage={(e)=> this.sendMessage(e)}
                        renderMessages={()=> this.renderMessages()}
                        hideConversation={()=> this.hideConversation()}
                    /> :
                    <Placeholder />}
                    <FriendPanel 
                        windowWidth={windowWidth}
                        inputText={inputText}
                        renderFriends={()=> this.renderFriends()}
                        renderProfiles={()=> this.renderProfiles()}  
                        filterNicks={(e)=> this.filterNicks(e)}
                        amountOfFriends={amountOfFriends}
                    />
                </Container>
            )
        } else  {
            return (
                <Container>
                    {!isConversationOpen ? <FriendPanel 
                        inputText={inputText}
                        renderFriends={()=> this.renderFriends()}
                        renderProfiles={()=> this.renderProfiles()}  
                        filterNicks={(e)=> this.filterNicks(e)}
                        amountOfFriends={amountOfFriends}
                    /> :
                    <ConversationPanel 
                        windowWidth={windowWidth}
                        converserNick={converserNick}
                        converserPhotoURL={converserPhotoURL}
                        isConversationOpen={isConversationOpen}
                        isConversationUserLogged={isConversationUserLogged}
                        messageWindowRef={this.messageWindowRef}
                        sendMessage={(e)=> this.sendMessage(e)}
                        renderMessages={()=> this.renderMessages()}
                        hideConversation={()=> this.hideConversation()}
                    />}
                </Container>
            )
        }
    }


    sendMessage = (e) => {
        e.preventDefault();
        const { input } = e.target.elements;
        const userID = app.getUserID(); 
        const converserID = this.state.converserID;
        const messagesRef = app.getRealTimeDatabase().ref("messages");
        const yourMessage = {
            user: userID,
            text: input.value,
            date: helpers.getFullDate("/")
        }
        if(!helpers.isInputEmpty(input)) {
            messagesRef.once('value', snapshot=> {
                const conversations = snapshot.val();
                if(this.isConversationExist(conversations, userID, converserID)) {
                    for(let conversation in conversations) {
                        const contributors = conversation.split("-")
    
                        if(contributors[0] === userID && contributors[1] === converserID) {
                            messagesRef.child(`${userID}-${converserID}`).push(yourMessage);
                        } else if(contributors[0] === converserID && contributors[1] === userID) { 
                            messagesRef.child(`${converserID}-${userID}`).push(yourMessage);
                        } 
                    }
                } else {
                    messagesRef.child(`${userID}-${converserID}`).push(yourMessage);
                }
            })
            helpers.clearInput(input);
        }
    }

    render() {
        return (
            this.getMessangerView()
        )
    }
}

export default Messanger;