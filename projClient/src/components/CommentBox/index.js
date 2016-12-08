import React, { Component } from 'react';

import './style.css';

let apiMethods = require('../../apiMethods.js');

export default class CommentBox extends Component {

  constructor(props) {
    super(props);
    let api = new apiMethods(this.props.socket)
    this.state = {
      comments: [],
      input: "",
      api: api
    };
  }

  componentDidMount() {
    // fetch all the items... actually do this in app...?
    this.state.api.getComments.apply(this.state.api, [this.gotComments.bind(this), this.props.item]);

    this.props.socket.on('comment added', this.realTimeAddComment.bind(this));
  }

  gotComments(comments) {
    console.log("in got comments", comments);
    let commList = [];
    comments.forEach(function(comment) {
      commList.push(comment);
    });
    console.log(commList);
    this.setState({
      comments: commList
    });
  }

  handleChange(e) {
    this.setState({input: e.target.value});
  }

  handleEnter(e) {
    if(e.key === "Enter") {
      e.preventDefault();
      this.submitComment();
    }
  }

  submitComment() {
    console.log("in commentbox submitcomment...");
    console.log("comment added client side by", this.props.user);
    this.state.api.submitComment.apply(this.state.api, [this.state.input, this.props.item, this.props.user._id]);
    this.setState({input: ""});
  }

  realTimeAddComment(comment) {
    console.log(this.props.item);
    console.log(comment.item);
    console.log("in realTimeAddComment; this is user:", this.props.user);
    if(comment.item === this.props.item) {
      let nuComments = this.state.comments;
      nuComments.push(comment);
      this.setState({comments: nuComments});
    }
  }

  render() {
    return (
      <div>
        <ul>
        {this.state.comments.map((comment, i)=> <li key={i}>{comment.text}</li>)}
        </ul>
      <textarea className={(this.props.login) ? ("showCommentInput"):("hideCommentInput")} value={this.state.input}style={{resize: "none"}} rows="4" cols="50" placeholder="Comment..." onChange={this.handleChange.bind(this)} onKeyPress={this.handleEnter.bind(this)}>
      </textarea>
      </div>
    );
  }
}
