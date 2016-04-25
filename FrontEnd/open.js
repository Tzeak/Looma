var load = function() {
	//Retrieve all valid timelines
	console.log("load() called");

	$.getJSON("../BackEnd/timelines.json", function(timelinesJSON) {
		//console.log(timelinesJSON);
		//timelinesJSON = JSON.parse(timelinesJSON);
		//For each object in timeline directory, populate list 
		$.each(timelinesJSON, function(index, val) { 
			// console.log("index: " + index + " id: " + val._id);

			createOpenListElement(index, val.name, val._id);

		});

	 }).fail(function(jqXHR){console.log(jqXHR.status)});
}

var createOpenListElement = function(index, itemString, itemId) {
	// var div = document.createElement("div");
	$('<li/>', {
		id : "time" + index,
		value: itemId,
	    title: itemString,
	    rel: 'external',
	    text: itemString,
	}).appendTo('#lessonDiv ul');
	$('<button/>', {
		text: "Edit",
		id: "editBtn" + index,
	}).appendTo('#time' + index);
	$("#editBtn" + index).bind("click", function(){
			window.location.href = 'index2.html?timelineId=' + encodeURI(itemId);
	});
	$('<button/>', {
		text: "Present",
		id: "presentBtn" + index,
	}).appendTo('#time' + index);
	$("#presentBtn" + index).bind("click", function(){
		window.location.href = 'present.html?timelineId=' + encodeURI(itemId);
	});
	
}

