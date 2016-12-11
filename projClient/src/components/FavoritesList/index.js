import React, { Component } from 'react';

import './style.css';

export default class FavoritesList extends Component {

  render() {
    return (
      <div id="favoritesListBox">
        <ul id="favoritesList">
        {this.props.favorites.map((favorite, i)=>
          <li key={i}>{i+1}. {favorite.name} at {favorite.restaurant.name}, ({favorite.restaurant.location}) for ${favorite.price}</li>
        )}
        </ul>
      </div>
    );
  }
}
