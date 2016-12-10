import React, { PropTypes, Component } from 'react';

import './style.css';

import GoogleMap from 'google-map-react';
import { fitBounds } from 'google-map-react/utils';

import MapMarker from '../MapMarker';

import PureRenderMixin from 'react-addons-pure-render-mixin';

const bounds = {
  ne: {
    lat: 40.920952,
    lng: -73.752474
  },
  sw: {
    lat: 40.615052,
    lng: -74.117914
  }
};

const size = {
  width: 640, // Map width in pixels
  height: 380, // Map height in pixels
};

const {center, zoom} = fitBounds(bounds, size);
let centerArr = [center.lat, center.lng];

// @controllable(['center', 'zoom', 'hoverKey', 'clickKey'])

export default class Map extends Component {

  static propTypes = {
    center: PropTypes.array,
    zoom: PropTypes.number,
    hoverKey: PropTypes.string, // @controllable
    clickKey: PropTypes.string, // @controllable
    onCenterChange: PropTypes.func, // @controllable generated fn
    onZoomChange: PropTypes.func, // @controllable generated fn
    onHoverKeyChange: PropTypes.func, // @controllable generated fn

    greatPlaces: PropTypes.array
  };

  static defaultProps = {
    center: centerArr,
    zoom: zoom,
  };

  constructor(props) {
    super(props);
    this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
  }

  render() {
    return (
      <div id="mapContainer">
        <GoogleMap
        bootstrapURLKeys={{
          key: "AIzaSyBJvdJB_f4yx7DEdA-RN7nMLne5sTxLDvU",
          language: 'en',
        }}
        center={this.props.center}
        zoom={this.props.zoom}>
        {this.props.favorites.map((favorite, i)=> <MapMarker key={i} lat={favorite.restaurant.geoLocation[0]} lng={favorite.restaurant.geoLocation[1]} item={favorite} restaurantName={favorite.restaurant} textB={i+1} />)}
        </GoogleMap>
        </div>
    );
  }
}
