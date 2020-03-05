import React from 'react';

import Navbar from './Containers/navbar/navbar';
import Login from './Containers/Login/login';
import SignUp from './Containers/Login/signup';
import Home from './Containers/Home/home';
import Measurements from './Containers/Measurements/measurements'

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';

const App = ()=> {
    return (
      <div className="App">
        <AuthProvider>
          <Router>  
            <Navbar />
            <Switch>
                <PrivateRoute exact path="/" component={Home} />
                <Route exact path="/measurements" component={Measurements}/>
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/login" component={Login} />
            </Switch>
          </Router> 
        </AuthProvider>
      </div>
    );
  }


export default App;
