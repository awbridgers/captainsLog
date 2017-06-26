import React from 'react';
import homePageImage from '../css/images/homepageImage.png';
import * as firebase from 'firebase';
import NavBar from './sideBar.js';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';
import EventCalendar from 'react-event-calendar';
import moment from 'moment';
import style from "../css/calendar.css";

let getMonthName = (month) => {
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


let nextButton = {
  borderRadius:"2px",height: "30px", width: "40px",
  fontSize: 16, textAlign:"center", background: "white",
  display: "inline-block", position: "relative", left: "10px"
};

  let previousButton = {
    borderRadius:"2px",height: "30px", width: "40px",
    fontSize: 16, textAlign:"center", background: "white",
    display: "inline-block", position: "relative", right: "10px",

};

let returnButton = {width:"75px", height: "40px",
  borderRadius: "2px", background:"white",fontSize: 14, display: "inline-block",
  position: "absolute", left: "10px", top: "25px", textAlign: "center"
}

let divStyle = {
  backgroundColor: 'black',
  height: "100%",
  width: "100%",
  position: "fixed"
}

let calendarStyle ={
  position: "relative",
  color: "white",
  width: "535px",
  textAlign: "center",
  height: "475px",
}
let spacer = {
  position: "relative",
  color: "white",
  width: "535px",
  textAlign: "center",

}
function logEntry (date, text){
  this.start = date;
  this.end = date;
  this.eventClasses= 'main';
  this.description = text;


};

function fixDate(date){
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  return (year + "-" + month + "-"+ day);
}

const events = [
    {
        start: '2017-6-1',
        end: '2017-6-1',
        eventClasses: 'optionalEvent',
        description: 'This is a test description of an event',
    }
  ]

const FixMe = () => <h1>Calendar Page</h1>



export class Calendar extends React.Component{
  constructor(){
    super();
    let today = new Date();
    let year = today.getFullYear();
    let month = today.getMonth();
    let date = today.getDate();
    let monthName = getMonthName(month);
    this.logArray =[];
    this.state = {year: year, month: month, date: date, monthName: monthName, logArray: [], loading: true};
    this.handleClick = this.handleClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.previousMonth = this.previousMonth.bind(this);
    this.nextYear = this.nextYear.bind(this);
    this.previousYear = this.previousYear.bind(this);
    this.returnToToday=this.returnToToday.bind(this);
    }

    componentWillMount(){
      //load the data into an array--> copy and pasted from logViewer
      this.isWaiting = false;
      this.loadingData = true;
      try {
      this.uid = firebase.auth().currentUser.uid;
      this.ref = firebase.database().ref(this.uid);
      this.ref.once("value")
        .then(function(snapshot) {
          snapshot.forEach(function(childSnapshot) {


            let tempDate = new Date(childSnapshot.val().date);
            let dateText = fixDate(tempDate);
            //console.log(dateText);

            let temp = new logEntry(dateText, childSnapshot.val().logEntry);
            //console.log(temp);


            if(this.state.logArray.length > 0){
              let length = this.state.logArray.length - 1;
                if(this.state.logArray[length].start === temp.start){
                    temp.eventClasses = "supplemental"
                    let supLog = "\nCaptain's Log Supplemental: " + temp.text;
                    this.state.logArray[length].description += supLog;
                }
              }



            //if(temp.type === 'main'){
            if(this.loadingData && temp.eventClasses === 'main'){
              let tempArray = this.state.logArray.slice()
              tempArray.push(temp);
              this.setState({logArray: tempArray});
              console.log(tempArray);

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


    handleClick(){
      console.log(events.description);
    }

    nextMonth(){
      //if the month is not december, move to the next month
      if(this.state.month < 11){
        let newMonth = this.state.month + 1;
        let newMonthName = getMonthName(newMonth);
        this.setState({month: newMonth, monthName: newMonthName});
      }
      //if the month is december, move to january of the next year
      else {
        let newYear = this.state.year + 1;
        let newMonth = 0;
        let newMonthName = getMonthName(newMonth);
        this.setState({year: newYear, month: newMonth, monthName: newMonthName});
      }
    }

    previousMonth(){
      //if the month is not January, move to the previous month
      if(this.state.month > 0){
        let newMonth = this.state.month - 1;
        let newMonthName = getMonthName(newMonth);
        this.setState({month: newMonth, monthName: newMonthName});
      }
      //if the month is january, move to december of the previous year
      else {
        let newYear = this.state.year - 1;
        let newMonth = 11;
        let newMonthName = getMonthName(newMonth);
        this.setState({year: newYear, month: newMonth, monthName: newMonthName});
      }
    }

    nextYear(){
      //let newYear = this.state.year + 1;
      this.setState({year: this.state.year + 1});
    }

    previousYear(){
      this.setState({year: this.state.year - 1});
    }

    returnToToday(){
      //just return to today's date
      let today = new Date();
      let year = today.getFullYear();
      let month = today.getMonth();
      let date = today.getDate();
      let monthName = getMonthName(month);
      this.setState ({year: year, month: month, date: date, monthName: monthName});
    }



  render(){
    if(this.state.loading){
      return <div><h1></h1></div>
      }
    return (
    <div>
      <div style ={calendarStyle}>
        <span>
          <button type = "button" style = {returnButton} onClick = {this.returnToToday}>Today</button>
          <button type = "button" style = {previousButton} onClick= {this.previousMonth}>&lt;</button>
          <div style = {{display: "inline-block", width: "200px", textAlign: "center"}}><h1>{this.state.monthName}</h1></div>
          <button type = "button" style = {nextButton} onClick={this.nextMonth}>&gt;</button>
          </span>
        <EventCalendar month = {this.state.month} year = {this.state.year} events ={this.state.logArray}
          onEventClick={(target, eventData, day) => console.log(eventData)} />
      </div>
      <div style = {spacer}>
        <span>
          <button type = "button" style = {previousButton} onClick = {this.previousYear}>&lt;</button>
          <div style = {{display: "inline-block", width: "200px"}}><h1>{this.state.year}</h1></div>
          <button type = "button" style = {nextButton} onClick ={this.nextYear}>&gt;</button>
          </span>
      </div>
    </div>
  )
  }
  componentWillUnmount(){
    this.loadingData = false;
    window.clearTimeout(this.isLoadingData);
  }


}


export default class CalendarView extends React.Component{
  render(){
    return <div style = {divStyle}><NavBar /><Calendar /></div>
    }
}
