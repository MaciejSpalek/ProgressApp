import React, { Component } from 'react';
import Navbar from './Containers/navbar/navbar';
import Login from './Containers/Login/login';
import SignUp from './Containers/Login/signup';
import Home from './Containers/Home/home';
import Measurements from './Containers/Measurements/measurements';
import Profile from './Containers/Profile/profile'
import Messanger from './Containers/Messanger/messanger';
import PlanBoard from './Containers/TrainingPlans/planBoard';
import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";
import app from "./Components/base";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';


  class App extends Component {
    _isMount = false;
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
      app.getApp().auth().onAuthStateChanged(user => {
          this.setState({
            user: user
          })  
      })
    }

    render() {
      return (
        <div className="App">
          <AuthProvider>
            <Router>  
              <Navbar user={this.state.user}/>
              <Switch>
                  <PrivateRoute exact path="/" component={Home} />
                  <PrivateRoute exact path="/profile" component={Profile}/>
                  <PrivateRoute exact path="/planBoard" component={PlanBoard}/>
                  <PrivateRoute exact path="/measurements" component={Measurements}/>
                  <PrivateRoute exact path="/messanger" component={Messanger}/>
                  <Route  path="/signup" component={SignUp} />
                  <Route  path="/login" component={Login} />
              </Switch>
            </Router> 
          </AuthProvider>
        </div>
      );
    }
  }
   
  


export default App;
