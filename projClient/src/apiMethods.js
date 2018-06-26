module.exports = class APIMethods {
  constructor(socket) {
    this.socket = socket;
    this.item = {};
  }

  getComments(cb, item) {
    let reqURL = '/api/getComments';
    reqURL += '?item='+item;
    fetch(reqURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          //return so feed can present
          return cb(data);
        });
      }
    )
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

  getFavoritesPopulated(cb, userID) {
    let reqURL = '/api/getFavoritesPopulated';
    reqURL += '?userID='+userID;
    fetch(reqURL, {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          //return so feed can present
          return cb(data);
        });
      }
    )
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

  getItems(cb) {
    fetch('/api/getItems', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }).then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          //return so feed can present
          return cb(data);
        });
      }
    )
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

  addItem(item) {
    this.item = item;

    let fd = new FormData(document.getElementById("addItemForm"));

    fetch('/api/uploadImage',  {
      method: 'POST',
      body: fd
    }).then(this.uploadImageInitialCallback.bind(this));
  }

  uploadImageInitialCallback(response) {
    if(response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }
    // Examine the text in the response
    response.text().then(this.uploadImageResponseCallback.bind(this));
  }

  uploadImageResponseCallback(data) {
    //return and then post to dom
    this.item.uploadedImagePath = data;
    fetch('/api/addItem', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.item)
    }).then(this.addItemInitialCallback.bind(this))
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

  addItemInitialCallback(response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(this.addItemResponseCallback.bind(this));
  }

  addItemResponseCallback(item) {
      this.socketItemAdded(item);
  }

  socketItemAdded(item) {
    this.socket.emit("item added", item);
    return false;
  }

  submitComment(comment, item, user) {
    let commentObject = {comment: comment, item: item, user: user};
    //***! eventually validate comment?
    fetch('/api/addComment', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(commentObject)
    }).then(this.addCommentInitialCallback.bind(this))
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

  addCommentInitialCallback(response) {
    if(response.status !== 200) {
      console.log("oh no, looks like there was a problem. Response Status Code: ", response.status);
      return;
    }
    response.json().then(this.addCommentResponseCallback.bind(this));
  }

  addCommentResponseCallback(comment) {
    this.socketCommentAdded(comment);
  }

  socketCommentAdded(comment) {
    this.socket.emit("comment added", comment);
  }

  addAndOrGetUser(user, cb) {
    fetch('/api/addAndOrGetUser', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }).then(
      function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }

        // Examine the text in the response
        response.json().then(function(data) {
          //return and then post to dom
          //this should be user ID not FACEBOOK ID
          cb(data);
        });
      }
    )
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

/*
-this api method takes the _id values of user and item, as well as the current "liked" state (pre-click)
-first it POSTS to api/favoriteClick (check server.js)
-the response is then sent to an initial callback which checks if there was a non-200 response Status
-then the response is sent to a second callback which sends the "userItemObject" to socketFavoriteClick (see below)
-finally, socketFavoriteClick emits a favorite click
-user favorites changed in server.js
*/
  favoriteClick(userID, itemID, current) {
    let userItemObject = {user: userID, item: itemID, isLiked: current};
    //***! eventually validate comment?
    fetch('/api/favoriteClick', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userItemObject)
    }).then(this.favoriteClickInitialCallback.bind(this))
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

  favoriteClickInitialCallback(response) {
    if(response.status !== 200) {
      console.log("oh no, looks like there was a problem. Response Status Code: ", response.status);
      return;
    }
    response.json().then(this.favoriteClickResponseCallback.bind(this));
  }

  favoriteClickResponseCallback(userItemObject) {
    this.socketFavoriteClick(userItemObject);
  }

  socketFavoriteClick(userItemObject) {
    this.socket.emit("favorite click", userItemObject);
    // return false;
  }

}
