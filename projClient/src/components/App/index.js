import React, { Component } from 'react';

import Header from '../Header';
import './style.css';
import { Link } from 'react-router';

let apiMethods = require('../../apiMethods.js');

class App extends Component {
  constructor(props) {
    super(props);
    let io = require('socket.io-client');
    let socket = io();
    let api = new apiMethods(socket);
    this.state = {
      user: "",
      socket: socket,
      api: api
    };
  }
  userLogin(user) {
    console.log(user);
    this.setState(
      {user: user}
    );
  }
  userLogout() {
    console.log("logout is correctly working");
    this.setState(
      {user: ""}
    );
  }
  componentDidMount() {
    console.log(this.props.children);
  }
  render() {
    return (
      <div>
        <Header socket={this.state.socket} loginCB={this.userLogin.bind(this)} logoutCB={this.userLogout.bind(this)} onAddItemSubmit={this.state.api.addItem.bind(this.state.api)} />
        <Link to={`/user/${this.state.user.id}`}>{this.state.user.name}</Link>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, { socket: this.state.socket }))}
      </div>
    );
  }
}

export default App;
