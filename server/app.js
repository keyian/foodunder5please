const express = require('express');
const morgan = require('morgan');
const path = require('path');

const app = express();

require('./db');

// let mongoose = require('mongoose');
//
// let Restaurant = mongoose.model("Restaurant");
// let Item = mongoose.model("Item");

// Setup logger
app.use(morgan(':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'));

// Serve static assets
app.use(express.static(path.resolve(__dirname, '..', 'build')));

// Always return the main index.html, so react-router render the route in the client
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', 'build', 'index.html'));
});

app.post('/api/addItem', (req, res) => {
  //***! check for restaurant to validate

  let item = req.body.item;
  //for now, just make the restaurant
  new Restaurant({
    //array, of lat by lng geocode
    geoLocation: item.itemRestaurantGeocode,
    name: item.itemRestaurantAddress,
    items: []
  }).save(function(err, rest, count) {
    new Item({
      name: item.itemName,
      price: +item.itemCost,
      restaurant: rest,
      favorites: 0,
      imgUrl: "***! need to put actual imgUrl",
      videoUrl: "***! need to setup check for videoUrl"
    }).save(function(err, item, count) {
      if(err) {
        console.log("o no error idk what to do lol ***!");
      } else {
        rest.items.push(item);
        // rest.save(function(err, rest, count) {
        //   // do nothing
        // });
        // ***! send item to dom
        // return item;
      }
    });

  });
});

module.exports = app;
