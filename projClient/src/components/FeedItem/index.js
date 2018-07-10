import React, { Component } from 'react';

import './style.css';

import CommentBox from "../CommentBox";
import LikeHeart from "../LikeHeart";

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class FeedItem extends Component {

  render() {
    return (
      <div id="feedItemBox">
        <h1>{this.props.item.name} <span className="altFont">at</span> {this.props.restaurant.name} <span className="altFont">({this.props.restaurant.location})</span> <span className="altFont">for</span> ${this.props.item.price.toFixed(2)}</h1>
        <div id="imgDiv">
        <ReactCSSTransitionGroup
          transitionName="feedItemImage"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
          transitionAppear={true}
          transitionAppearTimeout={500}>
          <img src={this.props.item.imgPath} alt={this.props.item.name} />
        </ReactCSSTransitionGroup>
        </div>
        <LikeHeart item={this.props.item} user={this.props.user} login={this.props.login} socket={this.props.socket} />
        <CommentBox className="comments" item={this.props.item._id} user={this.props.user} login={this.props.login} socket={this.props.socket} />
      </div>
    );
  }
}
