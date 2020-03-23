import React, { Component } from "react";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers'
import Helpers from "../../Components/helpers.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faHeart, faTimes } from '@fortawesome/free-solid-svg-icons'
import app from "../../Components/base";
const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;





const Container = styled.div`
    ${flexCenter}
    background-color: rgb(0, 111, 175);
    flex-direction: column;
    width: 100%;
    margin: 1em 0;
    border-radius: .3em;
`




const TopBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    position: relative;
    width: 100%;
    border-top-left-radius: .3em;
    border-top-right-radius: .3em;
    background-color: rgb(0, 111, 175);
    border-bottom: .1em solid ${variables.$grayBlue};
    padding: .3em;
`
const DescriptionWrapper = styled.div`
    ${flexCenter};
    align-items: flex-start;
    flex-direction: column;
`
const Image = styled.div`
    border-radius: 50%;
    width: 3.5em;
    height: 3.5em;
    background-position: center;
    background-size: cover;
    background-color: ${variables.$blue};
    margin-right: .5em;
`
const Nick = styled.div`
    color: white;
    font-size: 1em;
    font-weight: bold;
`
const Date = styled.span`
    color: white;
    font-size: .8em;   
`
const CrossIcon = styled.span`
    position: absolute;
    top:.4em;
    right: .6em;
    color: white;
`


const ContentBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    width: 100%;
    color: white;
    text-align: left;
    padding: .5em;
`




const BottomBox = styled.div`
    ${flexCenter};
    width: 100%;
    justify-content: space-between;
    background-color: ${variables.$grayBlue};
    border-bottom-left-radius: .3em;
    border-bottom-right-radius: .3em;
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
    justify-content: flex-start;
    width: 100%;
    padding: .5em;
`
const Input = styled.input`
    width: 80%;
    height: 35px;
    border: none;
    border-radius: .3em;
    font-size: 1.1em;
    padding: 0 .5em;
`



class Post extends Component  {
    constructor(props) {
        super(props);
        this.state = {
            tempLikes: 0,
            isCommentBoxActive: false,
            isLockedLiking: false,
            didUserLike: false
        }
    }

    componentDidMount() {
        // this.setDefaultLikes();
    }
    commentBoxHideHandler = () => {
        this.setState(prevState => ({
            isCommentBoxActive: !prevState.isCommentBoxActive
        }))
    }
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
                        console.log("Modyfikuje")
                        this.modifyLikeColor();
                    } 
                }
            }
        });
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
    isRepeatedValue(singlePost, userID) {
        let isRepeated = false;
        for(let userLike in singlePost) {
            if(userID === singlePost[userLike]) {
                isRepeated = true;
            }
        }
        return isRepeated;
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
    removePost = (postKey) => {
        const postsRef = app.getRootRef("posts");
        postsRef.child(postKey).remove();
    }
    isYourPost = (postKey) => {
        const postsRef = app.getRootRef("posts");
        const userID = app.getUserID();
        let isYourPost;
        postsRef.once('value', snapshot => {
            if(snapshot.val()[postKey].hasOwnProperty("userID")) {
                const postMakerID = snapshot.val()[postKey].userID;
                isYourPost = postMakerID == userID;
            }
        })
        return isYourPost;
    }

    render() {
        const { url, nick, content, date, likes, comments, postKey } = this.props;
        console.log(postKey, this.state.didUserLike)
        return (
            <Container>
                <TopBox>
                    <Image style={{backgroundImage: `url(${url})`}}></Image>
                    <DescriptionWrapper>
                        <Nick> { Helpers.capitalizeFirstLetter(nick) }</Nick>
                        <Date> {date} </Date>
                    </DescriptionWrapper>
                    {
                        this.isYourPost(postKey) ? 
                        <CrossIcon onClick={() => this.removePost(postKey)}>
                            <FontAwesomeIcon icon={faTimes} style={{fontSize: "1.5em"}}/>
                        </CrossIcon> : null
                    }
                    
                </TopBox>
                <ContentBox>
                    { content }
                </ContentBox>
                <BottomBox>
                    <IconBox onClick={() => this.handleLike(postKey)} style={this.state.didUserLike ? {color:"#FF8E00"} : {color:"white"}}>
                        <FontAwesomeIcon icon={faHeart} style={{margin: '.2em', fontSize: "1.2em"}}/>
                        <IconCaption>{ likes }</IconCaption>
                    </IconBox>
                    <IconBox style={{color:"white"}} onClick={this.commentBoxHideHandler}>
                        <FontAwesomeIcon icon={faComment} style={{margin: '.2em'}} />
                        <IconCaption>{ comments }</IconCaption>
                    </IconBox>
                </BottomBox>
                {this.state.isCommentBoxActive ? 
                    <CommentBox>
                        <Comments postKey={postKey}/>
                        <>
                        <Image style={{
                            backgroundImage: `url(${url})`, 
                            width: "2.5em",
                            height: "2.5em"}}>
                        </Image>
                        <Input placeholder="Skomentuj..."></Input>
                        </>
                    </CommentBox> : null
                }
                
            </Container>
        )   
    }
}

export default Post;