// import React, { Component } from "react";
// import app from '../../Components/base'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUserPlus,  faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
// import { BrowserRouter as Link, Route } from 'react-router-dom';

// class SignUp extends Component {
//     constructor(props) {
//         super(props)
//         this.signUp = this.signUp.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.state = {
//             isPasswordCorrect: true,
//             isEmailCorrect: true,
//             isLoginForm: true,
//             password: "",
//             email: "",
//         }
//     }

//     signUp(e) {
//         e.preventDefault();
//         const { email, password } = this.state;
//         app.signUp(email, password).then(cred => {
//             // create document for user and create default fields
//             return app.getDatabase().collection('users').doc(cred.user.uid).set({
//                 measurement: []
//             })
//         })
//         .catch((error) => {
//             // validation
//             this.setState({
//                 isEmailCorrect: true,
//                 isPasswordCorrect: true
//             })
//             if(password == "") {
//                 this.setState({
//                     isPasswordCorrect: false
//                 })
//             }
//             if(error.code == "auth/invalid-email" || error.code == "auth/email-already-in-use") {
//                 this.setState({
//                     isEmailCorrect: false
//                 })
//             } else if(error.code == "auth/weak-password") {
//                 this.setState({
//                     isPasswordCorrect: false
//                 })
//             }
//         });
//     }
//     handleChange(e) {
//         this.setState({
//             [e.target.name]: e.target.value
//         })
//     }
//     handleCreateAnchor() {
//         this.setState({
//             isLoginForm: !this.state.isLoginForm,
//             isEmailCorrect: true,
//             isPasswordCorrect: true
//         })
//     }
//     render() {
//         const { email, password, isPasswordCorrect, isEmailCorrect } = this.state;
//         return (
//             <section className="login">
//                 <form className="form">
//                     <div className="form__email-container">
//                         <input
//                             className="form__email form__input"
//                             type="email"
//                             name="email"
//                             placeholder="email"
//                             onChange={this.handleChange}
//                             value={email}
//                         />
//                         <span className="form__validation-icon">
//                             {isEmailCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
//                         </span>
//                     </div>

//                     <div className="form__password-container">
//                         <input
//                             className="form__password form__input"
//                             type="password"
//                             name="password"
//                             placeholder="hasło"
//                             onChange={this.handleChange}
//                             value={password}
//                         />
//                         <span className="form__validation-icon">
//                             {isPasswordCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
//                         </span>
//                     </div>
//                     <button className="form__button" onClick={this.signUp}> Stwórz </button>
//                     <a className="form__create-link"> Przejdź do logowania </a>

//                     <div className="form__logo">
//                         <FontAwesomeIcon icon={faUserPlus} color="#005D95" style={{fontSize:60}}/>
//                     </div>
//                 </form>
//             </section>
//         );
//     }
// }

// export default SignUp

import React, { useCallback } from "react";
import app from "../../Components/base";
import styled from "styled-components";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { variables, flexCenter } from "../../Components/styleHelpers";
// ,  faExclamationCircle



const LoginContainer = styled.section`
  ${flexCenter};
  position: fixed;
  top: 64px;
  left: 0;
  width: 100%;
  height: calc(100vh - 64px);
  background-color: ${variables.$blue};
`

const Form = styled.form`
  ${flexCenter};
  position: relative;
  justify-content: space-evenly;
  flex-direction: column;
  width: 250px;
  height: 300px;
  background-color: ${variables.$grayBlue};
  border-radius: .5em;
  padding: 4em 1em 1em 1em;
`

export const Logo = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0.8em;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  border: 0.2em solid ${variables.$grayBlue};
  background-color: ${variables.$blue};
`

export const Input = styled.input`
  background-color: white;
  color: ${variables.grayBlue};
  width: 100%;
  height: 35px;
  font-size: 1em;
  font-weight: bold;
  border-radius: 0.2em;
  border: none;
  padding: 0 0.3em;
  &::placeholder {
    color: ${variables.blue};
    font-weight: 100;
  }
`

export const Button = styled.button`
  background-color: ${variables.orange};
  color: white;
  border: none;
  height: 35px;
  width: 100%;
  border-radius: 0.2em;
  font-size: 1em;
  font-weight: bold;
  padding: 0 0.3em;
  cursor: pointer;
`




const SignUp = ({ history }) => {
  const handleSignUp = useCallback(
    async event => {
      event.preventDefault();
      const { email, password, nick} = event.target.elements;
      try {
        await app
          .getApp()
          .auth()
          .createUserWithEmailAndPassword(email.value, password.value)
          .then(result => {
            return result.user.updateProfile({
              displayName: nick.value
            })
          })
        history.push("/");
        return app
          .getDatabase()
          .collection("users")
          .doc(app.getCurrentUser().uid)
          .set({ measurement: [] });
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  return (
    <LoginContainer>
      <Form onSubmit={handleSignUp}>
        <Input type="text" name="nick" placeholder="nick"></Input>
        <Input type="email" name="email" placeholder="email"></Input>
        <Input type="password" name="password" placeholder="hasło"></Input>
        <Button className="form__button"> Stwórz </Button>
        <Link to="/login" className="form__link">
          Przejdź do logowania
        </Link>
        <Logo>
        <FontAwesomeIcon
          icon={faUserPlus}
          color={variables.$grayBlue}
          style={{ fontSize: 60 }}
        />
      </Logo>
      </Form>
    </LoginContainer>
  );
};

export default withRouter(SignUp);
