import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import StarfleetLogo from '../css/images/StarfleetLogo.png';
import NavBar from './sideBar.js';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import {Scrollbars} from 'react-custom-scrollbars';
//import style from "scrollBar.css";

let divStyle = {
  backgroundColor: 'black',
  height: "100%",
  width: "100%",
  position: "fixed"
}

let logView ={
  paddingBottom: "300px", display: "block",
  margin: "auto",
  width: "50%",
  marginTop: "-20px",
  textAlign: "-webkit-justify",
  // -moz-text-align-last: center;
   textAlignLast: "center",
   whiteSpace: "pre-line",
   wordWrap: "break-word"
}

const myScrollbar = {
      width: "100%",
      height: "100%",
    };

let nextButton = {
  position:"relative", right: "-250px", bottom:"-52px",
  borderRadius:"2px",height: "35px", width: "50px",
  fontSize: 16, textAlign:"center", background: "white"

};

let prevButton = {
  position: "relative", left: "-250px", top: "-54px",
  borderRadius:"2px",height: "35px", width: "50px",
  fontSize: 16, textAlign:"center", background:"white"

};
//class constructor
function logEntry (date, text){
    this.date = date;
    this.text = text;
    this.type = "main";
};

let getMonth = (month) => {
  let monthName;
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
};
let getDayOfWeek = (day) => {
  let dayName;
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
let getDay = (today) => {

  let day = getDayOfWeek(today.getDay());
  let dd = today.getDate();
  let mm = today.getMonth()+1;
  let yyyy= today.getFullYear();
  return (day + " " + mm + "-" + dd + "-" + yyyy);
}






export class Viewer extends React.Component{
  constructor(){
    super();
    this.state = {index: 0, logArray: [], loading: true};
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
    this.loggedIn = true;
  }
  componentWillMount(){
    this.loadingData = true;
    this.isWaiting = false;
    try {
    this.uid = firebase.auth().currentUser.uid;
    this.ref = firebase.database().ref(this.uid);
    this.ref.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {

          let tempDate = new Date(childSnapshot.val().date);
          let dateText = getDay(tempDate);
          console.log(dateText);

          let temp = new logEntry(dateText, childSnapshot.val().logEntry);


          if(this.state.logArray.length > 0){
              if(this.state.logArray[this.state.index].date === temp.date){
                  temp.type = "supplemental"
                  let supLog = "\nCaptain's Log Supplemental: " + temp.text;
                  this.state.logArray[this.state.index].text += supLog;
              }
            }

          //console.log(temp.type);
          //console.log(temp.text);

          if(temp.type === 'main' && this.loadingData){
            let tempArray = this.state.logArray.slice()
            tempArray.push(temp);
            this.setState({logArray: tempArray});
            this.setState({index: this.state.logArray.length-1});

            //wanted to make a short timeout to allow data to load into the array
            //set isWaiting to false so that only 1 timeout function exists, so it can be cancelled on unmountd
            if(!this.isWaiting){
              this.isWaiting = true;
              this.isLoadingData = setTimeout(function() { this.setState({loading: false});}.bind(this), 500);
          }
          }


        }.bind(this));
      }.bind(this));
    }
    catch (err) {
      this.loggedIn = false;
    }



  }



  previousButtonClick(){
    if(this.state.index > 0){
      this.setState({index: this.state.index - 1});
    }
    else{
      console.log("this is the first entry");
    }
  }

  nextButtonClick(){
    if(this.state.index < this.state.logArray.length - 1){
      this.setState({index: this.state.index + 1 });
    }
    else{
      console.log("This is the last entry");
    }
  }


  render(){
    //if no data has loaded into the array yet, just print the page elements with no info
    if(!this.loggedIn){
      alert("Please log in to view your logs");
      return <Redirect to = "/"></Redirect>

    }
    if(this.state.loading){
      return(
        <div style = {{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
          <img src = {StarfleetLogo} style = {{position: "absolute", right: "30px", marginTop: "20px"}}></img>
          <img src = {StarfleetLogo} style = {{position: "absolute", left: "30px",marginTop: "20px"}}></img>
          <span style = {{marginTop: "-15px", display: "inline-block"}}>
          <button style = {nextButton} type ="button">></button>
          <h2><font color = "white">Loading...</font></h2>
          <button style = {prevButton} type = "button">&lt;</button>
          </span>
        </div>
      )
    }

    return (
      <Scrollbars style = {myScrollbar}>
        <div style = {{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
          <font color = "white">
            <img src = {StarfleetLogo} style = {{position: "absolute", right: "30px", marginTop: "20px"}}></img>
            <img src = {StarfleetLogo} style = {{position: "absolute", left: "30px",marginTop: "20px"}}></img>
          <span style = {{display: "inline-block", marginTop: "-15px"}}><button style = {nextButton} type ="button" onClick = {this.nextButtonClick}>></button>
          <h2><font color = "white">Captain's Log: {this.state.logArray[this.state.index].date}</font></h2>
          <button style = {prevButton} type = "button" onClick = {this.previousButtonClick}>&lt;</button>
          </span>
          <div style = {logView}>{this.state.logArray[this.state.index].text}</div>
          </font>
        </div>
      </Scrollbars>
  );}

  componentWillUnmount(){
    this.loadingData = false;
    window.clearTimeout(this.isLoadingData);






  }
}

export default class ViewerPage extends React.Component{
  render(){
    return(
      <div><NavBar /><div style ={divStyle}><Viewer /></div></div>

    )
  }

}
