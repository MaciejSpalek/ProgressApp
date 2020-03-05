import React from 'react';

import Navbar from './Containers/navbar/navbar';
import Login from './Containers/Login/login';
import SignUp from './Containers/Login/signup';
import Home from './Containers/Home/home';

import PrivateRoute from "./PrivateRoute";
import { AuthProvider } from "./Auth";

import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.scss';

const App = ()=> {
    return (
      <div className="App">
        <AuthProvider>
          <Router>  
              <Navbar />
              <PrivateRoute exact path="/home" component={Home} />
              <Route exact path="/signup" component={SignUp} />
              <Route exact path="/login" component={Login} />
          </Router> 
        </AuthProvider>
      </div>
    );
  }


export default App;
