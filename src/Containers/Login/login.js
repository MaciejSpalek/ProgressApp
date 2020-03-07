// import React, { Component } from "react";
// import app from '../../Components/base'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

// class Login extends Component {
//     constructor(props) {
//         super(props)
//         this.logIn = this.logIn.bind(this);
//         this.handleChange = this.handleChange.bind(this);
//         this.handleCreateAnchor = this.handleCreateAnchor.bind(this);
//         this.state = {
//             isPasswordCorrect: true,
//             isEmailCorrect: true,
//             isLoginForm: true,
//             password: "",
//             email: "",
//         }
//     }

//     logIn(e) {
//         e.preventDefault();
//         const { email, password } = this.state;
//         app.login(email, password)
//         .then(user => {
//         })
//         .catch((error) => {
//             this.setState({
//                 isEmailCorrect: true,
//                 isPasswordCorrect: true 
//             })
//             if(error.code == "auth/invalid-email") {
//                 this.setState({
//                     isEmailCorrect: false 
//                 })
//             } else if(error.code == "auth/wrong-password") {
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
//                     <button className="form__button"  onClick={this.logIn} > Zaloguj </button> 
//                     <a className="form__create-link">Stwórz konto</a>
//                     <div className="form__logo">
//                         <FontAwesomeIcon icon={faUser} color="#005D95" style={{fontSize:60}}/>
//                     </div>
//                 </form>
//             </section>
//         );
//     }
// }

// export default Login




import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import { Link } from "react-router-dom";
import app from "../../Components/base"
import { AuthContext } from "../../Auth"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

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
    // console.log(currentUser)
  if (currentUser) {
    return <Redirect to="/" />;
  }
//   const { email, password, isPasswordCorrect, isEmailCorrect } = this.state;
  return (
    <section className="login">
        <form className="form" onSubmit={handleLogin}>
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
            <button className="form__button"> Zaloguj </button> 
            <Link to="/signup" className="form__link">
                Stwórz konto
            </Link>
            <div className="form__logo">
                <FontAwesomeIcon icon={faUser} color="#005D95" style={{fontSize:60}}/>
            </div>
        </form>
    </section>
  );
};

export default withRouter(Login);
