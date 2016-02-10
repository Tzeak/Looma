/*
 * File: Ajax.js
 * Description: This will connect the views to the actual data stored on Looma
 * 
 */

var timeline = function() {
	var request = new XMLHttpRequest();			//Construct the ajax variable
	var response;

	req.onreadystatechange = function() {
		if (req.readyState === 4)			//Upon receiving the response
			  response = xhr.responseText;	//collect response
					


	};
	req.open("GET", "timeline.php"); //Or whatever we wind up calling the php module

	function sendAJAX() {
		req.send(); //This is the sign that I still don't understand js - Roshan x.x
	}

}



