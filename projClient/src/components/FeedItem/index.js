import React, { Component } from 'react';

import './style.css';

import CommentBox from "../CommentBox";
import LikeHeart from "../LikeHeart";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class FeedItem extends Component {

  componentDidMount() {
    console.log("in feeditem");
    console.log(this.props.item);
  }
  render() {
    return (
      <div id="feedItemBox">
        <h1>{this.props.item.name} at {this.props.restaurant.name}</h1>
        <ReactCSSTransitionGroup
          transitionName="feedItemImage"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          <img src={this.props.item.imgPath} alt={this.props.item.name} />
        </ReactCSSTransitionGroup>
        <LikeHeart item={this.props.item} user={this.props.user} login={this.props.login} socket={this.props.socket} />
        <CommentBox item={this.props.item._id} user={this.props.user} login={this.props.login} socket={this.props.socket} />
      </div>
    );
  }
}
