var React = require('react');
var ReactDOM= require('react-dom');
// var s = require('../css/style.css');

var FirstComponent = React.createClass({
  render:
  function () {
    return (
      <div>
      <h1> Hello World </h1>
      </div>
    )
  }
});

var SecondComponent = React.createClass({
  render: function(){
    return <h1> Second Component!</h1>
  }
})
var Button = React.createClass({
  render:
  function (){
    return <button onClick = {this.props.onClick}>Click Me!</button>;
  }
});




module.exports=[FirstComponent, Button, SecondComponent];
