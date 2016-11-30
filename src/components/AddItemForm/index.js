/*global FB*/
// ^^ using the global FB tag to disable the ESLint's "no-undef" rule

import React, { Component } from 'react';

import './style.css';

export default class AddItemForm extends Component {
  componentDidMount() {
    constructor(props) {
      super(props);
      this.state = {
        itemName: "",
        itemCost: 0,
        itemRestaurant: ""
      };
    }

    showHideForm() {
      let form = document.getElementById("addItemForm");
      ((form.style.display == "none") ? (form.style.display = "block") : (form.style.display = "none"));
    }

    handleClick(e) {
      e.preventDefault();
    }

    render() {
      return (
        <div id="addItemFormBox">
          <button onClick={this.showHideForm}></button>
          <form id="addItemForm" method="POST" action="">
            <div>
              <label for="itemName">Name of Item:</label>
              <input type="text" name="itemName" id="itemName" value={this.state.itemName}>
            </div>
            <div>
              <label for="itemCost">Cost: $</label>
              <input type="text" name="itemCost" id="itemCost" value={this.state.itemCost}>
            </div>
            <div>
              <label for="itemRestaurant">Restaurant:</label>
              <input type="text" name="itemRestaurant" id="itemRestaurant" value={this.state.itemRestaurant}>
            </div>
            <input type="submit" name="addItemBtn" id="addItemBtn" value="Add Item">
          </form>
        </div>
      );
    }
}
