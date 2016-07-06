/*
 * File:		load.js
 * 
 * Description:	This file is a simple js library designed to allow for the front-end of the
 *				application to securely access the timelines.
 *				It also defines a few auxillary functions that didn't fit in a narrative sense
 *				in the front-end application.
 */

//This global is to make sure multiple timelines aren't opened per session.
var isTimelineOpen = false;


/* Function:		getParameterByName(name, url)
 * Description:		Input	- name of a parameter in a given URL
 *							If no URL, the URL is assumed to be the window.location
 *	 				Return	- data associated with var name or null
 */
function getParameterByName(name, url) {
	console.log("getParameterByName");
	if (!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
		results = regex.exec(url);
	if (!results) return null; //if no results, returns null
	if (!results[2]) return ''; 
	return decodeURIComponent(results[2].replace(/\+/g, " ")); //Returns the value given a particular parameter name
}


/* Function:		opentime()
 * Description:		Input	- 
 *	 				Return	- Array of Timeline Data pulled from openTimeline.php
 */
function opentime(){
	var timelineArray = new Array();

	console.log("opentime() called");
	var timelineID = getParameterByName("timelineId");
	timelineID = {"$id" : timelineID}; //Set up in format for querying mongo database

	if(!isTimelineOpen) {
		if(timelineID["$id"] == null)
			console.log("returning empty array");
		else 
		{
			$.post("../BackEnd/open.php", timelineID, function(data){
				data = JSON.parse(data);
				$("#titleInput").attr("value", data.name);
			}).fail(function(jqXHR){
				console.log("open.php " + jqXHR.status);
			});

			
			$.ajax({
				url: "../BackEnd/openTimeline.php",
				dataType: 'json',
				async: false,
				data: timelineID,
				success: function(timelineData){
					console.log("getting timeline");
					$.each(timelineData, function(index, val){
						timelineArray.push(val);
						console.log(timelineData);
					});
				}
			}).fail(function(jqXHR){
				console.log(jqXHR.status)
				$.get("../BackEnd/openTimeline.php", timelineID, function(timelineData){
					console.log(timelineData);
				});
			});

		}
			
		
		isTimelineOpen = true;
	}
		return timelineArray;
}

//I'm not sure who wrote these, but I don't think they do anything....
function deletetime(itemId) {
	console.log("deletetime() called");
	// timelineID = {"$id" : timelineID}; //Set up in format for querying mongo database
}

function getTimelineTitle(timelineData) {
	console.log(timelineData);
	return timelineData;
}
