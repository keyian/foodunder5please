let exports = module.exports = {};

exports.addItem = function(item) {
  console.log("hello");
  console.log(item);
  console.log(encodeURIComponent(JSON.stringify(item)));

  let fd = new FormData(document.getElementById("addItemForm"));

  fetch('/api/uploadImage',  {
    method: 'POST',
    body: fd
  }).then(
    function(response) {
      if(response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }
      // Examine the text in the response
      response.text().then(function(data) {
        console.log(process.env);
        //return and then post to dom
        console.log(data);
        item.uploadedImagePath = data;
        fetch('/api/addItem', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(item)
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
      });
    }
  );


  // fetch('/api/addItem', {
  //   method: 'POST',
  //   headers: {
  //     'Accept': 'application/json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: JSON.stringify(item)
  // }).then(
  //   function(response) {
  //     if (response.status !== 200) {
  //       console.log('Looks like there was a problem. Status Code: ' +
  //         response.status);
  //       return;
  //     }
  //
  //     // Examine the text in the response
  //     response.json().then(function(data) {
  //       //return and then post to dom
  //       console.log(data);
  //     });
  //   }
  // )
  // .catch(function(err) {
  //   console.log("fetch error... ", err);
  // });

};
