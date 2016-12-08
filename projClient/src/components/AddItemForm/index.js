/*global FB*/
// ^^ using the global FB tag to disable the ESLint's "no-undef" rule
//***! <- stuff to do
import React, { Component } from 'react';

import PlacesAutocomplete, { geocodeByAddress } from 'react-places-autocomplete';

import './style.css';

let classNames = require('classnames');

export default class AddItemForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      itemName: "",
      itemCost: "",
      address: "",
      itemImageFile: "",
      hideForm: true
    };

    this.onChangeAdd = (address) => this.setState({address});
  }

  onChangeName(e) {
    this.setState({itemName: e.target.value});
  }

  onChangeCost(e) {
    this.setState({itemCost: e.target.value});
  }

  onChangeImage(e) {
    console.log("on image change");
    if(e.target.value.length > 0) {
      this.setState({itemImageFile: e.target.files[0]});
    }

  }

  //***! validate image for FILE TYPE, and SIZE!!!

  showHideForm(e) {
    this.setState({
      hideForm: !this.state.hideForm
    })
  }

  handleSubmit(e) {
    console.log("test1");
    e.preventDefault();

    let itemName = this.state.itemName;
    let itemCost = this.state.itemCost;
    let itemRestaurantAddress = this.state.address;
    let itemImageFile = this.state.itemImageFile;

    //***! find a way to validate restaurant for not just being an address, but a place name as well...
    geocodeByAddress(itemRestaurantAddress, (err, { lat, lng }) => {
      if (err) {
        console.log('Oh no!', err);
        return -1;
      } else {

        let geocodeArr = [];
        geocodeArr.push(lat);
        geocodeArr.push(lng);
        console.log("test2: " + geocodeArr + " " + this.state.itemCost);

        //check if name or amount are blank
        //***! later make extra validations
        if (!itemName || !itemCost) {
          console.log("item name or item cost is null");
          return;
        }

        let itemRestaurantGeocode = geocodeArr;

        if(itemRestaurantGeocode !== -1) {
          console.log("we here");
          console.log(itemRestaurantGeocode);

          if(itemImageFile.name.length > 0) {
            console.log("yes file");
            this.props.onItemSubmit({itemName: itemName, itemCost: itemCost, itemRestaurantAddress: itemRestaurantAddress, itemRestaurantGeocode: itemRestaurantGeocode, itemImageFile: itemImageFile});
          } else {
            console.log("no file");
            this.props.onItemSubmit({itemName: itemName, itemCost: itemCost, itemRestaurantAddress: itemRestaurantAddress, itemRestaurantGeocode: itemRestaurantGeocode});
          }
          this.setState({
            itemName: '',
            itemCost: '',
            address: '',
          });
          document.getElementById("itemImage").value = "";
        } else {
          console.log("error with geocode; operation canceled");
        }
      }
    });
  }

  render() {
    let boxClasses = classNames({
      hideAddItemForm: !this.props.login
    });
    let formClasses = classNames({
      hideForm: this.state.hideForm
    });
    return (
      <div id="addItemFormBox" className={boxClasses}>
        <button onClick={this.showHideForm.bind(this)}>Add Item</button>
        <form className={formClasses} id="addItemForm" method="POST" onSubmit={this.handleSubmit.bind(this)} action="" encType="multipart/form-data">
          <div>
            <label htmlFor="itemName">Name of Item:</label>
            <input type="text" name="itemName" id="itemName" value={this.state.itemName} onChange={this.onChangeName.bind(this)} />
          </div>
          <div>
            <label htmlFor="itemCost">Cost: $</label>
            <input type="text" name="itemCost" id="itemCost" value={this.state.itemCost}  onChange={this.onChangeCost.bind(this)} />
          </div>
          <div>
            <label htmlFor="itemImage">Add an image? (optional): </label>
            <input type="file" name="itemImage" id="itemImage" onChange={this.onChangeImage.bind(this)} />
          </div>
          <div>
            <label htmlFor="itemRestaurant">Restaurant:</label>
            <PlacesAutocomplete value={this.state.address} onChange={this.onChangeAdd} />
          </div>
          <input type="submit" name="addItemBtn" id="addItemBtn" value="Add Item" />
        </form>
      </div>
    );
  }

}
