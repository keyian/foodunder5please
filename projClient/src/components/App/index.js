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
      api: api,
      login: false
    };
  }

  componentWillMount() {
    this.state.socket.on("user favorite change", this.updateUser.bind(this));
  }

  updateUser(user) {
    console.log("user favorite change was called... this is user object", user);
    this.setState({
      user: user
    });
  }

  userLogin(user) {
    console.log("client side user... hmm", user);
    this.setState(
      {user: user,
      login: true}
    );
  }
  userLogout() {
    console.log("logout is correctly working");
    this.setState(
      {user: "",
      login: false}
    );
  }

  render() {
    return (
      <div>
        <Header login={this.state.login} user={this.state.user} socket={this.state.socket} loginCB={this.userLogin.bind(this)} logoutCB={this.userLogout.bind(this)} onAddItemSubmit={this.state.api.addItem.bind(this.state.api)} />
        <Link to={`/user/${this.state.user._id}`}>{this.state.user.name}</Link>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, { login: this.state.login, user: this.state.user, socket: this.state.socket }))}
      </div>
    );
  }
}

export default App;
