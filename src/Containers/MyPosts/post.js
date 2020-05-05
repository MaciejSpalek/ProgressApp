import React, { Component } from "react";
import styled from "styled-components";
import app from "../../base";
import Comments from "./comments";
import Input from '../../Components/input';
import ImageWrapper from '../../Components/ImageWrapper';
import Helpers from "../../Components/helpers.js";
import DataUserWrapper from './dataWrapper';
import { flexCenter, variables, FlexComponent}  from '../../Components/styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';

import relativeTime from'dayjs/plugin/relativeTime';
import dayjs from "dayjs";
import 'dayjs/locale/pl';


const inputStyles = {
    "border": `.1em solid ${variables.$lightGray}`
}


const Container = styled.div`
    ${flexCenter}
    background-color: ${variables.$blue};
    flex-direction: column;
    width: 100%;
    margin: 1em 0;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
`

const TopBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    position: relative;
    width: 100%;
    background-color:  ${variables.$blue};
    /* border-bottom: .05em solid ${variables.$lightGray}; */
`

const CrossIcon = styled.span`
    position: absolute;
    top:.4em;
    right: .6em;
    color: ${variables.$gray};
`


const ContentBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    width: 100%;
    text-align: left;
    padding: .5em;
    -ms-word-break: break-all; 
    word-break: break-all;
    -webkit-hyphens: auto;
    -moz-hyphens: auto;
    -ms-hyphens: auto;
    hyphens: auto;
`




const BottomBox = styled.div`
    ${flexCenter};
    width: 100%;
    justify-content: space-between;
    border-top: .05em solid  ${variables.$lightGray};
    background-color: ${variables.$lightGray};
`
const IconBox = styled.div`
    ${flexCenter};
    padding: .3em;
    font-size: 1.1em;
    line-height:.8;
`
const IconCaption = styled.span`
    font-size: 1.3em;
    font-weight: bold;
`



const CommentBox = styled.div`
    ${flexCenter}
    width: 100%;
    flex-direction: column;
    border-top: .1em solid ${variables.$lightGray};
`
const CommentForm = styled.form`
    width: 100%;
    margin: 0;
`

const AddBox = styled(FlexComponent)`
    justify-content: flex-start;
`



