import React, { Component } from 'react';

import './style.css';

import Map from "../Map";
import FavoritesList from "../FavoritesList";

let apiMethods = require('../../apiMethods.js');

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
        <p>{this.props.user.name}</p>
        <Map favorites={this.state.favorites} />
        <FavoritesList favorites={this.state.favorites} />
      </div>
    );
  }
}
