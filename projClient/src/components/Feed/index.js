import React, { Component } from 'react';

import './style.css';

import FeedItem from '../FeedItem';

let api = require('../../apiMethods.js');


//use api to get all posts
//enter the information of the posts via loop into feed items
//display feed items via loop
export default class Feed extends Component {

  realTimeAddItem(item) {
    console.log("client side add item emission received");

    let oldItems = this.state.items;
    oldItems.unshift("blooby");
    this.setState({
      items: oldItems
    });
  }

  constructor(props) {
    super(props);
    this.state = {
      items: []
    };
  }

  componentDidMount() {
    // fetch all the items... actually do this in app...?
    api.getItems(this.gotItems.bind(this));

    this.props.socket.on('item added', this.realTimeAddItem.bind(this));
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
