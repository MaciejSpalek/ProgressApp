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
        const { email, password } = this.state;
        app.login(email, password)
        .then(user => {
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
        });
        
    }
    signUp(e) {
        e.preventDefault();
        const { email, password } = this.state;
        app.signUp(email, password).then(cred => {
            // create document for user and create default fields
            return app.getDatabase().collection('users').doc(cred.user.uid).set({
                measurement: []
            })
        })
        .catch((error) => {
            // validation
            this.setState({
                isEmailCorrect: true,
                isPasswordCorrect: true 
            })
            if(password == "") {
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
                            placeholder="hasło" 
                            onChange={this.handleChange} 
                            value={password}
                        />   
                        <span className="form__validation-icon">
                            {isPasswordCorrect ? null : <FontAwesomeIcon icon={faExclamationCircle} color="#FF8E00" style={{fontSize:20}}/>}
                        </span>    
                    </div>

                    {isLoginForm ?  
                        <button className="form__button" onClick={this.logIn}> Zaloguj </button> :
                        <button className="form__button" onClick={this.signUp}> Stwórz </button>
                    }
                    
                    <a className="form__create-link" href="#" onClick={this.handleCreateAnchor}>
                        {isLoginForm ? "Nie masz konta ?" : "logowanie"}
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