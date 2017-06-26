import React from 'react';
import {Link} from "react-router-dom";
import * as firebase from "firebase";
import PropTypes from 'prop-types';

let divstyle = {
  backgroundColor: "#eee",
  padding: "20px",
  margin: "20px"

};

let linkSyle = {fontSize: 14, display: "inline-block",
  verticalAlign: "middle", backgroundColor: "#262626",
  textAlign: "center", margin: "0px", marginRight: "5px",
  padding: "14px 25px", textDecoration: "none", color: "white" };

  let logOutSyle = {fontSize: 14, display: "inline-block",
    verticalAlign: "middle", backgroundColor: "#262626",
    textAlign: "center", margin: "0px", marginRight: "0px",
    padding: "14px 25px", textDecoration: "none", color: "white", position: "absolute", right: "0px"};



 export class NavBarItem extends React.Component{
   render(){
     return <Link to = {this.props.url} style = {linkSyle}>{this.props.text}</Link>;
   }
 };


export default class NavBar extends React.Component{
  constructor(){
    super();
    this.logOut = this.logOut.bind(this);
  }
  logOut(){
    console.log(firebase.auth().currentUser.uid);
    firebase.auth().signOut().then(function() {

    //console.log('sign out worked!');
    }, function(error) {
      alert(error);
    });
  }
  render() {
    return (<div style = {{ backgroundColor: 'black', padding: "0px", width: "100%", margin: "0px", position: "relative", minWidth: "500px"}}>
      <NavBarItem url = "/home" text = "Home" />
      <NavBarItem url = "/viewer" text = "View Logs" />
      <NavBarItem url = "/calendar-view" text = "Calendar Viewer" />
      <NavBarItem url = "/about" text = "About" />


      <Link to = "/" style = {logOutSyle} onClick = {this.logOut}>Log Out</Link></div>)

  }

};
