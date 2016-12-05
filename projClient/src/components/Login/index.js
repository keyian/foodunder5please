/*global FB*/
// ^^ using the global FB tag to disable the ESLint's "no-undef" rule

import React, { Component } from 'react';

import './style.css';

let api = require('../../apiMethods.js');

export default class Login extends Component {
  componentDidMount() {
    window.fbAsyncInit = function() {

      FB.init({
        appId      : '733666113451028',
        xfbml      : true,
        version    : 'v2.8'
      });

      // Now that we've initialized the JavaScript SDK, we call
      // FB.getLoginStatus().  This function gets the state of the
      // person visiting this page and can return one of three states to
      // the callback you provide.  They can be:
      //
      // 1. Logged into your app ('connected')
      // 2. Logged into Facebook, but not your app ('not_authorized')
      // 3. Not logged into Facebook and can't tell if they are logged into
      //    your app or not.
      //
      // These three cases are handled in the callback function.
      FB.getLoginStatus(function(response) {
        this.statusChangeCallback(response);
      }.bind(this));
    }.bind(this);

    // Load the SDK asynchronously
    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_US/sdk.js";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }

  // Here we run a very simple test of the Graph API after login is
  // successful.  See statusChangeCallback() for when this call is made.
  loginSuccess() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', this.fbMeCB.bind(this));
    document.getElementById('loginLink').style.display = "none";
    document.getElementById('logoutLink').style.display = "block";
  }

  fbMeCB(response) {
    console.log('Successful login for: ' + response.name);
    console.log(response);
    document.getElementById('status').innerHTML =
      response.name + ' is currently logged in.';
    api.addUser(response);
    this.props.loginCB(response);
  }

  logoutSuccess() {
    //***! call to the api to add user or fetch user's info...
    this.props.logoutCB();
    document.getElementById('status').innerHTML = "";
    document.getElementById('loginLink').style.display = "block";
    document.getElementById('logoutLink').style.display = "none";
  }

  // change text and event listener back to login

  // This is called with the results from from FB.getLoginStatus().
  statusChangeCallback(response) {
    console.log('statusChangeCallback');
    console.log(response);
    // The response object is returned with a status field that lets the
    // app know the current login status of the person.
    // Full docs on the response object can be found in the documentation
    // for FB.getLoginStatus().
    if (response.status === 'connected') {
      console.log("status change connected");
      // Logged into your app and Facebook.
      this.loginSuccess();
    } else if (response.status === 'not_authorized') {
      // The person is logged into Facebook, but not your app.
      document.getElementById('status').innerHTML = 'Please log ' +
        'into this app.';
    } else {
      // The person is not logged into Facebook, so we're not sure if
      // they are logged into this app or not.
      document.getElementById('status').innerHTML = 'Please log ' +
      'into Facebook.';
    }
  }

  checkLoginState() {
    FB.getLoginStatus(function(response) {
      this.statusChangeCallback(response);
    }.bind(this));
  }

  handleClickLogin() {
    FB.login(this.checkLoginState());
  }

  handleClickLogout() {
    FB.logout(this.logoutSuccess());
  }

  render() {
    return (
      <div id="login">
        <a id="loginLink" href="#" onClick={this.handleClickLogin.bind(this)}>Login</a>
        <a id="logoutLink" href="#" onClick={this.handleClickLogout.bind(this)}>Logout</a>
        <div id="status"></div>
      </div>
    );
  }
}
