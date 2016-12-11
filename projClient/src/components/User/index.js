import React, { Component } from 'react';

import './style.css';

import Map from "../Map";
import FavoritesList from "../FavoritesList";

let apiMethods = require('../../apiMethods.js');

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

import { Link } from 'react-router';



export default class User extends Component {

  constructor(props) {
    super(props);
    let api = new apiMethods(this.props.socket)
    this.state = {
      favorites: [],
      api: api
    };
  }

  componentDidMount() {
    // fetch all the items... actually do this in app...?
    this.state.api.getFavoritesPopulated.apply(this.state.api, [this.gotPopulatedFavs.bind(this), this.props.params.user]);
  }

  gotPopulatedFavs(user) {
    this.setState({
      favorites: user.favorites
    });
  }

  render() {
    return (
      <div>
      <Link to={`/`}>home</Link>
      <ReactCSSTransitionGroup
        transitionName="header"
        transitionEnterTimeout={1000}
        transitionLeaveTimeout={1000}
        transitionAppear={true}
        transitionAppearTimeout={1000}>
        <h1>{(this.props.user.name)?(this.props.user.name):("Login to see whose page this is.")}</h1>
        <h2>these are your favorites, asshole!</h2>
        <FavoritesList favorites={this.state.favorites} />
        <Map favorites={this.state.favorites} />
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}
