import React, { Component } from "react";
import app from '../../Components/base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUser, faExclamationCircle } from '@fortawesome/free-solid-svg-icons'

class Login extends Component {
    constructor(props) {
        super(props)
        this.logIn = this.logIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateAnchor = this.handleCreateAnchor.bind(this);

        this.state = {
            isPasswordCorrect: true,
            isEmailCorrect: true,
            isLoginForm: true,
            password: "",
            email: "",
            nick: "",
        }
    }

    logIn(e) {
        e.preventDefault();
        app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user)
        })
        .catch((error) => {
            this.setState({
                isEmailCorrect: true,
                isPasswordCorrect: true 
            })
            if(error.code == "auth/invalid-email") {
                this.setState({
                    isEmailCorrect: false 
                })
            } else if(error.code == "auth/wrong-password") {
                this.setState({
                    isPasswordCorrect: false
                })
            }
            console.log(error);
        });
        
    }

    signUp(e) {
        e.preventDefault();
        app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(result => {
            return result.user.updateProfile({
                displayName: this.state.nick
            })
        })
        .catch((error) => {
            // validation
            this.setState({
                isEmailCorrect: true,
                isPasswordCorrect: true 
            })
            if(this.state.password == "") {
                this.setState({
                    isPasswordCorrect: false
                })
            }
            if(error.code == "auth/invalid-email" || error.code == "auth/email-already-in-use") {
                this.setState({
                    isEmailCorrect: false 
                })
            } else if(error.code == "auth/weak-password") {
                this.setState({
                    isPasswordCorrect: false
                })
            }
            // console.log(error.code);
        });
    }
 
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCreateAnchor() {
        this.setState({
            isLoginForm: !this.state.isLoginForm,
            isEmailCorrect: true,
            isPasswordCorrect: true 
        })
    }
    render() {
        const { isLoginForm, nick, email, password, isPasswordCorrect, isEmailCorrect } = this.state;
        return (
            <section className="login">
                <form className="form">
                    
                    {/* {!isLoginForm ? 
                        <input 
                            className="form__name form__input" 
                            type="nick" 
                            name="nick"
                            placeholder="nick" 
                            onChange={this.handleChange} 
                            value={nick}
                        /> : null
                    }
                         */}
                    <div className="form__email-container">
                        <input 
                            className="form__email form__input" 
                            type="email" 
                            name="email"
                            placeholder="email" 
                            onChange={this.handleChange} 
                            value={email}
                        />
                        <span className="form__validation-icon">
                            {isEmailCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
                        </span> 
                    </div>

                    <div className="form__password-container">
                        <input 
                            className="form__password form__input" 
                            type="password" 
                            name="password"
                            placeholder="password" 
                            onChange={this.handleChange} 
                            value={password}
                        />   
                        <span className="form__validation-icon">
                            {/* <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>        */}
                            {isPasswordCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
                        </span>    
                    </div>

                    {isLoginForm ?  
                        <button className="form__button" onClick={this.logIn}> Log in </button> :
                        <button className="form__button" onClick={this.signUp}> Sign up </button>
                    }
                    
                    <a className="form__create-link" href="#" onClick={this.handleCreateAnchor}>
                        {isLoginForm ? "Create account" : "Log in"}
                    </a>
                        
                    <div className="form__logo">
                        {isLoginForm ? 
                            <FontAwesomeIcon icon={faUser} color="#005D95" style={{fontSize:60}}/> : 
                            <FontAwesomeIcon icon={faUserPlus} color="#005D95" style={{fontSize:60}}/>
                        }
                    </div>
                </form>
            </section>
        );
    }
}

export default Login