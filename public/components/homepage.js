import React from 'react';
import Background from '../css/images/background4.png';
import * as firebase from 'firebase';
import NavBar from './sideBar.js';




var divStyle = {
  backgroundImage: "url(" + Background + ")",
  height: "100%",
  width: "100%",
  position: "fixed"
}


export class InputText extends React.Component{
constructor(props){
  super(props);
  this.state = {userInput: ""};   //userID: firebase.auth().currentUser.uid
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({userInput: event.target.value});
  }
  handleSubmit(){
    //alert(this.state.userID);
    alert("hello");

  }
  render(){
    return (
      <div style = {{display:"block", textAlign: "center", marginLeft:"auto", marginRight:"auto", marginTop: "300px"}}>
      <form>
        <textarea rows ='10' onChange = {this.handleChange} value = {this.state.userInput}
          style = {{width: "800px", height: "175px",resize: 'none',fontSize: 15}}>
        </textarea>
        <button type = 'button' onClick = {this.handleSubmit} style = {{width:"100px",
          height: "50px", position: "relative", display: "block", margin: "auto", borderRadius: "8px" }}>Submit</button>
      </form>
      </div>
    );
  }
}

export default class Homepage extends React.Component{
  render(){
    return <div><NavBar /><div style = {divStyle}><InputText /></div></div>
}
}
