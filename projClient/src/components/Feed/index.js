import React, { Component } from 'react';

import './style.css';

import FeedItem from '../FeedItem';

let api = require('../../apiMethods.js');

//use api to get all posts
//enter the information of the posts via loop into feed items
//display feed items via loop
export default class Feed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    // fetch all the items... actually do this in app...?
    api.getItems(this.gotItems.bind(this));
    // iterate through them
  }

  gotItems(items) {
    console.log(items)
    let itemList = [];
    items.forEach((item) => itemList.push(item));
    console.log(itemList)
    this.setState({
      items: itemList
    });
    console.log(this.state.items);
  }

  render() {
    return (
      <div>
        {this.state.items.map(
          (item)=> <FeedItem item={item} />)
        }
      </div>
    );
  }
}
