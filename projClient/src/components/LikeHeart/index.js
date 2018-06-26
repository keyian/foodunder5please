import React, { Component } from 'react';

import './style.css';
let classNames = require('classnames');
let apiMethods = require('../../apiMethods.js');


export default class LikeHeart extends Component {
  constructor(props) {
    super(props);
    let api = new apiMethods(this.props.socket);
    console.log("user in likeheart", this.props.user);
    this.state = {
      api: api,
      liked: (this.props.login)?(this.props.user.favorites.includes(this.props.item._id)):(false)
    }
    console.log("in like heart; liked value is ", this.state.liked);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.login){
      this.setState({
        liked: nextProps.user.favorites.includes(""+nextProps.item._id)
      });
    }
  }

  handleLikeClick(e) {
      console.log("before click, this is state... ", this.state.liked);
      if(this.props.login) {
        this.setState({
          liked: this.props.user.favorites.includes(""+this.props.item._id)
        });
      }
      console.log(this.state.liked);
      this.state.api.favoriteClick(this.props.user._id, this.props.item._id, this.state.liked);
  }

  render() {
    let classes = classNames({
      filled: this.state.liked,
      notFilled: !this.state.liked,
      hideLikeHeart: !this.props.login,
      likeHeart: true
    });
    return (
      <div>
        <div className={classes} onClick={this.handleLikeClick.bind(this)}></div>
        <p>Favorites: {this.props.item.favorites}</p>
      </div>
    );
  }
}
