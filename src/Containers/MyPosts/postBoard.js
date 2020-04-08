import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components";
import Helpers from "../../Components/helpers.js";
import Post from './post';

const Container = styled.div`
    width: 100%;
`


class PostBoard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        this._isMounted = true;
        this.setPosts();
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    

    // assign data from realtime database to state "posts"
    setPosts() {
        const rootRef = app.getRootRef("posts");
        rootRef.on("value", snapshot => {
            const posts = Helpers.snapshotToArray(snapshot);
            if (this._isMounted) {
                this.setState({posts})
            }
        })
    }

    renderPosts() {
        const sortedArray = app.sortByDate(this.state.posts);
        return sortedArray.map((post, index) => {
            return ( 
                <Post 
                    userID={post.userID}
                    postKey={post.postKey}
                    url={post.url}
                    nick={post.nick}
                    likes={post.likes}
                    comments={post.comments}
                    content={post.content}
                    date={post.date}
                    key={index}
                />
            )
        })
    }
 
    render() {
        return (
            <Container>
                {this.renderPosts()}
            </Container>
        )
    }
}

export default PostBoard;