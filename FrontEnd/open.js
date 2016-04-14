var load = function() {
	//Retrieve all valid timelines
	console.log("load() called");

	$.getJSON("../BackEnd/timelines.json", function(timelinesJSON) {
		//For each object in timeline directory, populate list 
		$.each(timelinesJSON, function(key, val) { 
			createNewTimeElement(key, val.name, val._id);

		});

	 }).fail(function(jqXHR){console.log(jqXHR.status)});
}

var createNewTimeElement = function(key, itemString, itemId) {

	$('<li/>', {
		id : "time" + key,
		value: itemId,
	    title: itemString,
	    rel: 'external',
	    text: itemString,
	}).appendTo('#lessonDiv ul');
	$('<button/>', {
		text: "Edit",
		//onclick: openTimeline,
	}).appendTo('#time' + key);
	$('<button/>', {
		text: "Present",
	}).appendTo('#time' + key);
}

var createNewListElement = function(itemString, itemId) {
	console.log("creating list element...");
	var listItem = document.createElement("li"); 
	var id = document.createAttribute("id");        // Create a "href" attribute
	id.value = "title";            // Set the value of the href attribute
	listItem.setAttributeNode(id);
	var listLabel = document.createElement("label");
	listLabel.innerText=itemString;
	listItem.appendChild(listLabel);
	var editButton = document.createElement("button");
	editButton.innerText = "Edit";
	editButton.className = "Edit";
	
	/*var link = document.createAttribute("action");        // Create a "href" attribute
	link.value = "index2.html";            // Set the value of the href attribute
	editButton.setAttributeNode(link);*/
	var presentButton = document.createElement("button");
	presentButton.innerText = "Present";
	presentButton.className = "Present";
	
	//id refers to the selected lesson
	var id = document.createAttribute("id");        // Create a "href" attribute
	id.value = itemId;            // Set the value of the href attribute
	editButton.setAttributeNode(id);
	var id2 = document.createAttribute("id");        // Create a "href" attribute
	id2.value = itemId;            // Set the value of the href attribute
	presentButton.setAttributeNode(id2);
	editButton.onclick = openTimeline;
	presentButton.onclick = presentTimeline;
	listItem.appendChild(editButton);
	listItem.appendChild(presentButton);		
	return listItem;
}
function openTimeline() {
			
			console.log("opentTimeline...");
			//send id to back end, which returns the object of timeline items
			var data = {
				'id' : this.id
			};
			console.log("timeline data:" + data.id);
			$.post("../BackEnd/open.php", data, function(data) {
				$("#opendiv").html(data);
			});
			// document.getElementById("opendiv").innerText = data;
			
			var data = JSON.stringify(timeline); 
			console.log(data);
			window.location = "index2.html?" + data;
			// document.getElementById("opendiv").innerText = data
}
function presentTimeline() {
			
			console.log("opentTimeline...");
			//send id to back end, which returns the object of timeline items
			var data = {
				'id' : this.id
			};
			$.post("../BackEnd/open.php", data, function(data) {
				$("#opendiv").html(data);
			});
			// document.getElementById("opendiv").innerText = data;
			
			var data = JSON.stringify(timeline); 
			console.log(data);
			window.location = "present.html?" + data;
			// document.getElementById("opendiv").innerText = data
}
  

