import React, { Component } from 'react';
import Login from './Containers/Login/login';
import Home from './Containers/Home/home';
import app from './Components/base';
import Navbar from './Containers/navbar/navbar';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    }
  }
  
  componentDidMount() {
    this.authListener(); 
  }

  authListener() {
    app.getApp().auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user})
      } else {
        this.setState({user: null})
      }
    });
  }

  render() {
    // console.log(app.getApp())
    return (
    <div className="App">
        <Navbar/>
        {this.state.user ? (<Home/>): (<Login/>)}
    </div>
    );
  }
}

export default App;
