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




export class Viewer extends React.Component{
  constructor(){
    super();
  }
  render(){
    return (
      <div></div>
  )}
}

export default class ViewerPage extends React.Component{
  render(){
    return(
      <div><NavBar /><div style ={divStyle}><Viewer /></div></div>

    )
  }

}
