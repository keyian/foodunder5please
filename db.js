"use strict"
var mongoose = require('mongoose');

let dbconf="";

var User = mongoose.Schema({
  // username, password provided by plugin
  list:  [{ type: Array, required: true }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

var Item = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
  favorites: {type: Number, required: true},
  imgPath: {type: String, required: true},
  videoUrl: {type: String, required: false}
},
{
  timestamps: true
});

var Comm = mongoose.Schema({
  text: {type: String, required: true},
  user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var Restaurant = mongoose.Schema({
  //array, of lat by lng geocode
  geoLocation: {type: Array, required: true},
  name: {type: String, required: true},
  items: {type: [mongoose.Schema.Types.ObjectId], ref: "Item"}
});

mongoose.model("User", User);
mongoose.model("Item", Item);
mongoose.model("Comment", Comm);
mongoose.model("Restaurant", Restaurant);

if(process.env.NODE_ENV == "PRODUCTION") {
    // if we're in PRODUCTION mode, then read the configration from a file
   // use blocking file io to do this...
   let fs = require('fs');
   let path = require('path');
   let fn = path.join(__dirname, 'config.json');
   let data = fs.readFileSync(fn);

   // our configuration file will be in json, so parse it and set the
   // conenction string appropriately!
   let conf = JSON.parse(data);
   console.log(conf);
   dbconf = conf.dbconf;
} else {
  dbconf = "mongodb://localhost/fu5p";
}
mongoose.connect(dbconf);
