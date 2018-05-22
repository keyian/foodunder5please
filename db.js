var mongoose = require('mongoose');

var dbconf="";

var Comm = mongoose.Schema({
  text: {type: String, required: true},
  item: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Item'},
  user: {type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User'},
  userName: {type: String, required: true}
},
{
  timestamps: true
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

var Restaurant = mongoose.Schema({
  //array, of lat by lng geocode
  geoLocation: {type: Array, required: true},
  name: {type: String, required: true},
  location: {type: String, required: true},
  items: {type: [mongoose.Schema.Types.ObjectId], ref: "Item"}
},
{
  timestamps: true
});

var User = mongoose.Schema({
  fbID: {type: Number, required: true},
  first_name: {type: String, required: true},
  last_name: {type: String, required: true},
  email: {type: String, required: false},
  favorites:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: false }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false}]
},
{
  timestamps: true
});

mongoose.model("User", User);
mongoose.model("Item", Item);
mongoose.model("Comment", Comm);
mongoose.model("Restaurant", Restaurant);

if(process.env.NODE_ENV == "PRODUCTION") {
    // if we're in PRODUCTION mode, then read the configration from a file
   // use blocking file io to do this...
   var fs = require('fs');
   var path = require('path');
   var fn = path.join(__dirname, 'config.json');
   var data = fs.readFileSync(fn);

   // our configuration file will be in json, so parse it and set the
   // conenction string appropriately!
   var conf = JSON.parse(data);
   dbconf = conf.dbconf;
} else {
  dbconf = "mongodb://localhost/fu5p";
}
mongoose.connect(dbconf);
