import React, { Component } from "react";
import app from '../../Components/base';

class Home extends Component {
    constructor(props) {
        super(props)
    }
    async logout() {
        await app.logout();
    }
  
    render() {
        return (
            <>
            <div className = "main">
            </div>
            </>
        )
    }
}

export default Home;