import React, { Component } from "react";
import app from "../../base";
import styled from "styled-components";
import ShareBox from "../../Components/shareBox";
import PostBoard from "../MyPosts/postBoard";
import Messanger from '../Messanger/messanger';
import * as styleHelpers  from '../../Components/styleHelpers';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  
    faImages, 
    faPenSquare, 
    faCameraRetro, 
    faExternalLinkSquareAlt
} from '@fortawesome/free-solid-svg-icons';
import helpers from "../../Components/helpers";

const RWD = styleHelpers.RWD;
const flexCenter = styleHelpers.flexCenter;
const variables = styleHelpers.variables;

const frontActive = {
    transform:  "rotateY(360deg)",
    zIndex: 1
}
const backActive = {
    transform: "rotateY(180deg)"
}


const Wrapper = styled.div`
    position: relative;
    ${flexCenter};
    flex-direction: column;
    width: 100%;
    max-width: 500px;
`

const Container = styled.section`
    ${flexCenter}
    justify-content: flex-start;
    flex-direction: column;
    position: fixed;
    top: 64px;
    left: 0;
    height: calc(100vh - 64px);
    width: 100%;
    background-color: ${variables.$lightGray};
    padding: .5em;
    overflow-y: scroll;
`

const ProfileCard = styled.div`
    ${flexCenter};
    position: relative;
    width: 100%;
    max-width: 500px;
    height: 500px;
    margin-bottom: .5em;

    @media only screen and (min-width: ${RWD.$desktop}) {
        position: absolute;
        width: 320px;
        height: 522px;
        top: .05em;
        right: calc(100% + 1em);
    }
`

const Frontside = styled.div`
    ${flexCenter}
    flex-direction: column;
    width: 100%;
    height: 100%;
    transition: .3s linear;
    transform-origin: center;
    backface-visibility: hidden;
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    z-index: 1;
`
const Backside = styled.div`
    ${flexCenter};
    justify-content: space-between;
    flex-direction: column;
    position: absolute;
    width: 100%;
    height: 100%;
    transition: .3s linear;
    transform-origin: center;
    transform:  rotateY(180deg);
    background-color: ${variables.$blue};
    box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
    z-index: -1;
`
const PhotoBox = styled.section`
    ${flexCenter}
    flex-direction: column;
    position: relative;
    width: 100%;
    flex: 1;
    transition: .5s linear;
    background-color: ${variables.$blue};
    overflow: hidden;
`

const Photo = styled.img`
    width: 12em;
    height: 12em;
    border-radius: 50%;
    margin-bottom: 1em;
`

const Nick = styled.span`
    font-size: 1.5em;
    font-weight: bold;
    color: ${variables.$grayBlue};
    line-height:1;
`
const ButtonBox = styled.div`
    ${flexCenter}
    justify-content: flex-end;
    width: 100%;
    border-top: .1em solid ${variables.$lightGray};
    background-color: white;
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
const Input = styled.input`
    width: 100%;
    height: 35px;
    font-size: 1em;
    font-weight: bold;
    border-radius: .2em;
    background-color: white;
    border: none;
    padding: 0 .3em;
    color: ${variables.$grayBlue};
    &::placeholder {
        color: ${variables.$blue};
        font-weight: 100;
    }
`
const Caption = styled.h2`
    color: white;
    font-size: 1.5em;
    text-align: left;
