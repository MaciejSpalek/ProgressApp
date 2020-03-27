import React, { Component } from "react";
import styled from "styled-components";
import Helpers from "../../Components/helpers"
import app from "../../Components/base"
import { variables, flexCenter } from "../../Components/styleHelpers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserTimes, faUserPlus, faUserCheck } from "@fortawesome/free-solid-svg-icons";


const Container = styled.div`
    ${flexCenter};
    justify-content:space-between;
    width: 100%;
    border-bottom: .1em solid ${variables.$gray};
    padding: .3em;
`
const DataWrapper = styled.div`
    ${flexCenter};
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
    color: black;
    font-size: 1em;
    font-weight: bold;
`
  

class UserProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isYourUserFriend: false,
            user: this.props.user
        }
    }

    componentDidMount() {
        this.setIcon();
    }

    addFriendToDatabase(user) {
        const userFriends = app.getRealTimeDatabase().ref("friends")
        const userID = app.getUserID();
        userFriends.child(userID).push(user);
    }

    setIcon = () => {
        const userID = app.getUserID();
        const userFriends = app.getRealTimeDatabase().ref("friends").child(userID)
       
        userFriends.on('value', snapshot => {
            const friends = snapshot.val();
            for(let friend in friends) {
                if(this.props.user.userID === friends[friend].userID) {
                    this.setState({
                        isYourUserFriend: true
                    })
                }
            }
        })
    }

    render() {
        const { user } = this.props
        const { isYourUserFriend } = this.state

        const plusFriendIcon = <FontAwesomeIcon icon={faUserPlus} style={{color: variables.$darkBlue, fontSize: "1.5em"}} onClick={() => this.addFriendToDatabase(user)}/>
        const checkedFriendIcon = <FontAwesomeIcon icon={faUserCheck} style={{color: variables.$darkBlue, fontSize: "1.5em"}}/>
        const deleteFriendIcon = <FontAwesomeIcon icon={faUserTimes} style={{color: variables.$darkBlue, fontSize: "1.5em"}}/>
       
        return (
            <Container>
                <DataWrapper>
                    <Image style={{backgroundImage: `url(${user.url})`}}></Image>
                    <Nick> { Helpers.capitalizeFirstLetter(user.nick) }</Nick>
                </DataWrapper>
                {isYourUserFriend ? checkedFriendIcon : plusFriendIcon}
            </Container>
        )
    }
}

export default UserProfile