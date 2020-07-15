import React, { useState, useEffect } from 'react';
import Navbar from './Containers/navbar/navbar';
import Login from './Containers/Login/login';
import SignUp from './Containers/Login/signup';
import Home from './Containers/Home/home';
import Measurements from './Containers/Measurements/measurements';
import Profile from './Containers/Profile/profile'
import Messanger from './Containers/Messanger/messanger';
import PlanBoard from './Containers/TrainingPlans/Plan/planBoard'
import PrivateRoute from "./PrivateRoute";
import { AuthProvider, AuthContext } from "./Auth";
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.scss';
import app from './base';


const App = () => {
    const [ usersData, setUsersData ] = useState([]);
    const renderProfile = () => {
      return usersData.map((user, index) => {
        return (
          <PrivateRoute
            exact 
            key={index}  
            path={`/${user.nick}`} 
            component={()=> <Profile usersData={usersData} user={user} />} 
          />
        )
      })
    }

    useEffect(()=> {
      app.getRootRef('users').on("child_added", snapshot => {
        app.getAllUsers((tempArray) => {
          setUsersData(tempArray)
        })
      })
    }, [usersData.length]) 

    return (
      <div className="App">
          <AuthProvider>
            <AuthContext.Consumer>
              { currentUser => (
                <Router>  
                  <Navbar 
                    user={currentUser} 
                    usersData={usersData}
                  />
                  <Switch>
                      {renderProfile()}
                      <PrivateRoute exact path="/" component={()=> <Home usersData={usersData} />} />
                      <PrivateRoute exact path="/plany" component={PlanBoard}/>
                      <PrivateRoute exact path="/wymiary" component={Measurements}/>
                      <PrivateRoute exact path="/messanger" component={Messanger}/>
                      <Route exact path="/signup" component={SignUp} />
                      <Route exact path="/login" component={Login} />
                  </Switch>
                </Router> 
              )}
            </AuthContext.Consumer>
          </AuthProvider>
      </div>
    )
}
  

export default App;
