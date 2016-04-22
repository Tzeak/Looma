$(document).ready(function () {
	$("#timelineWhole").sortable({
		opacity: 0.7,
		revert: true,   //Animates
		scroll: true,   //Allows page to scroll when dragging. Good for tall pages.
		handle: $(".timelinediv"),
		update: function () {  
			$('#btnSave').show();
		}
	});

	var isTimelineOpen = false;
	function getParameterByName(name, url) {
		if (!url) url = window.location.href;
		name = name.replace(/[\[\]]/g, "\\$&");
		var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)", "i"),
			results = regex.exec(url);
		if (!results) return null;
		if (!results[2]) return '';
		return decodeURIComponent(results[2].replace(/\+/g, " "));
	}
	function opentime(){
		var timelineArray = new Array();

		console.log("opentime() called");
		var timelineID = getParameterByName("timelineId");
		timelineID = {"$id" : timelineID}; //Set up in format for querying mongo database


		var createNewTimeElement = function(index, itemString) {
			$('<div/>', {class: "timelinediv", id: "timediv" + index}).appendTo('#timelineWhole');
			$('<li/>', {
				id : "item" + index,
				title: itemString,
				text: itemString,
			}).appendTo('#timediv' + index);
		}

		if(!isTimelineOpen) {
			$.getJSON("/BackEnd/openTimeline.php", timelineID, function(timelineData){;

				$.each(timelineData, function(index, val) { 
					createNewTimeElement(index, val.dn);
					timelineArray.push(val);
				});
			}).fail(function(jqXHR){
				console.log(jqXHR.status)
				$.get("/BackEnd/openTimeline.php", timelineID, function(timelineData){
					console.log(timelineData);
				});
			});
			isTimelineOpen = true;
		}
		return timelineArray;
	}
});
