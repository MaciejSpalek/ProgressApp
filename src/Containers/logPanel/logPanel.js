import React from "react";
import app from './base'

class LogPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            inputValueOfEmail: "",
            inputValueOfPassword: ""
        }

        this.logIn = this.logIn.bind(this);
        this.signUp = this.signUp.bind(this);
        this.updateInputValueOfEmail = this.updateInputValueOfEmail.bind(this);
        this.updateInputValueOfPassword = this.updateInputValueOfPassword.bind(this);
    }

    updateInputValueOfEmail(e) {
        this.setState({
          inputValueOfEmail: e.target.value
        });
    }
    updateInputValueOfPassword(e) {
        this.setState({
          inputValueOfPassword: e.target.value
        });
    }


    logIn(e) {
        e.preventDefault();

        const { inputValueOfEmail, inputValueOfPassword }  = this.state;
        const email = inputValueOfEmail;
        const password = inputValueOfPassword;

        app.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode, errorMessage);
          });
    }

    // create new User
    signUp(e) {
        e.preventDefault();

        const { inputValueOfEmail, inputValueOfPassword }  = this.state;
        const email = inputValueOfEmail;
        const password = inputValueOfPassword;

        app.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode, errorMessage);
        });
    }

    render() {
        // this.getCurrentUser()
        return (
            <section className="logPanel">
                <form className="form">
                    <div className="form__input-box">
                        <input 
                            className="form__email form__input" 
                            type="email" 
                            placeholder="email" 
                            onChange={e => this.updateInputValueOfEmail(e)} 
                            value={this.state.inputValueOfEmail}
                        />

                        <input 
                            className="form__password form__input" 
                            type="password" 
                            placeholder="password" 
                            onChange={e => this.updateInputValueOfPassword(e)} 
                            value={this.state.inputValueOfPassword}
                        />
                    </div>
                    <div className="form__button-box">
                        <button className="form__button form__button--login" onClick={(e) => this.logIn(e)}>Log in</button>
                        <button className="form__button form__button--singUp" onClick={(e) => this.signUp(e)}>Sign up</button>
                        {/* <button className="form__button form__button--logOut">Log out</button> */}
                    </div>
                </form>
            </section>
        );
    }
}

export default LogPanel