import React, { Component } from 'react';

import './style.css';

export default class User extends Component {

  render() {
    return (
      <div>
        <p>{this.props.params.user}</p>
      </div>
    );
  }
}
