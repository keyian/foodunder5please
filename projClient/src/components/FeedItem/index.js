import React, { Component } from 'react';

import './style.css';

import CommentBox from "../CommentBox";

export default class FeedItem extends Component {

  componentDidMount() {
    console.log(this.props.item);
  }
  render() {
    return (
      <div>
        <h1>{this.props.item.name} at {this.props.restaurant.name}</h1>
        <img src={this.props.item.imgPath} alt={this.props.item.name} />
        <CommentBox item={this.props.item._id} socket={this.props.socket} />
      </div>
    );
  }
}
