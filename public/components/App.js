var React = require('react');
var ReactDOM= require('react-dom');
var s = require('../css/style.css');

var FirstComponent = React.createClass({
  render:
  function () {
    return (
      <div id = {s.app}>
      <h1> Hello World </h1>
      </div>
    )
  }
});

var Button = React.createClass({
  render:
  function (){
    return <button onClick = {this.props.onClick}>Click Me!</button>;
  }
});



module.exports=[FirstComponent, Button];
