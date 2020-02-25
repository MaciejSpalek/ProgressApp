import React, { Component } from "react";
import app from '../../Components/base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus, faUser } from '@fortawesome/free-solid-svg-icons'

class Login extends Component {
    constructor(props) {
        super(props)
        this.logIn = this.logIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleCreateAnchor = this.handleCreateAnchor.bind(this);
        this.state = {
            email: "",
            password: "",
            nick: "",
            buttonCaption: "Log in",
            anchorCaption: "Create account",
            isLoginForm: true,
        
        }
    }

    logIn(e) {
        e.preventDefault();
        app.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user)
        })
        .catch(function(error) {
            console.log(error);
        });
        
    }

    signUp(e) {
        e.preventDefault();
        app.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(user => {
            console.log(user)
        })
        .catch(function(error) {
            console.log(error);
        });
    }
 
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleCreateAnchor() {
        this.setState({isLoginForm: !this.state.isLoginForm}, () => {
            console.log(this.state.isLoginForm)
        })
        
    }
    render() {
        const { isLoginForm, nick, email, password, anchorCaption} = this.state;
        return (
            <section className="login">
                <form className="form">
                    
                        {!isLoginForm ? <input 
                            className="form__name form__input" 
                            type="nick" 
                            name="nick"
                            placeholder="nick" 
                            onChange={this.handleChange} 
                            value={nick}
                        /> : null}
                        
                        <input 
                            className="form__email form__input" 
                            type="email" 
                            name="email"
                            placeholder="email" 
                            onChange={this.handleChange} 
                            value={email}
                        />
                        <input 
                            className="form__password form__input" 
                            type="password" 
                            name="password"
                            placeholder="password" 
                            onChange={this.handleChange} 
                            value={password}
                        />
                        { isLoginForm ?  
                            <button className="form__button" onClick={this.logIn}> Log in </button> :
                            <button className="form__button" onClick={this.signUp}> Sign up </button>
                        }
                       
                        <a className="form__create-link" href="#" onClick={this.handleCreateAnchor}>
                            {isLoginForm ? "Create account" : "Log in"}
                        </a>
                        
                    {/* </div> */}
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