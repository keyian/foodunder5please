let exports = module.exports = {};

exports.addItem = function(item) {
  console.log("hello");
  console.log(item);
  console.log(encodeURIComponent(JSON.stringify(item)));

  let fd = new FormData(document.getElementById("addItemForm"));

  // let reader = new FileReader();
  // reader.onloadend = (() => {
  //   console.log(reader.result);
  // });
  // reader.readAsDataURL(file);
  console.log(fd);
  // Display the key/value pairs
  for(let pair of fd.entries()) {
     console.log(pair[0]+ ', '+ pair[1]);
  }
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
      response.json().then(function(data) {
        //return and then post to dom
        console.log(data);
      });
    }
  );


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
      response.json().then(function(data) {
        //return and then post to dom
        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log("fetch error... ", err);
  });

};
