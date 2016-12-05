import React, { Component } from 'react';

import './style.css';

export default class FeedItem extends Component {
  componentDidMount() {
    console.log(this.props.item);
  }
  render() {
    return (
      <div>
        <h1>{this.props.item.name} at {this.props.item.restaurant}</h1>
        <img src={this.props.item.imgPath} alt={this.props.item.name} />
      </div>
    );
  }
}
