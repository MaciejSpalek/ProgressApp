import React, { useCallback, useContext } from "react";
import app from "../../base";
import Button from '../../Components/Button';
import InputLabel from '../../Components/InputLabel';
import { Logo, Container, Form, labelStyle, inputStyle, buttonStyle, variables } from "../../Components/styleHelpers";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../../Auth";
import { Link } from "react-router-dom";


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
        <InputLabel
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
          text={"Zaloguj"}
          style={buttonStyle}
        />
        <Link style={{color: "white", fontWeight: "bold", fontSize: "1.3em"}} to="/signup">
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
