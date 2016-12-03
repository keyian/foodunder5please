// src/components/About/index.js
import React, { Component } from 'react';

import './style.css';

import Logo from '../Logo';

export default class About extends Component {

  render() {
    return (
      <div className="About">
        <Logo />
        <h1>
          About
        </h1>
      </div>
    );
  }
}
