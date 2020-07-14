import React, { Component } from "react";
import styled from "styled-components";
import Helpers from "../../Components/helpers"
import app from "../../base"
import { Link } from 'react-router-dom';
import { variables, flexCenter, FlexComponent } from "../../Components/styleHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";


const Container = styled.div`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    padding: .5em;
    cursor: pointer;
`
const StyledWrapper = styled(FlexComponent)`
    width: auto;
    padding: 0;
`
const Image = styled.div`
    border-radius: 50%;
    width: 3.5em;
    height: 3.5em;
    background-position: center;
    background-size: cover;
    background-image: url(${props => props.url});
    margin-right: .5em;
`
const Nick = styled.div`
    color: black;
    font-size: 1em;
    font-weight: bold;
`
  

class UserProfile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isYourFriend: false,
            user: this.props.user
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setIcon();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    addFriendToDatabase(user) {
        const userFriends = app.getRealTimeDatabase().ref("friends")
        const userID = app.getUserID();
        userFriends.child(userID).push(user);
    }

    setIcon() {
        const userID = app.getUserID();
        const userFriends = app.getRealTimeDatabase().ref("friends").child(userID)
       
        userFriends.on('value', snapshot => {
            const friends = snapshot.val();
            for(let friend in friends) {
                if(this.props.user.userID === friends[friend].userID) {
                    if(this._isMounted) {
                        this.setState({
                            isYourFriend: true
                        })
                    }
                }
            }
        })
    }

    showProfile() {

    }
    render() {
        const { user } = this.props
        const { isYourFriend } = this.state
        const plusFriendIcon = <FontAwesomeIcon icon={faUserPlus} style={{color: variables.$darkBlue, fontSize: "1.5em"}} onClick={() => this.addFriendToDatabase(user)}/>
        const checkedFriendIcon = <FontAwesomeIcon icon={faUserCheck} style={{color: variables.$darkBlue, fontSize: "1.5em"}}/>
       
        return (
            <Container>
                <Link style={{textDecoration: "none"}} to={`/${user.nick}`}>
                    <StyledWrapper>
                        <Image url={user.url}/>
                        <Nick> { Helpers.capitalizeFirstLetter(user.nick) }</Nick>
                    </StyledWrapper>
                </Link>
                { user.userID === app.getUserID() ? null
                : (isYourFriend ? checkedFriendIcon : plusFriendIcon)}
            </Container>
        )
    }
}

export default UserProfile