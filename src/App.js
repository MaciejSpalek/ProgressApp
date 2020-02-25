import React, { Component } from 'react';
import Login from './Containers/Login/login';
import Home from './Containers/Home/home';
import app from './Components/base'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {}
    }
  }
  
  componentDidMount() {
    this.authListener();
  }

  authListener() {
    app.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    });
  }

  render() {
    return (
    <div className="App">
      {this.state.user ? (<Home/>): (<Login/>)}
    </div>
    );
  }
}

export default App;
