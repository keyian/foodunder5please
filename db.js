var mongoose = require('mongoose');

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

mongoose.connect("mongodb://localhost/fu5p");
