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
  console.log("in api get comments");
  console.log(req.query.item);
  let item = req.query.item;
  Comment.find({'item': item}).exec(
    function(err, comments, count) {
      res.send(comments);
    }
  );
})

app.post("/api/addComment", function(req, res) {
  var comment = req.body;
  console.log(comment);
  console.log(comment.item);
  new Comment({
    text: comment.comment,
    item: comment.item
  }).save(function(err, comment) {
    if(err){
      console.log("uh oh, error saving new comment 2 db", err);
    } else {
      console.log("post save cmment return", comment);
      res.send(comment);
    }
  })
});

app.post("/api/addUser", (function(req, res) {
  var user = req.body;
  User.findOne({"fbID": user.id}, function(err, person) {
    if(err) {
      console.log("error while adding user ", err);
      return;
    }
    if(person == null) {
      // save into user
      new User({
        fbID: user.id,
        name: user.name
      }).save(function(err, person, count) {
        if(err) {
          console.log("error while saving user to db ", err);
          return;
        }

      })
    } else {
      // we're good.
    }
    res.send(person);
  });
}));

app.post('/api/uploadImage', upload.single('itemImage'), (function(req, res, next) {
  console.log("we startin upload image");
  console.log(req.file);
  //we should only get the path AFTER whatever is static...
  let path = req.file.path;
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
    name: item.itemRestaurantAddress,
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
          console.log("o no item error idk what to do lol ***!");
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

  socket.on("disconnect", function() {
    console.log("user disconnected");
  })
});
