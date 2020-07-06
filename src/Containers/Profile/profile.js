import React, { Component } from "react";
import app from "../../base";
import styled from "styled-components";
import ShareBox from "../../Components/shareBox";
import PostBoard from "../MyPosts/postBoard";
import ProfileCard from './profileCard';
import SearchBox from '../../Components/searchBox';
import Form from './form';
import { Container }  from '../../Components/styleHelpers';


const StyledContainer = styled(Container)`
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: scroll;
`

const Wrapper = styled.div`
    position: relative;
    width: 100%;
    max-width: 500px;
    padding: 0 .5em;
    
`

class Profile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isEditButtonActive: true,
            trainingExperience: "-",
            description: "-",
            weight: "-",
            height: "-",
            image: "",
            nick: "",
            age: "",
            url: "",
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setProfileData(); // at the beginning function pull out data from Realtime database
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
   
    editButtonHandler() {
        this.setState(prevState => ({
            isEditButtonActive: !prevState.isEditButtonActive
        }))
    }

    
    // function invoke on button
    updateProfileData(e) {
        e.preventDefault();
        const userRoot = app.getRootRef("users").child(app.getUserID());
        const { 
            weight, 
            height,  
            description,
            trainingExperience, 
        } = e.target.elements;

        // update profileData in realtime database 
        userRoot.update({
            weight: weight.value,
            height: height.value,
            description: description.value,
            trainingExperience: trainingExperience.value,
        });

        this.setState({
            weight: weight.value,
            height: height.value,
            description: description.value,
            trainingExperience: trainingExperience.value,
            isEditButtonActive: !this.state.isEditButtonActive,
        })   
    } 
    
  
    doesProfilePhotoExist(userStorage) {
        if(userStorage.filter(element => element.name === "profilePhoto")[0]) {
            return true;
        } else {
            return false;
        }
    }
  
    async choosePhoto(e) {
        if (e.target.files[0]) {
            const image = e.target.files[0];
            await this.setState({image});
            this.setPhotoURL();
        }
    }

    updateLoop(refText) {
        const ref = app.getRootRef(refText);
        const userID = app.getUserID();

        ref.once('value', snapshot => {
            const group = snapshot.val();
            for(let part in group) {
                if(group[part].userID === userID) {
                    ref.child(part).update({
                        url: this.state.url
                    });
                }
            }
        });
    }
    isYourProfile(currentUserID, profileID) {
        return currentUserID === profileID;
    }

    setPhotoURL() {
        const { image } = this.state;
        const userID = app.getUserID();
        const uploadTask = app.getStorage().ref(`users/${userID}/profilePhoto`).put(image);
        
        uploadTask.on('state_changed', () => {
            app.getStorage().ref(`users/${userID}`).child(`profilePhoto`).getDownloadURL().then(URL => {
                this.setState({
                    url: URL
                }, ()=> {
                    this.updateLoop("users") //  update photo in users after its change
                    this.updateLoop("posts") // update photo in posts after its change
                    this.updateLoop("comments"); // update photo in comments after its change
                })
            
          }) 
      })
    }



    
    //////// Realtime Database /////////
    setProfileData() {
        const userID = this.props.user.userID;
        const rootRef = app.getRootRef("users").child(userID);
        rootRef.once("value", snapshot => {
            if(this._isMounted) {
                this.setState({
                    nick:  snapshot.val().nick,
                    age:  snapshot.val().age,
                    url:  snapshot.val().url,
                    weight:  snapshot.val().weight,
                    height:  snapshot.val().height,
                    description: snapshot.val().description,
                    trainingExperience:  snapshot.val().trainingExperience
                })
            }
        })
    }


    render() {
        const { isEditButtonActive } = this.state;
        const { usersData, user } = this.props;

        return (
            <StyledContainer>
                <SearchBox usersData={usersData}/>
                <Wrapper>
                    {isEditButtonActive ? 
                    <ProfileCard 
                        user={user}
                        url={this.state.url}
                        onChangefunction={(e)=> this.choosePhoto(e)}
                        handleEditButton={()=> this.editButtonHandler()}
                    /> 
                    :
                    <Form 
                        handleFunction={(e) => this.updateProfileData(e)}
                        handleEditButton={()=> this.editButtonHandler()}
                        user={user}
                    />}
                    {this.isYourProfile(app.getUserID(), user.userID) ? <ShareBox /> : null}
                    <PostBoard 
                        destination={"profile"} 
                        postsOwner={user.userID}
                        // isYourProfile={this.isYourProfile(app.getUserID(), user.userID)}
                    />
                </Wrapper>
            </StyledContainer>
        )
    }
}

export default Profile;