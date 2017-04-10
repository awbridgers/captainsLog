var React = require('react');
var ReactDOM = require('react-dom');
var App = require('./components/App.js');

var Mycomp = App[0];
var Button = App[1];


var View = React.createClass({
  handleClick: function(){
    alert("Hello World!");
  },

  render:
  function (){
    return(
      <Button onClick = {this.handleClick}>
          
      </Button>
    )
  }
});

ReactDOM.render(<View />, document.getElementById('app'));