class Post extends Component  {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isCommentBoxActive: false,
            isLockedLiking: false,
            didUserLike: false,
            tempLikes: 0,
            comments: [],
            nick: "",
            url: ""
        }
    }
    
    componentDidMount() {
        this._isMounted = true;
        this.setUserData();
        this.setAllCommentsOnStart();
        
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    setUserData() {
        const rootRef = app.getRootRef("users");
        const userID = app.getUserID();

        // set basic data about user from realtime database
        rootRef.child(userID).on('value', snapshot => {
            if(this._isMounted) {
                this.setState({
                    nick: snapshot.val().nick,
                    url: snapshot.val().url
                })
            }
        })
    }
    
    

    // functions for handle likes
    modifyLikeColor() {
        this.setState(prevState => ({
            didUserLike: !prevState.didUserLike 
        }))
    }
    setDefaultLikes() {
        const likesRef = app.getRootRef("likes");
        const userID = app.getUserID();
                   
        likesRef.once('value', snapshot =>{
        const posts = snapshot.val();
            for(let post in posts) {
                const likes = posts[post];
                for(let like in likes) {
                    if(userID === likes[like]) {
                        this.modifyLikeColor();
                    } 
                }
            }
        });
    }
    removeLike(likesRef, singlePost, userID, postKey) {
        for(let userLike in singlePost) { // iteration by single post - check all likes in current post
            if(userID === singlePost[userLike]) { // if user click, it executes comparing their userID and property value
                likesRef.child(postKey).child(userLike).remove();
            }
        }
    }
    handleLike = (postKey) => {
        const postsRef = app.getRootRef("posts");
        const likesRef = app.getRootRef("likes");
        const userID = app.getUserID();
                   
        
        if(this.state.isLockedLiking) {
            return;
        }

        likesRef.child(postKey).once('value', snapshot =>{
            let singlePost = snapshot.val();

            this.setState({
                isLockedLiking: true
            })

            if(this.isRepeatedValue(singlePost, userID)) {
                this.removeLike(likesRef, singlePost, userID, postKey)
                this.setLikesInPost(postsRef, postKey, true)
                this.modifyLikeColor();
            } else {
                likesRef.child(postKey).push(userID);
                this.setLikesInPost(postsRef, postKey, false)
                this.modifyLikeColor();
            }
            this.unlockLiking();
        })
    }
    unlockLiking() {
        setTimeout(()=> {
            this.setState({
                isLockedLiking: false
            })
        }, 500)
    }



    // functions for handle posts
    isRepeatedValue(singlePost, userID) {
        let isRepeated = false;
        for(let userLike in singlePost) {
            if(userID === singlePost[userLike]) {
                isRepeated = true;
            }
        }
        return isRepeated;
    }
    setLikesInPost(postsRef, postKey, isRepeated) {
        postsRef.once('value', snapshot => { 
            const currentLikesValue = snapshot.val()[postKey].likes;
            if(!isRepeated) {
                postsRef.child(postKey).child('likes').set(currentLikesValue + 1)
            } else {
                // protection by negative likes-counter value
                if(currentLikesValue === 0) {
                    postsRef.child(postKey).child('likes').set(0)
                } else {
                    postsRef.child(postKey).child('likes').set(currentLikesValue - 1)
                }
            }
        })
    }
    removePost = (postKey) => {
        const postsRef = app.getRootRef("posts");
        postsRef.child(postKey).remove();
    }
    isYourPost = (postKey) => {
        const postsRef = app.getRootRef("posts");
        const userID = app.getUserID();
        let isYourPost = false;
        postsRef.once('value', snapshot => {
            if(snapshot.val()[postKey].hasOwnProperty("userID")) {
                const postMakerID = snapshot.val()[postKey].userID;
                isYourPost = postMakerID === userID;
            }
        })
        return isYourPost;
    }



    // function for handle posts' comments
    commentBoxHideHandler = () => {
        this.setState(prevState => ({
            isCommentBoxActive: !prevState.isCommentBoxActive
        }))
    }
    setAllCommentsOnStart() {
        const commentsRef = app.getRootRef("comments");
        commentsRef.on("value", snapshot => {
            const comments = Helpers.snapshotToArray(snapshot);
            if (this._isMounted) {
                this.setState({comments})
            }
        })
    }
    addComment = (e, postKey) => {
        e.preventDefault();
        const { input } = e.target.elements;
        if(input.value !== "") {
            const commentKey = app.getRealTimeDatabase().ref().child('comments').push().key;
            const updates = {};
            const commentData = {
                userID: app.getUserID(),
                postKey: postKey,
                content: input.value,
                url: this.state.url,
                nick: this.state.nick,
                date: Helpers.getDate(),
                commentKey: commentKey
            };
            input.value = "";
            updates['/comments/' + commentKey] = commentData;
            return app.getRealTimeDatabase().ref().update(updates);
        }
    }
    filterComments = (postKey, comments) => {
        return comments.filter(comment => comment.postKey === postKey)
    }
    countComments = (postKey, comments) => {
        return comments.filter(comment => comment.postKey === postKey).length
    }




 
   

    render() {
        dayjs.locale("pl")
        dayjs.extend(relativeTime);
        const { 
            url, 
            nick, 
            content, 
            date, 
            likes, 
            postKey 
        } = this.props;

        const { 
            isCommentBoxActive,
            didUserLike,
            comments
        } = this.state;

        return (
            <Container>
                <TopBox>
                    <DataUserWrapper 
                        url={url}
                        nick={nick}
                        date={date}
                        imgWidth={"3.5em"}
                        imgHeight={"3.5em"} 
                        nickFontSize={"1em"}  
                        dateFontSize={".8em"} 
                        imgMargin={"0 .5em 0 0"}
                    />
                    {app.getCurrentUser() ?
                        this.isYourPost(postKey) ? 
                        <CrossIcon onClick={() => this.removePost(postKey)}>
                            <FontAwesomeIcon icon={faTimes} style={{fontSize: "1.5em"}}/>
                        </CrossIcon> : null
                    : null
                    }
                </TopBox>
                <ContentBox>
                    { content }
                </ContentBox>
                <BottomBox>
                    <IconBox onClick={() => this.handleLike(postKey)} style={didUserLike ? {color:variables.$grayBlue} : {color:variables.$gray}}>
                        <FontAwesomeIcon icon={faHeart} style={{margin: '.2em', fontSize: "1.2em"}}/>
                        <IconCaption>{ likes }</IconCaption>
                    </IconBox>
                    <IconBox style={{color:variables.$gray}} onClick={this.commentBoxHideHandler}>
                        <FontAwesomeIcon icon={faComment} style={{margin: '.2em'}} />
                        <IconCaption>{ this.countComments(postKey, comments) }</IconCaption>
                    </IconBox>
                </BottomBox>
                {
                isCommentBoxActive ? 
                <CommentBox>
                    <Comments comments={this.filterComments(postKey, comments)}/>
                    <AddBox>
                        <ImageWrapper 
                            isLogged={true}
                            imgHeight={"2.5em"}
                            imgWidth={"2.5em"}
                            dotSize={"0"}
                            dotBorder={"0"}
                            margin={"0 .5em 0 0"}
                            url={url}
                        />
                        <CommentForm onSubmit={(e) => this.addComment(e, postKey)}>
                            <Input 
                                name={"input"}
                                placeholder={"Skomentuj..."}
                                style={inputStyles}
                                handleFunction={()=> {}}
                            />
                        </CommentForm>
                    </AddBox>
                </CommentBox> : null
                }
            </Container>
        )   
    }
}

export default Post;