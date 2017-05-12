import React from 'react';
import Background from '../css/images/background4.png';
import * as firebase from 'firebase';
import NavBar from './sideBar.js';
import PropTypes from 'prop-types';

function getDayOfWeek(day){
  var dayName;
  switch (day) {
    case 0:
        dayName = "Sun.";
        break;
    case 1:
        dayName = "Mon.";
        break;
    case 2:
        dayName = "Tue.";
        break;
    case 3:
        dayName = "Wed.";
        break;
    case 4:
        dayName = "Thu.";
        break;
    case 5:
        dayName = "Fri.";
        break;
    case 6:
        dayName = "Sat.";
  }
  return dayName;
}


//a function to get the month
function getMonth(month){
  var monthName;
  switch (month) {
    case 0:
        monthName = "January";
        break;
    case 1:
        monthName = "February";
        break;
    case 2:
        monthName = "March";
        break;
    case 3:
        monthName = "April";
        break;
    case 4:
        monthName = "May";
        break;
    case 5:
        monthName = "June";
        break;
    case 6:
        monthName = "July";
        break;
    case 7:
        monthName = "August";
        break;
    case 8:
        monthName = "September";
        break;
    case 9:
        monthName = "October";
        break;
    case 10:
        monthName = "November";
        break;
    case 11:
        monthName = "December";
        break;

  }
  return monthName;
}
function getDayOfWeek(day){
  var dayName;
  switch (day) {
    case 0:
        dayName = "Sun.";
        break;
    case 1:
        dayName = "Mon.";
        break;
    case 2:
        dayName = "Tue.";
        break;
    case 3:
        dayName = "Wed.";
        break;
    case 4:
        dayName = "Thu.";
        break;
    case 5:
        dayName = "Fri.";
        break;
    case 6:
        dayName = "Sat.";
  }
  return dayName;
}
var getDay = () => {
  var today = new Date();
  var day = getDayOfWeek(today.getDay());
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy= today.getFullYear();
  return (day +" "+ mm+"-" +dd+"-"+yyyy)
}

var divStyle = {
  backgroundImage: "url(" + Background + ")",
  height: "100%",
  width: "100%",
  position: "fixed"
}
//a function to return the date in mm/dd/yyyy



export class InputText extends React.Component{
constructor(props){
  super(props);
  this.state = {userInput: ""};   //userID: firebase.auth().currentUser.uid
  this.handleChange = this.handleChange.bind(this);
  this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount(){
    this.uid = firebase.auth().currentUser.uid;
    this.date = getDay();
    this.ref = firebase.database().ref(this.uid);

  }
  handleChange(event){
    this.setState({userInput: event.target.value});
  }
  handleSubmit(){
    if(this.state.userInput.length > 0 && confirm("Are you ready to post this entry?")){
      this.ref.push({date: this.date, logEntry: this.state.userInput});
      console.log("Log Entry Succesfully Posted!");
      this.setState({userInput: ""});     //reset text field to be empty
    }
    else if(this.state.userInput.length === 0){
      alert("Please make an entry before clicking Submit");
    }
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
