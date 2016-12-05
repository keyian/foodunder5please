import React, { Component } from 'react';

import Header from '../Header';
import './style.css';
import { Link } from 'react-router';

let api = require('../../apiMethods.js');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: ""
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
        <Header loginCB={this.userLogin.bind(this)} logoutCB={this.userLogout.bind(this)} onAddItemSubmit={api.addItem} />
        <Link to={`/user/${this.state.user.id}`}>{this.state.user.name}</Link>
        {this.props.children}
      </div>
    );
  }
}

export default App;
