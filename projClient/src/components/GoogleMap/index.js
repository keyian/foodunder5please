import React, { Component } from 'react';

import './style.css';

let GoogleMapsLoader = require('google-maps');

export default class GoogleMap extends Component {
  componentDidMount() {
    GoogleMapsLoader.KEY = 'AIzaSyBJvdJB_f4yx7DEdA-RN7nMLne5sTxLDvU';
    GoogleMapsLoader.LIBRARIES = ['places'];
    GoogleMapsLoader.load(function(google) {
        new google.maps.Map(document.getElementById("map"), {
        center: new google.maps.LatLng(51.5, -0.2),
        zoom: 10
      });
    });
  }

  render() {
    return (
      <div>
        <div id="map"></div>
      </div>
    );
  }
}
