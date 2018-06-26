import React, { Component } from 'react';

import './style.css';

import FeedItem from '../FeedItem';

let apiMethods = require('../../apiMethods.js');

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

//use api to get all posts
//enter the information of the posts via loop into feed items
//display feed items via loop
export default class Feed extends Component {

  constructor(props) {
    super(props);
    let api = new apiMethods(this.props.socket)
    this.state = {
      items: [],
      restaurants: [],
      api: api
    };
  }

  realTimeAddItem(item) {
    //prepend restaurant of new item to restaurantList
    let nuRestaurants = this.state.restaurants;
    nuRestaurants.unshift(item.restaurant);
    item.restaurant = item.restaurant._id;

    //prepend new item to item list
    let nuItems = this.state.items;
    nuItems.unshift(item);

    console.log("6/26/18, let's see what the nuItems look like", nuItems);

    this.setState({
      items: nuItems,
      restaurants: nuRestaurants
    });
  }

  realTimeItemFavorite(item) {
    console.log("socket is calling realTimeItemFavorite", item);
    let nuItems = this.state.items;
    //find index of item with appropriate item id
    let changedItemIndex = nuItems.findIndex(function(oldItem) {
      return item._id === oldItem._id;
    });
    nuItems[changedItemIndex] = item;
    this.setState({
      items: nuItems
    });
  }

  componentWillMount() {
    // fetch all the items... actually do this in app...?
    console.log("is this what calls getItems?")
    this.state.api.getItems(this.gotItems.bind(this));

    this.props.socket.on('item added', this.realTimeAddItem.bind(this));
    this.props.socket.on('item favorite change', this.realTimeItemFavorite.bind(this));
  }

  gotItems(items) {
    let itemList = [];
    let restaurantList = [];
    items.forEach(function(item) {
      restaurantList.push(item.restaurant);
      item.restaurant = item.restaurant._id;
      itemList.push(item);
    });
    console.log(itemList);
    this.setState({
      items: itemList,
      restaurants: restaurantList
    });
  }

  render() {
    return (
      <div>
        <ReactCSSTransitionGroup
          transitionName="feedItem"
          transitionEnterTimeout={1000}
          transitionLeaveTimeout={1000}
          transitionAppear={true}
          transitionAppearTimeout={1000}>
            <h1>FEED ME</h1>
            {this.state.items.map(
              (item, i)=> <FeedItem key={i} item={item} user={this.props.user} login={this.props.login} restaurant={this.state.restaurants[i]} socket={this.props.socket}/>)
            }
        </ReactCSSTransitionGroup>
      </div>
    );
  }
}
