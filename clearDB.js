// check if you actually need to
require('./db');
var mongoose = require('mongoose');
var Restaurant = mongoose.model("Restaurant");
var Item = mongoose.model("Item");
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

Restaurant.remove({});
Item.remove({});
User.remove({});
Comment.remove({});
