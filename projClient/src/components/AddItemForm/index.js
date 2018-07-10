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
      restaurantName: "",
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

  onChangeRestaurantName(e) {
    this.setState({restaurantName: e.target.value});
  }

  //***! validate image for FILE TYPE, and SIZE!!!

  showHideForm(e) {
    this.setState({
      hideForm: !this.state.hideForm
    })
  }

  validateCoordinatesForNYC(coordinates) {
    if((coordinates.lat > 40.515887) && (coordinates.lat < 40.857448) && (coordinates.lng > -74.10553) & (coordinates.lng < -73.740234)) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit(e) {
    console.log("test1");
    e.preventDefault();

    let itemName = this.state.itemName;
    let itemCost = this.state.itemCost;
    let itemRestaurantName = this.state.restaurantName
    let itemRestaurantAddress = this.state.address;
    let itemImageFile = this.state.itemImageFile;

    //***! find a way to validate restaurant for not just being an address, but a place name as well...
    geocodeByAddress(itemRestaurantAddress, (err, coordinates) => {
      if(!coordinates) {
        alert("Could not find coordinates for entered location.\nIf you entered a restaurant name, try an address instead!");
        this.setState({
          address: ''
        });
        return;
      } else if(!this.validateCoordinatesForNYC(coordinates)) {
        alert("For now, we only support foods in NYC.\nCheck back later!");
        this.setState({
          itemName: '',
          itemCost: '',
          itemRestaurantName: '',
          address: '',
        });
        return;
      }
      console.log(coordinates);
      if (err) {
        console.log('Oh no!', err);
        return -1;
      } else {
        let geocodeArr = [];
        geocodeArr.push(coordinates.lat);
        geocodeArr.push(coordinates.lng);
        console.log("geocode " + geocodeArr + " " + this.state.itemCost);

        //check if name or amount are blank
        //***! later make extra validations
        if (!itemName || !itemCost || !itemRestaurantName) {
          if(!itemName) {
            alert("Item name must be entered.");
          } else if (!itemCost) {
            alert("Item cost must be entered.");
          } else  if (!itemRestaurantName) {
            alert("Restaurant name must be entered.");
          }
          return;
        }

        let itemRestaurantGeocode = geocodeArr;

        if(itemRestaurantGeocode !== -1) {
          console.log("we here");
          console.log(itemRestaurantGeocode);

          if(itemImageFile.name.length > 0) {
            console.log("yes file");
            this.props.onItemSubmit({itemName: itemName, itemCost: itemCost, itemRestaurantName: itemRestaurantName, itemRestaurantAddress: itemRestaurantAddress, itemRestaurantGeocode: itemRestaurantGeocode, itemImageFile: itemImageFile});
          } else {
            console.log("no file");
            this.props.onItemSubmit({itemName: itemName, itemCost: itemCost, itemRestaurantName: itemRestaurantName, itemRestaurantAddress: itemRestaurantAddress, itemRestaurantGeocode: itemRestaurantGeocode});
          }
          this.setState({
            itemName: '',
            itemCost: '',
            itemRestaurantName: '',
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
        <img id="addItemImgButton" onClick={this.showHideForm.bind(this)} src="/images/fu5pAddItemButton.svg" alt="add item" />
        <form className={formClasses} id="addItemForm" method="POST" onSubmit={this.handleSubmit.bind(this)} action="" encType="multipart/form-data">
          <div>
            <label htmlFor="itemRestaurantName">Restaurant Name:</label><br />
            <input type="text" name="restaurantName" id="itemRestaurantName" value={this.state.restaurantName} onChange={this.onChangeRestaurantName.bind(this)} />
          </div>
          <div>
            <PlacesAutocomplete id="itemRestaurantLocation" value={this.state.address} onChange={this.onChangeAdd} placeholder='search nyc locations...' />
          </div>
          <div>
            <label htmlFor="itemName">Name of Item:</label><br />
            <input type="text" name="itemName" id="itemName" value={this.state.itemName} onChange={this.onChangeName.bind(this)} />
          </div>
          <div>
            <label htmlFor="itemCost">Cost: </label><br />
            $<input type="text" name="itemCost" id="itemCost" value={this.state.itemCost}  onChange={this.onChangeCost.bind(this)} />
          </div>
          <div>
            <label htmlFor="itemImage">Add an image? (optional): </label><br />
            <input type="file" name="itemImage" id="itemImage" onChange={this.onChangeImage.bind(this)} />
          </div>
          <input type="submit" name="addItemBtn" id="addItemBtn" value="Add Item" />
        </form>
      </div>
    );
  }

}