`
const DataItem = styled.h2`
    color: white;
    font-size: 1.5em;
    text-align: left;
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
            isRotateCard: false,
            isEditButtonActive: true,
            image: "",
            nick: "",
            age: "",
            url: "",
            sex: "-",
            weight: "-",
            height: "-",
            yourSport: "-",
            priority: "-",
            trainingExperience: "-",
            aboutMe: "-",
        }
    }

    componentDidMount() {
        this._isMounted = true;
        this.setProfileData(); // at the beginning function pull out data from Realtime database
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
   
    rotateCardHandler() {
        this.setState(prevState => ({
            isRotateCard: !prevState.isRotateCard
        }))
    }
    editButtonHandler() {
        this.setState(prevState => ({
            isEditButtonActive: !prevState.isEditButtonActive
        }))
    }

    
    // function invoke on button
    updateProfileData(e) {
        e.preventDefault();
        const { sex, weight, height, yourSport, priority, trainingExperience, aboutMe } = e.target.elements;

        // update profileData in realtime database 
        app.getRootRef("users").child(app.getUserID()).update({
            nick: this.state.nick,
            age: this.state.age,
            url: this.state.url,
            sex: sex.value,
            weight: weight.value,
            height: height.value,
            yourSport: yourSport.value,
            priority: priority.value,
            trainingExperience: trainingExperience.value,
            aboutMe: aboutMe.value
        });

        this.setState({
            isEditButtonActive: !this.state.isEditButtonActive,
            nick: this.state.nick,
            age: this.state.age,
            url: this.state.url,
            sex: sex.value,
            weight: weight.value,
            height: height.value,
            yourSport: yourSport.value,
            priority: priority.value,
            trainingExperience: trainingExperience.value,
            aboutMe: aboutMe.value,
        })   
    } 
    getText = (caption, profileData, unit="") => {
        return `${caption}: ${profileData}${unit}`;
    }
    renderProfileBox() {
        const { sex,
            weight,
            height,
            trainingExperience,
            priority,
            yourSport,
            aboutMe
        } = this.state;
        return ( 
            <ProfileBox>
                <DataItem> { this.getText("Płeć", sex) } </DataItem>
                <DataItem> { this.getText("Waga", weight, "kg") } </DataItem>
                <DataItem> { this.getText("Wzrost", height, "cm") } </DataItem>
                <DataItem> { this.getText("Staż tren.", trainingExperience, "l") } </DataItem>
                <DataItem> { this.getText("Priorytet", priority) } </DataItem>
                <DataItem> { this.getText("Sport",yourSport) } </DataItem>
                <DataItem style={{marginTop: "1.5em"}}> { this.getText("O mnie", aboutMe) } </DataItem>
            </ProfileBox>
        )
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

    setPhotoURL() {
        const { image } = this.state;
        const userID = app.getUserID();
        const uploadTask = app.getStorage().ref(`users/${userID}/profilePhoto`).put(image);
        const usersRef = app.getRootRef("users");
        const postsRef = app.getRootRef("posts");
        const commentsRef = app.getRootRef("comments");
        
        uploadTask.on('state_changed', () => {
            app.getStorage().ref(`users/${userID}`).child(`profilePhoto`).getDownloadURL().then(URL => {
                this.setState({
                    url: URL
                }, ()=>{

                    //  update photo in users after its change
                    usersRef.child(app.getUserID()).update({
                        url: this.state.url
                    });
        
                    // update photo in posts after its change
                    postsRef.on('value', snapshot => {
                        const posts = snapshot.val();
                        for(let post in posts) {
                            if(posts[post].userID === userID) {
                                postsRef.child(post).update({
                                    url: this.state.url
                                })
                            }
                        }
                    });
        
                    // update photo in comments after its change
                    commentsRef.on('value', snapshot => {
                        const comments = snapshot.val();
                        for(let comment in comments) {
                            if(comments[comment].userID === userID) {
                                commentsRef.child(comment).update({
                                    url: this.state.url
                                })
                            }
                        }
                    });
            })
          }) 
      });
    }



    
    //////// Realtime Database /////////
    setProfileData() {
        const rootRef = app.getRootRef("users");
        const userID = this.props.user.userID;
        rootRef.child(userID).orderByKey().on("value", snapshot => {
            if(this._isMounted) {
                this.setState({
                    nick:  snapshot.val().nick,
                    age:  snapshot.val().age,
                    url:  snapshot.val().url,
                    sex:  snapshot.val().sex,
                    weight:  snapshot.val().weight,
                    height:  snapshot.val().height,
                    yourSport:  snapshot.val().yourSport,
                    trainingExperience:  snapshot.val().trainingExperience,
                    priority:  snapshot.val().priority,
                    aboutMe:  snapshot.val().aboutMe
                })
            }
        })
    }




    render() {
        const { isRotateCard, isEditButtonActive, nick, age, url } = this.state;
        return (
            <Container>
                <Wrapper>
                    <ProfileCard>
                        <Frontside style={isRotateCard ? backActive : null}>
                            <PhotoBox>
                                <Photo src={url}></Photo>
                                <Nick> { app.getCurrentUser() ? `${helpers.capitalizeFirstLetter(nick)}, ${age}l` : null} </Nick>
                            </PhotoBox>
                            <ButtonBox>
                                <FontAwesomeIcon icon={faCameraRetro} style={{fontSize: 35, margin: '.1em'}} color={variables.$grayBlue} />
                                <label>
                                    <FontAwesomeIcon icon={faImages} style={{fontSize: 35, margin: '.1em'}} color={variables.$grayBlue} />
                                    <input type="file" style={{display: "none"}} onChange={(e) => this.choosePhoto(e)}/>
                                </label>
                                <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{fontSize: 35, margin: '.1em'}} color={variables.$grayBlue}  onClick={this.rotateCardHandler.bind(this)}/>
                            </ButtonBox>
                        </Frontside>
                        <Backside style={isRotateCard ? frontActive : null}>
                            {isEditButtonActive ? 
                                <AddBox onSubmit={(e) => {this.updateProfileData(e)}}>
                                    <Caption> Podstawowe dane: </Caption>
                                    <Input name="sex" placeholder="Płeć" required></Input>
                                    <Input name="trainingExperience" type="Number" placeholder="Staż tren." required></Input>
                                    <Input name="weight" type="number" placeholder="Waga" required></Input>
                                    <Input name="height" type="number" placeholder="Wzrost" required></Input>
                                    <Input name="priority" placeholder="Priorytet" required></Input>
                                    <Input name="yourSport" placeholder="Sport" required></Input>
                                    <About name="aboutMe" placeholder="O mnie"></About>
                                    <styleHelpers.Button>Zapisz</styleHelpers.Button>
                                </AddBox> : this.renderProfileBox()}
                                <ButtonBox>
                                    <FontAwesomeIcon icon={faPenSquare} style={{fontSize: 35, margin: '.1em'}} color={variables.$grayBlue} onClick={this.editButtonHandler.bind(this)}/>
                                    <FontAwesomeIcon icon={faExternalLinkSquareAlt} style={{fontSize: 35 , margin: '.1em'}} color={variables.$grayBlue}  onClick={this.rotateCardHandler.bind(this)}/>
                                </ButtonBox>
                        </Backside>
                    </ProfileCard>
                    <ShareBox/>
                    <PostBoard destination={"profile"}/>
                </Wrapper>
                {/* <Messanger /> */}
            </Container>
        )
    }
}

export default Profile;