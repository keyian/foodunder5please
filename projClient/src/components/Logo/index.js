import React, { Component } from 'react';

import './style.css';

import { Link } from 'react-router';

export default class Logo extends Component {
  render() {
    return (
      <Link to={`/`}><img id="logo" src="images/fu5pLogo.png" alt="logo"/></Link>
    );
  }
}
