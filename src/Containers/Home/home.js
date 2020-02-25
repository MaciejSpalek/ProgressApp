import React, { Component } from "react";
import app from '../../Components/base';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    logout() {
        app.auth().signOut();
    }
 
    render() {
        return(
            <div>
               <h1>You are logged in !!! {app.auth().currentUser.displayName}</h1>
                <button onClick={this.logout}>Logout</button>
            </div>
            )
        }
    }

    export default Home;