import React, { Component } from 'react';

import './style.css';

export default class FavoritesList extends Component {

  render() {
    return (
      <ul id="favoritesList">
      {this.props.favorites.map((favorite, i)=>
        <li key={i}>{i+1}. {favorite.name} at {favorite.restaurant.name} for {favorite.price}</li>
      )}
      </ul>
    );
  }
}
