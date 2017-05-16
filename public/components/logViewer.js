import React from 'react';
import {Redirect, Link} from 'react-router-dom';
import Background from '../css/images/viewerBackgroundAlt2.png';
import NavBar from './sideBar.js';
import * as firebase from 'firebase';
import PropTypes from 'prop-types';

var divStyle = {
  backgroundImage: "url(" + Background + ")",
  height: "100%",
  width: "100%",
  position: "fixed"
}

var nextButton = {
  position:"relative", right: "-350px", bottom:"-52px",
  borderRadius:"2px",height: "35px", width: "50px",
  fontSize: 16, textAlign:"center",

};

var prevButton = {
  position: "relative", left: "-350px", top: "-54px",
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
    this.state = {date: "Date", logText: "", index: 0, logArray: [], loading: true};
    this.previousButtonClick = this.previousButtonClick.bind(this);
    this.nextButtonClick = this.nextButtonClick.bind(this);
  }
  componentWillMount(){
    this.uid = firebase.auth().currentUser.uid;
    this.ref = firebase.database().ref(this.uid);
    this.ref.once("value")
      .then(function(snapshot) {
        snapshot.forEach(function(childSnapshot) {
          var temp = new logEntry(childSnapshot.val().date, childSnapshot.val().logEntry);
          console.log(temp.text);
          console.log(temp.type);




          // if(this.state.logArray.length > 0){
          //     if(this.state.logArray[0].date === temp.date){
          //         temp.type = "supplemental"
          //         var supLog = "<br /><b>Captain's Log Supplemental: </b>" + temp.text;
          //         this.state.logArray[0].text += supLog;
          //     }
          //   }

          if(temp.type === 'main'){
            var tempArray = this.state.logArray.slice()
            tempArray.unshift(temp);
            this.setState({logArray: tempArray});
            this.setState({loading: false});
            //console.log(this.state.logArray[this.state.index].date);

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
          <span><button style = {nextButton} type ="button">></button>
          <h2><font color = "white"></font></h2>
          <button style = {prevButton} type = "button">&lt;</button>
          </span>
        </div>
      )
    }
    return (
      <div style = {{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
        <span><button style = {nextButton} type ="button" onClick = {this.nextButtonClick}>></button>
        <h2><font color = "white">{this.state.logArray[this.state.index].date}</font></h2>
        <button style = {prevButton} type = "button" onClick = {this.previousButtonClick}>&lt;</button>
        </span>
      </div>
  )}
}

export default class ViewerPage extends React.Component{
  render(){
    return(
      <div><NavBar /><div style ={divStyle}><Viewer /></div></div>

    )
  }

}
