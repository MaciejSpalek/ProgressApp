import React, { Component } from "react";
import app from "../../base";
import styled from "styled-components";
import helpers from "../../Components/helpers.js";
import Post from './post';

const StyledPostsList = styled.ul`
    width: 100%;
    max-width: 500px;
`


class PostBoard extends Component {
    _isMounted = false;
    constructor(props) {
        super(props)
        this.state = {
            friends: [],
            posts: [],
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
            const posts = helpers.snapshotToArray(snapshot);
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
    getUserPostsArray(array, postsOwner) {
        return array.filter(item => item.userID === postsOwner);
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
        let postsOwner = this.props.postsOwner;

        const sortedArrayByDate = helpers.sortByDate(this.state.posts);
        const userPostsArray = this.getUserPostsArray(sortedArrayByDate, postsOwner);
        const friendsPostsArray = this.getFriendsPostsArray(sortedArrayByDate);

        if(destination === "home") {
            array = friendsPostsArray;
        } else if(destination === "profile") {
            array = userPostsArray;
        }
        
        return array.map((post, index) => {
            return ( 
                <Post 
                    comments={post.comments}
                    postKey={post.postKey}
                    content={post.content}
                    userID={post.userID}
                    likes={post.likes}
                    nick={post.nick}
                    date={post.date}
                    url={post.url}
                    key={index}
                />
            )
        })
    }
 
    render() {
        return (
            <StyledPostsList>
                {app.getCurrentUser() ? this.renderPosts() : null}
            </StyledPostsList>
        )
    }
}

export default PostBoard;