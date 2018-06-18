/*global FB*/
// ^^ using the global FB tag to disable the ESLint's "no-undef" rule
//***! <- stuff to do
import React, { Component } from 'react';

//we will use apiMethods for adding/validating user
let apiMethods = require('../../apiMethods.js');

import './style.css';

export default class Login extends Component {
  constructor(props) {
    super(props);
    let api = new apiMethods(this.props.socket);

    this.state = {
      api: api,
      login: false,
      username: "",
      password: "",
      newUN: "",
      newPW: "",
      confirmPW: "",
      hideLoginForm: false,
      hideSignupForm: true
    };

    this.onChangeAdd = (address) => this.setState({address});
  }

  showHideSignupLoginForm(e) {
    this.setState({
      hideLoginForm: !this.state.hideLoginForm,
      hideSignupForm: !this.state.hideSignupForm
    })
  }

  handleSubmitLogin(e) {
    e.preventDefault();

    //acquire current states for login: username & password
    let username = this.state.username;
    let password = this.state.password;

    //validate.
    let userObject = {
      username: username,
      password: password
    };
    this.state.api.addAndOrGetUser(userObject, this.setDBUser.bind(this));



  }

  handleSubmitSignup(e) {
    e.preventDefault();

    //acquire current states
  }

  loginChange(e) {
    this.setState({[e.target.id]: e.target.value});
  }

    setDBUser(user) {
      console.log("is setDBUser being called");
      this.props.loginCB(user);
      this.setState({login: true});
    }

  render() {
    return (
      <div>
      <div id="login">
        <form id="loginForm" method="POST" onSubmit={this.handleSubmitLogin.bind(this)} action="" encType="multipart/form-data">
          <div>
            <label htmlFor="usernameLogin">Username: </label><br />
            <input type="text" name="username" id="username" value={this.state.username} onChange={this.loginChange.bind(this)} />
          </div>
          <div>
            <label htmlFor="passwordLogin">Password: </label><br />
            <input type="password" name="password" id="password" value={this.state.password}  onChange={this.loginChange.bind(this)} />
          </div>
          <input type="submit" name="loginBtn" id="loginBtn" value="Login" />
        </form>
      </div>
      <div id="signup">
      <form id="signUpForm" method="POST" onSubmit={this.handleSubmitSignup.bind(this)} action="" encType="multipart/form-data">
        <div>
          <label htmlFor="usernameSignup">Username: </label><br />
          <input type="text" name="newUN" id="newUN" value={this.state.newUN} onChange={this.loginChange.bind(this)} />
        </div>
        <div>
          <label htmlFor="passwordSignup">Password: </label><br />
          <input type="password" name="newPW" id="newPW" value={this.state.newPW}  onChange={this.loginChange.bind(this)} />
        </div>
        <div>
          <label htmlFor="confirmPassword">Confirm Password: </label><br />
          <input type="password" name="confirmPW" id="confirmPW" value={this.state.confirmPW}  onChange={this.loginChange.bind(this)} />
        </div>
        <input type="submit" name="signupBtn" id="signupBtn" value="Signup" />
      </form>
      </div>
      </div>
    );
  }

}





// /*global FB*/
// // ^^ using the global FB tag to disable the ESLint's "no-undef" rule
//
// import React, { Component } from 'react';
//
// import './style.css';
//
// let apiMethods = require('../../apiMethods.js');
// import { Link } from 'react-router';
//
//
// export default class Login extends Component {
//   constructor(props) {
//     super(props);
//     let api = new apiMethods(this.props.socket);
//     this.state = {
//       api: api,
//       login: false
//     };
//   }
//
//   componentDidMount() {
//     window.fbAsyncInit = (function() {
//
//       FB.init({
//         appId      : '733666113451028',
//         xfbml      : true,
//         version    : 'v2.8'
//       });
//
//       FB.getLoginStatus((function(response) {
//         console.log(response.status);
//         this.statusChangeCallback(response);
//       }).bind(this));
//     }).bind(this);
//
//     // Load the SDK asynchronously
//     (function(d, s, id) {
//       var js, fjs = d.getElementsByTagName(s)[0];
//       if (d.getElementById(id)) return;
//       js = d.createElement(s); js.id = id;
//       js.src = "//connect.facebook.net/en_US/sdk.js";
//       fjs.parentNode.insertBefore(js, fjs);
//     }(document, 'script', 'facebook-jssdk'));
//   }
//
//   handleClickLogin() {
//     console.log('handle click login called');
//     if(this.state.login === false) {
//       FB.login(this.checkLoginState());
//     } else {
//       FB.logout(this.logoutSuccess());
//     }
//   }
//
//   checkLoginState() {
//     FB.getLoginStatus(function(response) {
//       this.statusChangeCallback(response);
//     }.bind(this));
//   }
//
//   // This is called with the results from from FB.getLoginStatus().
//   statusChangeCallback(response) {
//     console.log('statusChangeCallback');
//     console.log(response);
//     // The response object is returned with a status field that lets the
//     // app know the current login status of the person.
//     // Full docs on the response object can be found in the documentation
//     // for FB.getLoginStatus().
//     if (response.status === 'connected') {
//       console.log("status change connected");
//       // Logged into your app and Facebook.
//       this.loginSuccess();
//     } else if (response.status === 'not_authorized') {
//       // The person is logged into Facebook, but not your app.
//       console.log('not authorized');
//     }
//     // else if (response.status === "unknown") {
//     //   console.log('response is unknown');
//     //   this.handleClickLogin();
//     // }
//     else {
//       // The person is not logged into Facebook, so we're not sure if
//       // they are logged into this app or not.
//
//     }
//   }
//
//   // Here we run a very simple test of the Graph API after login is
//   // successful.  See statusChangeCallback() for when this call is made.
//   loginSuccess() {
//     console.log('loginSuccess');
//     FB.api('/me?fields=id,email,first_name,last_name', 'GET', {}, this.fbMeCB.bind(this));
//   }
//
//   fbMeCB(response) {
//     console.log('Successful login for: ' + response.name);
//     console.log(response);
//     this.state.api.addAndOrGetUser(response, this.setDBUser.bind(this));
//   }
//
//   setDBUser(user) {
//     console.log("is setDBUser being called");
//     this.props.loginCB(user);
//     this.setState({login: true});
//   }
//
//   logoutSuccess() {
//     //***! call to the api to add user or fetch user's info...
//     this.setState({login: false});
//     this.props.logoutCB();
//   }
//
//   // <Link to={`/user/${this.props.user._id}`}>{this.props.user.name}</Link>
//   render() {
//     var loginLink = <Link to={`/user/${this.props.user._id}`}>{this.props.user.first_name}</Link>;
//     return (
//       <div id="loginBox">
//         <a id="loginLink" href="#" onClick={this.handleClickLogin.bind(this)}>{(this.state.login)?("Logout"):("Login")}</a>
//         <p id="status">Hey, {(this.state.login)?(loginLink):("please login with Facebook in order to add items, comment on items, like items, and see your items mapped out.")}</p>
//       </div>
//     );
//   }
// }
