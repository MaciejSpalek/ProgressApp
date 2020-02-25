import React, { Component } from "react";
import app from '../../Components/base'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPlus } from '@fortawesome/free-solid-svg-icons'

class Login extends Component {
    constructor(props) {
        super(props)
        this.logIn = this.logIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.handleChange = this.handleChange.bind(this)
        this.state = {
            email: "",
            password: ""
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

    render() {
        return (
            <section className="login">
                <form className="form">
                    {/* <div className="form__input-box"> */}
                        <input 
                            className="form__email form__input" 
                            type="email" 
                            name="email"
                            placeholder="email" 
                            onChange={this.handleChange} 
                            value={this.state.email}
                        />
                        <input 
                            className="form__password form__input" 
                            type="password" 
                            name="password"
                            placeholder="password" 
                            onChange={this.handleChange} 
                            value={this.state.password}
                        />
                    {/* </div> */}
                    {/* <div className="form__button-box"> */}
                        <button className="form__button form__button--login" onClick={this.logIn}>Log in</button>
                        {/* <button className="form__button form__button--singUp" onClick={this.signUp}>Sign up</button> */}
                    {/* </div> */}
                    <div className="form__logo">
                        <FontAwesomeIcon icon={faUserPlus} color="#005D95" style={{fontSize:60}}/>
                    </div>
                </form>
            </section>
        );
    }
}

export default Login