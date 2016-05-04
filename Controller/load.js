
	var isTimelineOpen = false;

	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null; //if no results, returns null
		if (!results[2]) return ''; 
		return decodeURIComponent(results[2].replace(/\+/g, " ")); //Returns the value given a particular parameter name
	}

	function opentime(){
		var timelineArray = new Array();

		console.log("opentime() called");
		var timelineID = getParameterByName("timelineId");
		timelineID = {"$id" : timelineID}; //Set up in format for querying mongo database


		// var createNewTimeElement = function(index, itemString) {
		// 	$('<div/>', {class: "timelinediv", id: "timediv" + index}).appendTo('#timelineWhole');
		// 	$('<li/>', {
		// 		id : "item" + index,
		// 		title: itemString,
		// 		text: itemString,
		// 	}).appendTo('#timediv' + index);
		// }

		if(!isTimelineOpen) {
			if(timelineID["$id"] == null)
				console.log("returning empty array");
			else 
			{
				// $.ajaxSetup({async: false});
				$.ajax({
					url: "/BackEnd/openTimeline.php",
					dataType: 'json',
					async: false,
					data: timelineID,
					success: function(timelineData){
						console.log("getting timeline");
						$.each(timelineData, function(index, val){
							// createTimelineElement(val);
							timelineArray.push(val);
						});
					}
				}).fail(function(jqXHR){
					console.log(jqXHR.status)
					$.get("/BackEnd/openTimeline.php", timelineID, function(timelineData){
						console.log(timelineData);
					});
				});

			}
				
			
			isTimelineOpen = true;
		}
 		return timelineArray;
	}
