import React, { Component } from "react";
import app from "../../Components/base";
import styled from "styled-components";
import * as styleHelpers  from '../../Components/styleHelpers';
import Post from './post';

const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;


const Container = styled.div`
    width: 100%;
`


class PostBoard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            posts: []
        }
    }
    componentDidMount() {
        this.setPosts();
    }

    snapshotToArray(snapshot) {
        const returnArr = [];
        snapshot.forEach(childSnapshot => {
            const item = childSnapshot.val();
            item.key = childSnapshot.key;
            returnArr.push(item);
        });
        return returnArr;
    };

    setPosts() {
        const rootRef = app.getRootRef("posts");
        rootRef.on("value", snapshot => {
            const posts = this.snapshotToArray(snapshot);
            this.setState({posts})
        })
    }

    renderPosts() {
        console.log(this.state.posts)
        return this.state.posts.map((post, index) => {
            return ( 
                <Post 
                    url={post.url}
                    nick={post.nick}
                    content={post.content}
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