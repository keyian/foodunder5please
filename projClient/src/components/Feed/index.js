import React, { Component } from 'react';

import './style.css';

import FeedItem from '../FeedItem';

let apiMethods = require('../../apiMethods.js');


//use api to get all posts
//enter the information of the posts via loop into feed items
//display feed items via loop
export default class Feed extends Component {

  realTimeAddItem(item) {
    console.log("client side add item emission received");
    console.log(item);
    console.log(this.state.items);
    item.restaurant = item.restaurant.id;
    console.log("now item restaurant is...", item.restaurant)
    let oldItems = this.state.items;
    oldItems.unshift(item);
    console.log("olditems unshift object", oldItems);
    this.setState({
      items: oldItems
    });
  }

  constructor(props) {
    super(props);
    let api = new apiMethods(this.props.socket)
    this.state = {
      items: [],
      api: api
    };
  }

  componentDidMount() {
    // fetch all the items... actually do this in app...?
    this.state.api.getItems(this.gotItems.bind(this));

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
          (item, i)=> <FeedItem key={i} item={item} />)
        }
      </div>
    );
  }
}
