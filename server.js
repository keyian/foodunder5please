const express = require('express');
let multer = require('multer');
let storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now())
  }
});
let upload  = multer({ dest: "projClient/public/uploads/"});


// check if you actually need to
require('./db');
let mongoose = require('mongoose');
let Restaurant = mongoose.model("Restaurant");
let Item = mongoose.model("Item");

const app = express();

const fs = require('fs');

let bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('projClient/build'));
}

app.post('/api/uploadImage', upload.single('itemImage'), (req, res, next) => {
  console.log("we startin upload image");
  console.log(req.file);


});

app.post('/api/addItem', (req, res) => {
  //***! check for restaurant to validate

  let item = req.body;
  console.log(item);
  //for now, just make the restaurant
  new Restaurant({
    //array, of lat by lng geocode
    geoLocation: item.itemRestaurantGeocode,
    name: item.itemRestaurantAddress,
    items: []
  }).save(function(err, rest, count) {
    if(err) {
      console.log("o no restaurant error idk what to do lol ***! ", err);
    } else {
      if(item.itemImageFile) {
        console.log("we got an image file yo -- not going through this part of the api though");
        //instead use fetch to go to different route and add image from there...
      //   fs.readFile(item.itemImageFile.path, function (err, data) {
      //     let itemImgPath = __dirname + "/uploads/uploadedFileName";
      //     fs.writeFile(itemImgPath, data, function (err) {
      //       console.log(err);
      //   });
      // });
      }
      new Item({
        name: item.itemName,
        price: +item.itemCost,
        restaurant: rest,
        favorites: 0,
        imgPath: "***! need to put actual imgPath",
        videoUrl: "***! need to setup check for videoUrl"
      }).save(function(err, item, count) {
        if(err) {
          console.log("o no item error idk what to do lol ***!");
        } else {
          // rest.items.push(item);
          // rest.save(function(err, rest, count) {
          //   // do nothing
          // });
          // ***! send item to dom
          // return item;
        }
      });
    }
  });
});

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
