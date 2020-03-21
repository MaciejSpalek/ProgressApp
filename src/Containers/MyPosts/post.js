import React, { Component } from "react";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers'
import Helpers from "../../Components/helpers.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComment, faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import app from "../../Components/base";
const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;





const Container = styled.div`
    ${flexCenter}
    background-color: rgb(0, 111, 175);
    flex-direction: column;
    width: 100%;
    /* padding: .5em; */
    margin: 1em 0;
    border-radius: .3em;
`




const TopBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
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
    /* border-bottom: .1em solid ${variables.$grayBlue}; */
`
const IconBox = styled.div`
    ${flexCenter};
    /* margin-right: 1em; */
    padding: .3em;
`
const IconCaption = styled.span`
    color: white;
    font-size: 1.3em;
    font-weight: bold;
`

const CommentBox = styled.div`
    ${flexCenter}
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
            isCommentBoxActive: false
        }
    }

    isCommentBoxActiveHandler = () => {
        this.setState(prevState => ({
            isCommentBoxActive: !prevState.isCommentBoxActive
        }))
    }

    // type ===> "+" or "-"
    modifyLikesValue(ref, postKey, type) {
        if(type == "+") {
            return ref.child(postKey).child('likes').set(this.state.tempLikes + 1)
        } else {
            return ref.child(postKey).child('likes').set(this.state.tempLikes - 1)
        }
    }
    handleLike = (postKey) => {
        const postsRef = app.getRootRef("posts");
        const userID = app.getUserID();

        postsRef.once('value', snapshot => { 
            const currentLikesValue = snapshot.val()[postKey].likes;
            this.setState({
                tempLikes: currentLikesValue
            }, ()=> {
                if(true) {
                    this.modifyLikesValue(postsRef, postKey, "+");
                } else {
                    this.modifyLikesValue(postsRef, postKey, "-");
                }
                
            })
        });
    }


    render() {
        const { url, nick, content, date, likes, comments, postKey } = this.props
        return (
            <Container>
                <TopBox>
                    <Image style={{backgroundImage: `url(${url})`}}></Image>
                    <DescriptionWrapper>
                        <Nick> { Helpers.capitalizeFirstLetter(nick) }</Nick>
                        <Date> {date} </Date>
                    </DescriptionWrapper>
                </TopBox>
                <ContentBox>
                    { content }
                </ContentBox>
                <BottomBox>
                    <IconBox onClick={() => this.handleLike(postKey)}>
                        <FontAwesomeIcon icon={faThumbsUp} style={{fontSize: 20, margin: '.2em'}} color={"white"} />
                        <IconCaption>{ likes }</IconCaption>
                    </IconBox>
                    <IconBox onClick={this.isCommentBoxActiveHandler}>
                        <FontAwesomeIcon icon={faComment} style={{fontSize: 20, margin: '.2em'}} color={"white"} />
                        <IconCaption>{ comments }</IconCaption>
                    </IconBox>
                </BottomBox>
                {this.state.isCommentBoxActive ? 
                    <CommentBox>
                        <Image style={{
                            backgroundImage: `url(${url})`, 
                            width: "2.5em",
                            height: "2.5em"}}>
                        </Image>
                        <Input placeholder="Skomentuj..."></Input>
                    </CommentBox> : null
                }
                
            </Container>
        )   
    }
}

export default Post;