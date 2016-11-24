// ***this can be added if there is going to be something new for the user creating
// lists OTHER THAN just things that they have favorited.

// var List = new mongoose.Schema({
//   restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }],
//   name: {type: String, required: true},
//   createdAt: {type: Date, required: true},
//   updatedAt: {type: Date, required: true},
// });
//
// List.pre('save', function(next){
//   now = new Date();
//   this.updatedAt = now;
//   if ( !this.createdAt ) {
//     this.createdAt = now;
//   }
//   next();
// });

// users
// * our site requires authentication...
// * so users have a username and password
// * they also can have 0 or more lists
var mongoose = require('mongoose');

var User = mongoose.Schema({
  // username, password provided by plugin
  lists:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}]
});

var Item = mongoose.Schema({
  name: {type: String, required: true},
  price: {type: Number, required: true},
  restaurant: {type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'},
  favorites: {type: Number, required: true},
  imgUrl: {type: String, required: true},
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
  geoLocation: //look into google maps api more to find most suitable type (probably number array)
  name: {type: String, required: true},
  items: {type: mongoose.Schema.Types.ObjectId, ref: 'Item'}
});

mongoose.model("User", User);
mongoose.model("Item", Item);
mongoose.model("Comment", Comm);
mongoose.model("Restaurant", Restaurant);

// is the environment variable, NODE_ENV, set to PRODUCTION?
if (process.env.NODE_ENV == 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 var fs = require('fs');
 var path = require('path');
 var fn = path.join(__dirname, 'config.json');
 var data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 var conf = JSON.parse(data);
 var dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/YOUR_DATABASE_NAME_HERE';
}

mongoose.connect(dbconf);
