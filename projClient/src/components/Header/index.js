import React, { Component } from 'react';

import './style.css';

import Logo from '../Logo';
import Login from '../Login';
import AddItemForm from '../AddItemForm';


export default class Header extends Component {

  render() {
    return (
      <div>
        <Logo />
        <Login user={this.props.user} socket={this.props.socket} loginCB={this.props.loginCB} logoutCB={this.props.logoutCB} />
        <AddItemForm login={this.props.login} user={this.props.user} onItemSubmit={this.props.onAddItemSubmit} />
      </div>

    );
  }
}
