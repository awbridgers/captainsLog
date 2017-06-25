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
  borderRadius:"2px",height: "25px", width: "45px",
  fontSize: 16, textAlign:"center", background: "white",
  display: "inline-block", position: "relative", left: "50px"
};

  let previousButton = {
    borderRadius:"2px",height: "25px", width: "45px",
    fontSize: 16, textAlign:"center", background: "white",
    display: "inline-block", position: "relative", right: "50"

};

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
  textAlign: "center"
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
    this.state = {year: year, month: month, date: date, monthName: monthName};
    this.handleClick = this.handleClick.bind(this);
    }

    handleClick(){
      console.log(events.description);
    }


  render(){
    return (
    <div style ={calendarStyle}>
      <div>
        <span>
          <button type = "button" style = {previousButton}>&lt;</button>
          <div style = {{display: "inline-block", width: "100px"}}><h1>{this.state.monthName}</h1></div>
          <button type = "button" style = {nextButton}>&gt;</button>
          </span>
        <EventCalendar month = {this.state.month} year = {this.state.year} events ={events}
          onEventClick={(target, eventData, day) => console.log(eventData)} />
   </div>
    </div>
  )
  }


}


export default class CalendarView extends React.Component{
  render(){
    return <div style = {divStyle}><NavBar /><Calendar /></div>
    }
}
