import React from 'react';
import ReactDOM from 'react-dom';
import NavBar from './components/sideBar.js';
import HomePage from './components/homepage.js';
import LoginPage from './components/logIn.js';
import CreatePage from './components/create.js';
import ViewerPage from './components/logViewer.js';
import PropTypes from 'prop-types';

import {BrowserRouter as Router, Route, Switch, Link} from 'react-router-dom';
import * as firebase from 'firebase'

const Home = () => <h1><Link to= "/about">Click Me</Link></h1>
const About = () => <div><NavBar /><h1>About Us</h1></div>
const Create = () => <div><h1>Create Page</h1></div>




//TODO: REMOVE NAVBAR FROM THE APP FUNCTION AND ADD TO SEPARATE COMPS
//THAT WAY YOU CAN'T NAVIGATE WITHOUT LOGGING IN



  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAKE8EUUoc2GPmrGAEL9yG1obONaOCnoBA",
    authDomain: "react-log.firebaseapp.com",
    databaseURL: "https://react-log.firebaseio.com",
    projectId: "react-log",
    storageBucket: "react-log.appspot.com",
    messagingSenderId: "393475920879"
  };


  firebase.initializeApp(config);


const App = () => (
  <Router>
    <div>
    <Route exact path ="/" component = {LoginPage} />
    <Route path ='/home' component = {HomePage} />
    <Route path ="/about" component = {About} />
    <Route path = "/create" component = {CreatePage} />
    <Route path = "/viewer" component = {ViewerPage} />
    </div>
  </Router>
)


export default App;



ReactDOM.render(<App />, document.getElementById('app'));
