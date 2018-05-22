import React, { Component } from 'react';

import Header from '../Header';
import './style.css';
import { Link } from 'react-router';

let apiMethods = require('../../apiMethods.js');

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


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
      <ReactCSSTransitionGroup
        transitionName="header"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppear={true}
        transitionAppearTimeout={1000}>
        <Header login={this.state.login} user={this.state.user} socket={this.state.socket} loginCB={this.userLogin.bind(this)} logoutCB={this.userLogout.bind(this)} onAddItemSubmit={this.state.api.addItem.bind(this.state.api)} />
      </ReactCSSTransitionGroup>
        {React.Children.map(this.props.children, (child) => React.cloneElement(child, { login: this.state.login, user: this.state.user, socket: this.state.socket }))}
      </div>
    );
  }
}

export default App;
