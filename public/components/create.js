import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import LcarsImage from '../css/images/LcarsNetwork.png';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';


let bigDiv = {
  backgroundColor: 'black',
  position: "fixed",
  height: "100%",
  width: "100%"
}

let buttonStyle = {width:"150px",height: "50px", position: "relative",
    display: "block", margin: "auto", borderRadius: "8px", fontSize: 16, background: "white" };

export default class CreateAccount extends React.Component{
  constructor(){
    super();
    this.state = {email:"", password:"", confirmPassword:"", redirect:false, unMount: false, userID: null};
    this.handleEmail = this.handleEmail.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);

  }
  componentWillMount(){
    this.checkUser = firebase.auth().onAuthStateChanged(function(user) {
      this.setState({unMount: true})
      if (user) {
          alert('Account Created');

          this.setState({redirect: true});
          console.log(user.uid);

      } else {
        // No user is signed in.
      }
    }.bind(this));

  }
  handleEmail(event){
    this.setState({email: event.target.value});
  }
  handlePass(event){
    this.setState({password: event.target.value});
  }
  handleConfirm(event){
    this.setState({confirmPassword: event.target.value});
  }
  buttonClick(){
    if(this.state.password === this.state.confirmPassword){
      firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function(error) {
          let errorCode = error.code;
          let errorMessage = error.message;
          alert(errorMessage);

          // ...
        })

      }
    else{
      alert("Passwords do not match!");
    }






    // console.log(this.state.email);
    // console.log(this.state.password);
    // console.log(this.state.confirmPassword);
  }
  render(){
    if(this.state.redirect){
      console.log("Working!");
      return <Redirect to="/home" />
    }
    return (
      <div style ={bigDiv}>
        <div style = {{marginLeft: "auto", marginRight: "auto", textAlign: "center", marginTop:"25px", display: "block"}}>
          <img src = {LcarsImage}></img>
        <p><input type = "text" placeholder = "Email" onChange = {this.handleEmail} /></p>
        <p><input type = "password" placeholder = "Password" onChange ={this.handlePass} /></p>
        <p><input type = "password" placeholder = "Confirm Password" onChange = {this.handleConfirm}/></p>
        <p><button style ={buttonStyle} type="button" onClick = {this.buttonClick}>Sign Up</button></p>
        </div>
      </div>
    )

  }
  componentWillUnmount(){
    if(this.state.unMount){
    this.checkUser();
    }
  }


}
