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
  fontSize: "16", textAlign:"center",

};

var prevButton = {
  position: "relative", left: "-350px", top: "-54px",
  borderRadius:"2px",height: "35px", width: "50px",
  fontSize: "16", textAlign:"center",

};




export class Viewer extends React.Component{
  constructor(){
    super();
  }
  render(){
    return (
      <div style = {{textAlign: "center", marginLeft: "auto", marginRight: "auto"}}>
        <span><button style = {nextButton} type ="button">></button>
        <h2><font color = "white">DateDateDateDate</font></h2>
        <button style = {prevButton} type = "button">&lt;</button>
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
