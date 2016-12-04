var express = require('express');
var multer = require('multer');

var mimeToExt = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png"
}

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'projClient/public/uploads')
  },
  filename: function (req, file, cb) {
    var ext = "." + mimeToExt[file.mimetype];
    cb(null, file.fieldname + '-' + Date.now()+ext);
  }
});
var upload  = multer({storage: storage});


// check if you actually need to
require('./db');
var mongoose = require('mongoose');
var Restaurant = mongoose.model("Restaurant");
var Item = mongoose.model("Item");

const app = express();

const fs = require('fs');

var bodyParser = require("body-parser");

app.set('port', (process.env.PORT || 3001));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Express only serves static assets in production
if (process.env.NODE_ENV === 'PRODUCTION') {
  console.log('using build!!!');
  app.use(express.static('projClient/build'));
}

// app.get("/", function(req, res) {
//   res.send()
// });

app.post('/api/uploadImage', upload.single('itemImage'), (function(req, res, next) {
  console.log("we startin upload image");
  console.log(req.file);
  res.send(req.file.path);
}));

app.post('/api/addItem', function(req, res) {
  //***! check for restaurant to validate
  var item = req.body;
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
      //     var itemImgPath = __dirname + "/uploads/uploadedFileName";
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
        imgPath: item.uploadedImagePath,
        videoUrl: "***! need to setup check for videoUrl"
      }).save(function(err, item, count) {
        if(err) {
          console.log("o no item error idk what to do lol ***!");
        } else {
          rest.items.push(item);
          rest.save(function(err, rest, count) {
            // do nothing
            res.send("we good chachi!");
          });
          // ***! send item to dom
          // return item;
        }
      });
    }
  });

});

app.listen(app.get('port'), function() {
  console.log("recording port???");
  console.log(app.get('port'));
});
