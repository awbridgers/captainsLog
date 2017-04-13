var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.js');
var Nav = require('./components/sideBar.js');


var Mycomp = App[0];
var Button = App[1];
var NavBar = Nav[0];


  var View = React.createClass({
  handleClick: function(){
    alert("Hello World!");
  },
  render: function (){
    return <div style = {{ fontSize: 32, "text-align": "center", backgroundColor: 'black', padding: "0px", width: "100%", margin: "0px", color: "white" }}>
      Hello World</div>;

  }
});

 ReactDOM.render(<View />, document.getElementById('app'));
