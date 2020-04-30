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
      // console.log(usersData) // render all time 
      return usersData.map((user, index) => {
        return (
          <PrivateRoute
            data={{user}}
            exact 
            key={index}  
            path={`/${user.nick}`} 
            component={Profile}
          />
        )
      })
    }

    useEffect(()=> {
      app.getAllUsers((tempArray) => {
        setUsersData(tempArray)
      })
    }, [usersData])


    return (
      <div className="App">
          <AuthProvider>
            <AuthContext.Consumer>
              { currentUser => (
                <Router>  
                  <Navbar user={currentUser} usersData={usersData}/>
                  <Switch>
                      <PrivateRoute exact path="/" component={Home} />
                      {renderProfile()}
                      <PrivateRoute exact path="/planBoard" component={PlanBoard}/>
                      <PrivateRoute exact path="/measurements" component={Measurements}/>
                      <PrivateRoute exact path="/messanger" component={Messanger}/>
                      <Route path="/signup" component={SignUp} />
                      <Route path="/login" component={Login} />
                  </Switch>
                </Router> 
              )}
            </AuthContext.Consumer>
          </AuthProvider>
      </div>
    )
}
  

export default App;
