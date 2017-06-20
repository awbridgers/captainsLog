import React from 'react';
import homePageImage from '../css/images/homepageImage.png';
import * as firebase from 'firebase';
import NavBar from './sideBar.js';
import PropTypes from 'prop-types';
import {Redirect, Link} from 'react-router-dom';

const FixMe = () => <h1>Calendar Page</h1>


export default class CalendarView extends React.Component{
  render(){
    return <div><NavBar /><FixMe /></div>
    }
}
