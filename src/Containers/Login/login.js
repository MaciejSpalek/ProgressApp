import React, { useCallback, useContext } from "react";
import app from "../../base"
import Button from '../../Components/Button'
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Logo, Container, Form, Input } from "../../Components/styleHelpers"
import { AuthContext } from "../../Auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { variables } from "../../Components/styleHelpers";


const Login = ({ history }) => {
  const handleLogin = useCallback(
    async event => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app.getApp().auth().signInWithEmailAndPassword(email.value, password.value);
        app.getRealTimeDatabase().ref("users").child(app.getUserID()).child("isLogged").set(true);
        history.push("/");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const currentUser = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <Container>
    <Form onSubmit={handleLogin}>
      <Input type="email" name="email" placeholder="email"></Input>
      <Input type="password" name="password" placeholder="hasło"></Input>
      <Button handleClick={()=> {}} text={"Zaloguj"}/>
      <Link style={{color: "white", fontWeight: "bold"}} to="/signup">
        Stwórz konto
      </Link>
      <Logo>
      <FontAwesomeIcon
        icon={faUser}
        color={variables.$gray}
        style={{ fontSize: 60 }}
      />
    </Logo>
    </Form>
  </Container>
  );
};

export default withRouter(Login);
