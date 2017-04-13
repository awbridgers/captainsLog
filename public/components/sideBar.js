var React = require('react');

var divstyle = {
  backgroundColor: "#eee",
  padding: "20px",
  margin: "20px"

};

 var NavBarItem = React.createClass({
   render: function(){
     return <a href = {this.props.url}>{this.props.text}</a>;
   }
 });


var NavBar = React.createClass({
  render: function(){
    return (
      <div style = {divstyle}><NavBarItem url = "http://www.google.com" text = "Google" /></div>
      );

  }

});

module.exports=[NavBar];
