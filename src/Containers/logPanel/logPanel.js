import React from "react";
import classNames from "classnames";

class LogPanel extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return (
            <section className="logPanel">
                <form className="form">
                    <div className="form__input-box">
                        <input className="form__email form__input" type="email" placeholder="email"/>
                        <input className="form__password form__input" type="password" placeholder="password"/>
                    </div>
                    <div className="form__button-box">
                        <button className="form__button form__button--login">Log in</button>
                        <button className="form__button form__button--singUp">Sign up</button>
                        {/* <button className="form__button form__button--logOut">Log out</button> */}
                    </div>
                </form>
            </section>
        );
    }
}

export default LogPanel