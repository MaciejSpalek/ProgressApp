import React, { Component } from "react"
import styled from 'styled-components';
import app from "../base";
import * as styleHelpers  from './styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileUpload } from '@fortawesome/free-solid-svg-icons';

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const Container = styled.form`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    /* @media only screen and (min-width: 1200px) {
        width: 500px;
    } */
`
const TextArea = styled.textarea`
    ${flexCenter}
    width: 100%;
    height:150px;
    border-radius: .3em;
    border: none;
    background-color: white;
    padding: .5em;
    font-size: 1.2em;
    resize:none;
    margin-bottom: .5em;
    &::placeholder {
        color: ${variables.$gray};
    }
`
const AddArea = styled.div`
    ${flexCenter};
    justify-content: space-between;
    width: 100%;
` 









class ShareBox extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            nick: ""
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
                date: new Date(),
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
            <Container onSubmit={(e) => {this.addPost(e)}}>
                <TextArea name="textarea" placeholder="Napisz coś..."></TextArea>
                <AddArea>
                    <label>
                        <FontAwesomeIcon icon={faFileUpload} style={{fontSize: 35, margin: '.1em'}} color={variables.$grayBlue} />
                        <input type="file" style={{display: "none"}}/>
                    </label>
                    <styleHelpers.Button>Opublikuj</styleHelpers.Button>
                </AddArea>
            </Container>
        )
    }
}
                
export default ShareBox;

                