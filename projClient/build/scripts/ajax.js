// document.addEventListener("DOMContentLoaded", function(event) {
// //prevent default of add button
//   document.getElementById("addItemBtn").addEventListener("click", prevDef);
// //add click event for add item, which adds via API
//   document.getElementById("addItemBtn").addEventListener("click", addItem);
//
// //prevent default of whatever event
//   function prevDef(event) {
//     event.preventDefault();
//   }
//
// // add item, using API
//   function addItem() {
//     //get the values for each text field in the divs inside of the add form.
//       let addItemFields = document.querySelectorAll("#addItemFormBox>#addItemForm>input");
//       let formContent = {};
//       addItemFields.forEach(function(field) {
//         formContent[field.name] = field.value;
//       });
//       let requestArgs = "";
//       for(var key in formContent) {
//         if(formContent.hasOwnProperty(key)) {
//           requestArgs += key+"="+formContent[key]+"&";
//         }
//       }
//       requestArgs = requestArgs.substring(0, requestArgs.length - 1);
//
//       //add requests to the create api... then gets response and updates.
//       var req = new XMLHttpRequest();
//       req.open('POST', "/api/fu5p/item/add", true);
//       req.addEventListener('load', function() {
//       	if (req.status >= 200 && req.status < 400) {
//           let respTxt = JSON.parse(req.responseText);
//           console.log(respTxt);
//       	  if(respTxt.error) {
//             document.body.appendChild(document.createTextNode('uh-oh, something went wrong with your entry ' + JSON.stringify(respTxt.error.message)));
//           } else {
//             let entryTR = document.createElement("tr");
//             let entryMT = document.createElement("td");
//             let entryMD = document.createElement("td");
//             let entryMY = document.createElement("td");
//             entryMT.textContent = respTxt.title;
//             entryMD.textContent = respTxt.director;
//             entryMY.textContent = respTxt.year;
//             entryTR.appendChild(entryMT);
//             entryTR.appendChild(entryMD);
//             entryTR.appendChild(entryMY);
//             let movieList = document.getElementById("movie-list");
//             movieList.appendChild(entryTR);
//           }
//           console.log("we here in the request");
//           console.log(req.responseText);
//       	}
//       });
//       req.addEventListener('error', function(e) {
//   	     document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
//       });
//       req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//       req.send(requestArgs);
//     }
//
//     function getItems(event) {
//       let filterVal = document.getElementById("director").value;
//       let requestURL = "/api/movies?director="+encodeURIComponent(filterVal.trim());
//
//       var req = new XMLHttpRequest();
//       req.open('GET', requestURL, true);
//       req.addEventListener('load', function() {
//       	if (req.status >= 200 && req.status < 400) {
//           let films = JSON.parse(req.responseText);
//       		let movieList = document.getElementById("movie-list");
//           movieList.innerHTML = "";
//           console.log(films.movies);
//           (films.movies).forEach(function(film) {
//             let entryTR = document.createElement("tr");
//             let entryMT = document.createElement("td");
//             let entryMD = document.createElement("td");
//             let entryMY = document.createElement("td");
//             entryMT.textContent = film.title;
//             entryMD.textContent = film.director;
//             entryMY.textContent = film.year;
//             entryTR.appendChild(entryMT);
//             entryTR.appendChild(entryMD);
//             entryTR.appendChild(entryMY);
//             movieList.appendChild(entryTR);
//           })
//       	}
//       });
//       req.addEventListener('error', function(e) {
//   	     document.body.appendChild(document.createTextNode('uh-oh, something went wrong ' + e));
//       });
//       req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
//       req.send();
//     }
// });
