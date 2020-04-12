import React, { Component } from "react";
import app from "../../base";
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
            posts: [],
            friends: [],
            users:[]
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setFriends();
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
    // assign data from realtime database to state "friend" && "users"
    setFriends() {
        app.getAllUsers((tempArray) => {
            if (this._isMounted) {
                this.setState({
                    users: tempArray
                })
            }
        })
        app.getAllFriends((tempArray) => {
            if (this._isMounted) {
                this.setState({
                    friends: tempArray
                })
            }
        })
    }
    // return filtered array ( only your posts )
    getUserPostsArray(array) {
        const userID = app.getUserID();
        return array.filter(item => item.userID === userID);
    }
    // return filtered array ( your posts and your friends' posts )
    getFriendsPostsArray(array) {
        const userID = app.getUserID();
        const tempArray = [];
        const friends = this.state.friends;

        array.forEach(post => {
            const postMakerID = post.userID;
            if(postMakerID === userID) {
                tempArray.push(post);
            }
            friends.forEach(friend => {
                if(friend.userID === postMakerID) {
                    tempArray.push(post);
                } 
            })
    })
    return tempArray;
    }

    renderPosts() {
        let array = [];
        let destination = this.props.destination;

        const sortedArrayByDate = app.sortByDate(this.state.posts);
        const userPostsArray = this.getUserPostsArray(sortedArrayByDate);
        const friendsPostsArray = this.getFriendsPostsArray(sortedArrayByDate);

        if(destination === "home") {
            array = friendsPostsArray;
        } else if(destination === "profile") {
            array = userPostsArray;
        }
        
        return array.map((post, index) => {
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
                {app.getCurrentUser() ? this.renderPosts() : null}
            </Container>
        )
    }
}

export default PostBoard;