import React, { useCallback } from "react";
import app from "../../base";
import Button from '../../Components/Button'
import Input from '../../Components/input';
import InputLabel from "../../Components/InputLabel";
import userPhoto from "../../images/userPhoto.svg";
import helpers from "../../Components/helpers";
import { Logo, Container, Form } from "../../Components/styleHelpers"
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { variables, labelStyle, inputStyle, buttonStyle } from "../../Components/styleHelpers";



const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, nick, age} = event.target.elements;
      const photoFile = new File([""], userPhoto);

      await app
        .getApp()
        .auth()
        .createUserWithEmailAndPassword(email.value, password.value)
  
      await app.getStorage().ref(`users/${app.getUserID()}/profilePhoto`).put(photoFile);
      
      await app
        .getRootRef("users")
        .child(app.getUserID())
        .set({
          dateOfCreation: helpers.getCurrentDate(new Date(), "."),
          userID: app.getUserID(),
          nick: nick.value,
          age: age.value,
          url: userPhoto,
          isLogged: true,
          trainingExperience: "-",
          description: "-",
          weight: "-",
          height: "-",
          sex: "-"
        })

      await app
        .getDatabase()
        .collection("users")
        .doc(app.getUserID())
        .set({ 
          measurement: []
        });

        history.push("/");
    },
    [history]
  );

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <InputLabel
          labelStyle={labelStyle}
          style={inputStyle}
          text={"Nick"} 
          type={"text"} 
          name={"nick"}
          maxLength={20}
          handleFunction={()=> {}} 
          isRequired={true}
        />
        <InputLabel
          min={1}
          max={200}
          labelStyle={labelStyle}
          style={inputStyle}
          text={"Wiek"} 
          type={"number"} 
          name={"age"} 
          handleFunction={()=> {}}
          isRequired={true}
        />
        <InputLabel
          maxLength={50}
          labelStyle={labelStyle}
          style={inputStyle}
          text={"Email"} 
          type={"email"} 
          name={"email"} 
          handleFunction={()=> {}}
          isRequired={true}
        />
        <InputLabel
          labelStyle={labelStyle}
          style={inputStyle}
          text={"Hasło"} 
          type={"password"} 
          name={"password"} 
          handleFunction={()=> {}}
          isRequired={true}
        />
 
        <Button 
          handleClick={()=> {}} 
          text={"Stwórz"}
          style={buttonStyle}
        />
        <Link style={{color: "white", fontWeight: "bold", fontSize: "1.3em"}} to="/login">
          Przejdź do logowania
        </Link>
        <Logo>
        <FontAwesomeIcon
          icon={faUserPlus}
          color={variables.$gray}
          style={{ fontSize: 60 }}
        />
      </Logo>
      </Form>
    </Container>
  );
};

export default withRouter(SignUp);
