import React, { Component } from "react"
import styled from 'styled-components';
import app from "../base";
import Paragraph from './paragraph';
import Button from './Button';
import { FlexComponent, variables, flexCenter }  from './styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAddressCard } from '@fortawesome/free-solid-svg-icons';
import helpers from "./helpers";



const Container = styled.form`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`
const StyledWrapper = styled(FlexComponent)`
    ${flexCenter};
    flex-direction: column;
    border-radius: .3em;
    border: none;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    padding: 0;
    margin-bottom: .5em;

`

const HeaderWrapper = styled(FlexComponent)`
    justify-content: flex-start;
    background-color: white;
    border-bottom: .1em solid ${variables.$lightGray};
    border-top-left-radius: .3em;
    border-top-right-radius: .3em;
`
const TextArea = styled.textarea`
    ${flexCenter}
    width: 100%;
    height:150px;
    border-radius: .3em;
    border-top-left-radius: 0;
    border-top-right-radius: 0;
    border: none;
    background-color: white;
    padding: .5em;
    font-size: 1.2em;
    resize:none;
    &::placeholder {
        color: ${variables.$gray};
    }
`



class ShareBox extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            nick: "",
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setUserData();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    // set basic data about user from realtime database
    setUserData() {
        const rootRef = app.getRootRef("users");
        const userID = app.getUserID();

        rootRef.child(userID).on('value', snapshot => {
            if(this._isMounted) {
                this.setState({
                    nick: snapshot.val().nick,
                    url: snapshot.val().url
                })
            }
        })
    }

    
    addPost(e) {
        e.preventDefault();
        const { textarea } = e.target.elements;

        if(textarea.value !== "") {
            const { url, nick } = this.state;
            const updates = {};
            const newPostKey = app.getRealTimeDatabase().ref().child('posts').push().key;
            const postData = {
                userID: app.getUserID(),
                postKey: newPostKey,
                content: textarea.value,
                url: url,
                nick: nick,
                date: helpers.getDate(),
                likes: 0,
                comments: 0
            };
            textarea.value = "";
            updates['/posts/' + newPostKey] = postData;
            return app.getRealTimeDatabase().ref().update(updates);
        }
      }
    
    render() {
        return (
            <Container onSubmit={(e) => this.addPost(e)}>
                <StyledWrapper>
                    <HeaderWrapper>
                        <FontAwesomeIcon 
                            icon={faAddressCard} 
                            style={{fontSize: 25, margin: '.2em', color: variables.$grayBlue}} 
                        />
                        <Paragraph
                            color={variables.$grayBlue}
                            text={"Stwórz post"}
                            fontSize={"1.4em"}
                        />
                    </HeaderWrapper>
                    <TextArea 
                        name="textarea" 
                        placeholder="Napisz coś...">
                    </TextArea>
                </StyledWrapper>
                <Button 
                    handleClick={()=> {}} 
                    text={"Opublikuj"}
                />
            </Container>
        )
    }
}
                
export default ShareBox;

                