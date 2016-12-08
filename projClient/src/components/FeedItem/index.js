import React, { Component } from 'react';

import './style.css';

import CommentBox from "../CommentBox";
import LikeHeart from "../LikeHeart";

export default class FeedItem extends Component {

  componentDidMount() {
    console.log("in feeditem");
    console.log(this.props.item);
  }
  render() {
    return (
      <div>
        <h1>{this.props.item.name} at {this.props.restaurant.name}</h1>
        <img src={this.props.item.imgPath} alt={this.props.item.name} />
        <LikeHeart item={this.props.item._id} user={this.props.user} login={this.props.login} />
        <CommentBox item={this.props.item._id} user={this.props.user} login={this.props.login} socket={this.props.socket} />
      </div>
    );
  }
}
