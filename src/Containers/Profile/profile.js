import React, { Component } from "react";
import app from "../../base";
import styled from "styled-components";
import ShareBox from "../../Components/shareBox";
import PostBoard from "../MyPosts/postBoard";
import ProfileCard from './profileCard';
import SearchBox from '../../Components/searchBox';
import Form from './form';
import { 
    flexCenter, 
    variables, 
    Container 
}  from '../../Components/styleHelpers';




const StyledContainer = styled(Container)`
    justify-content: flex-start;
    flex-direction: column;
    overflow-y: scroll;
`

const Wrapper = styled.div`
    position: relative;
    ${flexCenter};
    flex-direction: column;
    width: 100%;
    max-width: 500px;
    padding: 0 .5em;
    
`

const AddBox = styled.form`
    display:grid;
    grid-template-columns: repeat(1, 1fr);
    grid-template-rows: repeat(15,1fr);
    grid-gap: .5em;
    width: 100%;
    padding: .5em;
    overflow-y: scroll;
`


const About = styled.textarea `
    width: 100%;
    height: 200px;
    font-size: 1.2em;
    font-weight: bold;
    border-radius: .2em;
    background-color: white;
    border: none;
    padding: .3em;
    resize: none;
    color: ${variables.$grayBlue};
    &::placeholder {
        color: ${variables.$blue};
        font-weight: 200;
    }
`
const ProfileBox = styled.div`
    ${flexCenter};
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: .5em;
    padding: .5em;
    overflow-y: scroll;
`






class Profile extends Component {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isEditButtonActive: true,
            trainingExperience: "-",
            description: "-",
            yourSport: "-",
            weight: "-",
            height: "-",
            sex: "-",
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
        const { 
            sex, 
            weight, 
            height,  
            description,
            trainingExperience, 
        } = e.target.elements;

        // update profileData in realtime database 
        app.getRootRef("users").child(app.getUserID()).update({
            nick: this.state.nick,
            age: this.state.age,
            url: this.state.url,
            sex: sex.value,
            weight: weight.value,
            height: height.value,
            description: description.value,
            trainingExperience: trainingExperience.value,
        });

        this.setState({
            nick: this.state.nick,
            age: this.state.age,
            url: this.state.url,
            sex: sex.value,
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
                    console.log("update: ", part)
                    ref.child(part).update({
                        url: this.state.url
                    });
                }
            }
        });
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

                //  update photo in users after its change
                this.updateLoop("users")

                // update photo in posts after its change
                this.updateLoop("posts")
                
                // update photo in comments after its change
                this.updateLoop("comments");
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
                    sex:  snapshot.val().sex,
                    weight:  snapshot.val().weight,
                    height:  snapshot.val().height,
                    description: snapshot.val().description,
                    trainingExperience:  snapshot.val().trainingExperience,
                })
            }
        })
    }




    render() {
        const { 
            isEditButtonActive
        } = this.state;

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
                    <Form handleFunction={(e) => this.updateProfileData(e)}/>}
                    <ShareBox />
                    <PostBoard destination={"profile"} />
                </Wrapper>
            </StyledContainer>
        )
    }
}

export default Profile;