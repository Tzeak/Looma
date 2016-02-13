/*
 * File: Ajax.js
 * Description: This will connect the views to the actual data stored on Looma
 * 
 */

var timeline = function() {
	var request = new XMLHttpRequest();		//Construct the ajax variable
	var response;


	request.onreadystatechange = function() {
	/* This is a callback function. It is called after the connection is opened, request.send().
	 * Everytime the request changes, this function is called due to "onreadystatechange".
	 * When readyState === 4, that means a successful response has been collected
	 * the response the Back End gives the Front End will be a STRING 
	 * in JSON Format.
	 */
		if (request.readyState === 4)		//Upon receiving the response
			response = xhr.responseText;	//collect response string

	};
	request.open("GET", "function.php");	//Define the type of request (GET vs POST)
	request.send(); //Connect to Server
};





