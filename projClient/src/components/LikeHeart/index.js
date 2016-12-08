import React, { Component } from 'react';

import './style.css';
let classNames = require('classnames');

export default class LikeHeart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: false
    }
  }

  handleLikeClick(e) {
    // style stuff
    this.setState({
      liked: !this.state.liked
    });

    //api STUFF

  }
  render() {
    let classes = classNames({
      filled: this.state.liked,
      notFilled: !this.state.liked,
      hideLikeHeart: !this.props.login,
      likeHeart: true
    });
    return (
      <div className={classes} onClick={this.handleLikeClick.bind(this)}></div>
    );
  }
}
