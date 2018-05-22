var express = require('express');
var multer = require('multer');

var mimeToExt = {
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/png": "png"
}

const imgLoc = "images/uploads";

var saveLoc = "";
if(process.env.NODE_ENV === "PRODUCTION") {
  saveLoc = 'projClient/build/'+imgLoc;
} else {
  saveLoc = 'projClient/public/'+imgLoc;
}
var storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, saveLoc)
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
var User = mongoose.model("User");
var Comment = mongoose.model("Comment");

var app = express();

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

app.get("/api/getItems", function(req, res) {
  Item.find({}).sort({createdAt: -1 }).populate('restaurant').exec(function(err, items) {
    if(err) {
      console.log("error while getting items. me sad sad. ", err);
      return;
    } else {
      res.send(items);
    }
  });
});

app.get("/api/getComments", function(req, res) {
  var item = req.query.item;
  Comment.find({'item': item}).exec(
    function(err, comments, count) {
      res.send(comments);
    }
  );
});

app.get("/api/getFavoritesPopulated", function(req, res) {
  var userID = req.query.userID;
  User.findById(userID)
  .populate({
  	path:     'favorites',
  	populate: { path:  'restaurant'}
  })
  .exec(function(err, user) {
    if(err) {
      console.log("error getting populated user", err);
      return;
    }
    res.send(user);
  });
});

app.post("/api/addComment", function(req, res) {
  var comment = req.body;
  console.log("in addComment", comment);
  console.log(comment.item);
  new Comment({
    text: comment.comment,
    item: comment.item,
    user: comment.user._id,
    userName: comment.user.name
  }).save(function(err, comment) {
    if(err){
      console.log("uh oh, error saving new comment 2 db", err);
      return;
    } else {
      User.findOne({_id: comment.user}, function(err, user) {
        if(err) {
          console.log("oops error at user comments array update", err);
          return;
        }        // do nothing...
        //push to user comments
        user.comments.push(comment._id);

        user.save(function(err, user) {
          console.log("updated user comments array for", user);
          res.send(comment);
        });
      });
    }
  });
});

app.post("/api/addAndOrGetUser", (function(req, res) {
  var userLogin = req.body;
  console.log("we at addAndOrGetUser");
  User.findOne({fbID: userLogin.id}, function(err, user) {
    if(err) {
      console.log("err while looking for user", err);
      return;
    }
    //not an error; is user null? if yes, create the user; if no, return the user
    if(user === null) {
      new User({
        fbID: userLogin.id,
        first_name: userLogin.first_name,
        last_name: userLogin.last_name,
        email: userLogin.email
      }).save(function(err, newUser) {
        res.send(newUser);
      });
    } else {
      console.log("we gon send?");
      res.send(user);
    }
  });

}));

app.post('/api/uploadImage', upload.single('itemImage'), (function(req, res, next) {
  console.log("we startin upload image");
  console.log(req.file);
  //we should only get the path AFTER whatever is static...
  var path = req.file.path;
  path = path.substr(path.indexOf(imgLoc));
  res.send(path);
}));

app.post('/api/addItem', function(req, res) {
  //***! check for restaurant to validate
  var item = req.body;
  console.log(item);
  //for now, just make the restaurant
  new Restaurant({
    //array, of lat by lng geocode
    geoLocation: item.itemRestaurantGeocode,
    name: item.itemRestaurantName,
    location: item.itemRestaurantAddress,
    items: []
  }).save(function(err, rest, count) {
    if(err) {
      console.log("o no restaurant error idk what to do lol ***! ", err);
    } else {
      if(item.itemImageFile) {
        console.log("we got an image file yo -- not going through this part of the api though");
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
          console.log("o no item error idk what to do lol ***!", err);
        } else {
          rest.items.push(item);
          rest.save(function(err, rest, count) {
            // do nothing
            res.send(item);
          });
          // ***! send item to dom
          // return item;
        }
      });
    }
  });

});

app.post("/api/favoriteClick", function(req, res) {
  var userItemObject = req.body;
  var isLiked = userItemObject.isLiked;
  var nuUserItemObject = {liked: isLiked};

  console.log("in favorite click", userItemObject);

  Item.findOne({_id: userItemObject.item}, function(err, item) {
    if(err) {
      console.log("error finding item to favorite", err);
      return;
    }
    if(isLiked) {
      console.log("is liked, so decreasing");
      item.favorites--;
    } else {
      console.log("is not liked, so increasing");
      item.favorites++;
    }
    item.save(function(err, item) {
      if(err) {
        console.log("error saving item favorite change");
        return;
      }
      nuUserItemObject.item = item;
      User.findOne({_id: userItemObject.user}, function(err, user) {
        if(err){
          console.log("error finding user to change favorite", err);
          return;
        }
        if(isLiked) {
          console.log("checking isliked");
          var index = user.favorites.indexOf(item._id);
          console.log("checking isliked, favorites && index of fav", user.favorites, index);
          user.favorites.splice(index, 1);
          console.log("post isliked click, favorites", user.favorites);
        } else {
          user.favorites.push(item);
        }

        user.save(function(err, user) {
          if(err){
            console.log("error saving user favorite change", err);
            return;
          }
          nuUserItemObject.user = user;
          res.send(nuUserItemObject);
        });
      });
    });
  });
});

// SOCKET STUFF

var server = app.listen(app.get('port'), function() {
  console.log("listening on port ", app.get('port'));
});

var io = require('socket.io')(server);

io.on('connection', function(socket){
  console.log('a user connected');
  socket.on("item added", function(item){
    console.log("server side item added event called");
    io.emit("item added", item);
  });

  socket.on("comment added", function(comment) {
    console.log("server side comment added event called");

    io.emit("comment added", comment);
  });

  socket.on("favorite click", function(userItemObject) {
    //update favorite count for item by incrementing by 1
    io.emit("item favorite change", userItemObject.item);
    //update favorite array for user by adding item ID
    console.log("about to emit user favorite change");
    socket.emit("user favorite change", userItemObject.user);
  });

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });


});
