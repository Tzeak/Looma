var load = function() {
	//Retrieve all valid timelines
	console.log("load() called");

	$.getJSON("../BackEnd/timelines.json", function(timelinesJSON) {
		//console.log(timelinesJSON);
		//timelinesJSON = JSON.parse(timelinesJSON);
		//For each object in timeline directory, populate list 
		$.each(timelinesJSON, function(index, val) { 
			// console.log("index: " + index + " id: " + val._id);

			createOpenListElement(index, val.name, val._id, val.line);

		});

	 }).fail(function(jqXHR){console.log(jqXHR.status)});
}

var createOpenListElement = function(index, itemString, itemId, line) {
	// var div = document.createElement("div");
	var element = {
		"index" : index,
		"itemString" : itemString,
		"itemId" : itemId,
		"line" : line
	}

	$('<li/>', {
		id : "time" + index,
		class: "lessonEntry",
		value: itemId,
	    title: itemString,
	    rel: 'external',
	    text: itemString,
	}).appendTo('#lessonDiv ul');

	$('<div/>', {
		class: "editPresent" + index,
	}).appendTo('#time' + index);

	$('.editPresent'+index).css({ 
    	"float": "right"
    }); 

	$('<button/>', {
		text: "Edit",
		class: "btnOpenTimeline", 
		id: "editBtn" + index,
	}).appendTo('.editPresent' + index);
	$("#editBtn" + index).bind("click", function(){
			window.location.href = 'index2.html?timelineId=' + encodeURI(itemId);
	});
	$('<button/>', {
		text: "Present",
		class: "btnOpenTimeline",
		id: "presentBtn" + index,
	}).appendTo('.editPresent' + index);
	$("#presentBtn" + index).bind("click", function(){
		window.location.href = 'present.html?timelineId=' + encodeURI(itemId);
	});
	$('<button/>', {
		text: "Delete",
		class: "btnOpenTimeline",
		id: "deleteBtn" + index,
		// onclick : "deleteFromPage()"
	}).appendTo('.editPresent' + index);
	$("#deleteBtn" + index).bind("click", function(){
		var li = this.parentNode;
		li.parentNode.remove();
		$.post("../BackEnd/delete.php", element, function(element) {
			console.log(element);
		});
	});
	
}
