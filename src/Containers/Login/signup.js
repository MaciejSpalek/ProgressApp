import React, { useCallback } from "react";
import app from "../../base";
import { Logo, Container, Form, Input, Button } from "../../Components/styleHelpers"
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { variables } from "../../Components/styleHelpers";
import userPhoto from "../../images/userPhoto.svg";

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
            nick: nick.value,
            userID: app.getUserID(),
            age: age.value,
            url: userPhoto,
            isLogged: true,
            sex: "-",
            weight: "-",
            height: "-",
            yourSport: "-",
            trainingExperience: "-",
            priority: "-",
            aboutMe: "-"
        })

      await app
        .getDatabase()
        .collection("users")
        .doc(app.getUserID())
        .set({ 
          // measurement: []
        });

        history.push("/");
    },
    [history]
  );

  return (
    <Container>
      <Form onSubmit={handleSignUp}>
        <Input type="text" name="nick" placeholder="nick" required></Input>
        <Input type="text" name="age" placeholder="age" required></Input>
        <Input type="email" name="email" placeholder="email" required></Input>
        <Input type="password" name="password" placeholder="hasło" required></Input>
        <Button> Stwórz </Button>
        <Link style={{color: "white", fontWeight: "bold"}} to="/login">
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
