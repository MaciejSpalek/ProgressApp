import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import { Logo, Container, Form, Input, Button } from "../../Components/styleHelpers"
import app from "../../Components/base"
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
      <Button> Zaloguj </Button>
      <Link to="/signup">
        Stwórz konto
      </Link>
      <Logo>
      <FontAwesomeIcon
        icon={faUser}
        color={variables.$grayBlue}
        style={{ fontSize: 60 }}
      />
    </Logo>
    </Form>
  </Container>
  );
};

export default withRouter(Login);
