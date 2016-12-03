import React, { Component } from 'react';

import Header from '../Header';
import './style.css';

let api = require('../../apiMethods.js');

class App extends Component {

  render() {
    return (
      <Header onItemSubmit={api.addItem} />
    );
  }
}

export default App;
