import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Background from '../css/images/viewerBackgroundAlt2.png';
import NavBar from './sideBar.js';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';
import ReactScrollbar from "react-scrollbar-js";
//import style from "scrollBar.css";

let divStyle = {
  backgroundImage: "url(" + Background + ")",
  height: "100%",
  width: "100%",
  position: "fixed"
}

let logView ={
  paddingBottom: "100px", display: "block",
  margin: "auto",
  width: "50em",
  marginTop: "-20px",
  textAlign: "justify",
  // -moz-text-align-last: center;
   textAlignLast: "center",
   whiteSpace: "pre-line"


}

const myScrollbar = {
      width: "100%",
      height: "100%",
    };

let nextButton = {
  position:"relative", right: "-250px", bottom:"-52px",
  borderRadius:"2px",height: "35px", width: "50px",
  fontSize: 16, textAlign:"center",

};

let prevButton = {
  position: "relative", left: "-250px", top: "-54px",
  borderRadius:"2px",height: "35px", width: "50px",
  fontSize: 16, textAlign:"center",

};
//class constructor
function logEntry (date, text){
    this.date = date;
    this.text = text;
    this.type = "main";
};







export class Viewer extends React.Component{
  constructor(){
    super();
    this.state = {index: 0, logArray: [], loading: true};
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  componentWillMount(){
    this.loadingData = true;
    this.isWaiting = false;
    this.uid = firebase.auth().currentUser.uid;
    this.ref = firebase.database().ref(this.uid);
    this.ref.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {

          let temp = new logEntry(childSnapshot.val().date, childSnapshot.val().logEntry);


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
    if(this.state.loading){
      return(
        <div style = {{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
          <div style = {{width: "100%", backgroundColor: "blue"}}></div>
          <span><button style = {nextButton} type ="button">></button>
          <h2><font color = "white">Loading...</font></h2>
          <button style = {prevButton} type = "button">&lt;</button>
          </span>
        </div>
      )
    }

    return (
      <ReactScrollbar style = {myScrollbar}>
        <div style = {{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}><font color = "white">
          <span style = {{display: "inline-block", marginTop: "-35px"}}><button style = {nextButton} type ="button" onClick = {this.nextButtonClick}>></button>
          <h2><font color = "white">Captain's Log: {this.state.logArray[this.state.index].date}</font></h2>
          <button style = {prevButton} type = "button" onClick = {this.previousButtonClick}>&lt;</button>
          </span>
          <div style = {logView}>{this.state.logArray[this.state.index].text}</div>
          </font>
        </div>
      </ReactScrollbar>
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
