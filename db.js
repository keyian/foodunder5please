var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

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
  fbID: {type: Number, required: false},
  first_name: {type: String, required: false},
  last_name: {type: String, required: false},
  username: {type: String, required: true, index: {unique: true} },
  password: {type: String, required: true},
  email: {type: String, required: false},
  favorites:  [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: false }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment', required: false}]
},
{
  timestamps: true
});

User.pre("save",
function () {    var user = this;
    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')){ return next();}

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) {
              return next(err);
            }
            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
      });
    });

User.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

var connStr = "mongodb://localhost:27017/mongoose-bcrypt-test";
mongoose.connect(connStr, function(err) {
    if (err) {
      throw err;
    }
    console.log("Successfully connected to MongoDB");
});

var UserModelEG = mongoose.model("User", User);
// create a user a new user
new UserModelEG({
    username: "jmar777",
    password: "Password123"
}).save(function(err) {
    if (err) {
      console.log("error at saving new user")
    }
});

// fetch user and test password verification
UserModelEG.findOne({ username: 'jmar777' }, function(err, user) {
    if (err) {
      console.log("error at findOne")
    }

    // test a matching password
    user.comparePassword('Password123', function(err, isMatch) {
      if (err) {
        console.log("error at first comparePassword")
      }
        console.log('Password123:', isMatch); // -> Password123: true
    });

    // test a failing password
    user.comparePassword('123Password', function(err, isMatch) {
      if (err) {
        console.log("error at second comparePassword")
      }
        console.log('123Password:', isMatch); // -> 123Password: false
    });
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
