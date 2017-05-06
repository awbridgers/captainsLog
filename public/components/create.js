import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Background from '../css/images/logInBackground.png';
import * as firebase from 'firebase';


var bigDiv = {
  backgroundImage: "url(" + Background + ")",
  position: "fixed",
  height: "100%",
  width: "100%"
}

var buttonStyle = {width:"150px",height: "50px", position: "relative",
    display: "block", margin: "auto", borderRadius: "8px", fontSize: 16 };

export default class CreateAccount extends React.Component{
  constructor(){
    super();
    this.state = {email:"", password:"", confirmPassword:""};
    this.handleEmail = this.handleEmail.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.handlePass = this.handlePass.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
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
    console.log(this.state.email);
    console.log(this.state.password);
    console.log(this.state.confirmPassword);
  }
  render(){
    return (
      <div style ={bigDiv}>
        <div style = {{marginLeft: "auto", marginRight: "auto", textAlign: "center", marginTop:"296px", display: "block"}}>
        <p><input type = "text" placeholder = "Email" onChange = {this.handleEmail} /></p>
        <p><input type = "text" placeholder = "Password" onChange ={this.handlePass} /></p>
        <p><input type = "text" placeholder = "Confirm Password" onChange = {this.handleConfirm}/></p>
        <p><button style ={buttonStyle} type="button" onClick = {this.buttonClick}>Sign Up</button></p>
        </div>
      </div>
    )

  }


}
