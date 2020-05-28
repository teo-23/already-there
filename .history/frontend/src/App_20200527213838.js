// App.js

import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom';

import TrailsList from './components/trails/TrailsList';
import Navbar from './components/navbar/Navbar';
import TrailDetails from './components/trails/TrailDetails';

import Signup from './components/auth/Signup';
import AuthService from './service/auth-service';
import Login from './components/auth/Login';
import GoogleMaps from './components/Googlemaps/Googlemaps';

import Footer from './components/Footer/Footer'

class App extends Component {
  constructor(props){
    super(props)
    this.state = { loggedInUser: null };
    this.service = new AuthService();
  }
 
  fetchUser(){
    if( this.state.loggedInUser === null ){
      this.service.loggedin()
      .then(response =>{
        this.setState({
          loggedInUser:  response
        }) 
      })
      .catch( err =>{
        this.setState({
          loggedInUser:  false
        }) 
      })
    }
  }
 
  getTheUser= (userObj) => {
    this.setState({
      loggedInUser: userObj
    })
  }
 
  render() {
    this.fetchUser()
    if(this.state.loggedInUser){
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          <Switch> 
            {/* <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/> */}
            <Route exact path="/trails" component={TrailsList}/>
            <Route exact path="/trails/:id" component={TrailDetails} />
            {/* <Route exact path="/PROFILE/:id" component={PROFILE} />       */}
          </Switch>
          
        </div>
      );
    } else {
      return (
        <div className="App">
          <Navbar userInSession={this.state.loggedInUser} />
          
          <Switch>
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            <Route exact path='/signup' render={() => <Signup getUser={this.getTheUser}/>}/>
            <Route exact path='/login' render={() => <Login getUser={this.getTheUser}/>}/>
            <Route exact path="/trails" component={TrailsList}/>
            <Route exact path="/trails/:id" component={TrailDetails} />
          </Switch>

          <GoogleMaps />

          <Footer />
        </div>
      );
    }
  }
}
export default App;