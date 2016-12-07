module.exports = class APIMethods {
  constructor(socket) {
    this.socket = socket;
    this.item = {};
  }

  addItem(item) {
    this.item = item;
    console.log("in add item", this);
    console.log(this.socket);

    let fd = new FormData(document.getElementById("addItemForm"));

    fetch('/api/uploadImage',  {
      method: 'POST',
      body: fd
    }).then(this.uploadImageInitialCallback.bind(this));
  }

  uploadImageInitialCallback(response) {
    console.log("upImInCB logging this...");
    console.log(this);
    if(response.status !== 200) {
      console.log('Looks like there was a problem. Status Code: ' +
        response.status);
      return;
    }
    // Examine the text in the response
    response.text().then(this.uploadImageResponseCallback.bind(this));
  }

  uploadImageResponseCallback(data) {
    console.log('uploaded img where we at now..');
    //return and then post to dom
    console.log(data);
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
      console.log("before socket item added");
      this.socketItemAdded(item);
  }

  socketItemAdded(item) {
    console.log(this);
    console.log("item added api callback— for socket.io");
    this.socket.emit("item added", item);
    return false;
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

  addUser(user) {
    fetch('/api/addUser', {
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
        response.text().then(function(data) {
          //return and then post to dom
          console.log(data);
        });
      }
    )
    .catch(function(err) {
      console.log("fetch error... ", err);
    });
  }

}
