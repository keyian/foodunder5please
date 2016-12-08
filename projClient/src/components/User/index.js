import React, { Component } from 'react';

import './style.css';

import GoogleMap from "../GoogleMap";

export default class User extends Component {

  render() {
    return (
      <div>
        <p>{this.props.params.user}</p>
        <GoogleMap />
      </div>
    );
  }
}
