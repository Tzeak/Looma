/*
 * File: Ajax.js
 * Description: This will connect the views to the actual data stored on Looma
 * 
 */

// var timeline = function() {
// 	var request = new XMLHttpRequest();		//Construct the ajax variable
// 	var response;

// 	request.onreadystatechange = function() {//Step 3: Collect Server's Response

// 	 This is a callback function. It is defined here but is 
// 	 * only called after the connection is opened, request.send().
// 	 *
// 	 * Everytime the request changes, this function is called due to "onreadystatechange".
// 	 *
// 	 * When readyState === 4, that means a successful response has been collected.
// 	 * the response the Back End gives the Front End will be a STRING in JSON Format.
	 
// 		if (request.readyState === 4)		//Upon receiving the response
// 			response = request.responseText;	//collect response string
// 			json = JSON.parse(response);	//converts string into an Object
// 			document.getElementById('thingy').innerHTML = json;
// 	};
// 	request.open("GET", "../FirstTry/timeline.php");	// Step 1: Define the type of request (GET vs POST)
// 	request.send();							// Step 2: Connect to Server
//                                             // Step 3: Collect Server's Response -  Look @ Callback Function on Line 12
// };

var json;
var fin;
$("#thingy").load("../FirstTry/timeline.html", function(json){
	fin = JSON.parse(json);
	document.getElementById('notthingy').innerHTML = fin[1]._id.$id;


});
// json = JSON.parse(json);
// document.getElementById('thingy').innerHTML = json;

