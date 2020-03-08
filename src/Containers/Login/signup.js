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
import app from "../../Components/base"
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'
// ,  faExclamationCircle

const SignUp = ({ history }) => {
  const handleSignUp = useCallback(async event => {
    event.preventDefault();
    const { email, password } = event.target.elements;
    try {
      await app.getApp().auth().createUserWithEmailAndPassword(email.value, password.value);
      history.push("/");
    } catch (error) {
      alert(error);
    }
  }, [history]);

  return (
    <section className="login">
        <form className="form" onSubmit={handleSignUp}>
            <div className="form__email-container">
                <input 
                    className="form__email form__input" 
                    type="email" 
                    name="email"
                    placeholder="email"
                />
                {/* <span className="form__validation-icon">
                    {isEmailCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
                </span>  */}
            </div>

            <div className="form__password-container">
                <input 
                    className="form__password form__input" 
                    type="password" 
                    name="password"
                    placeholder="hasło" 
                />   
                {/* <span className="form__validation-icon">
                    {isPasswordCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
                </span>     */}
            </div>
            <button className="form__button"> Stwórz </button>
            <Link to="/login" className="form__link">
                Przejdź do logowania
            </Link>
            <div className="form__logo">
                <FontAwesomeIcon icon={faUserPlus} color="#005D95" style={{fontSize:60}}/>
            </div>
        </form>
    </section>
  );
};

export default withRouter(SignUp);
