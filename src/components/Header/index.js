import React, { Component } from 'react';

import './style.css';

import Logo from '../Logo';
import Login from '../Login';


export default class Header extends Component {
  render() {
    return (
      <div>
        <Logo />
        <Login />
      </div>

    );
  }
}
