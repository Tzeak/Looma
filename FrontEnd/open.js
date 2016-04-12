var load = function() {
	//Retrieve all valid timelines
	timelineID = "ObjectId('5706f4eece85a0bb090041aa')";
	$.post("../BackEnd/open.php", timelineID, function(data) {
     	$("#opendiv").html(data);
     	console.log(data);
     }); //Send data to server via post request

	// $.get("../BackEnd/timelines.json", function(data) {
	// 	$("#lessonDiv").text(data);
	// 	//var parsedData = JSON.parse(data);
	// 	console.log(data);
	// 	console.log(typeof(data));
	// 	data = JSON.parse(data);
	// });


	//console.log("Roshan Sucks: " + roshanSUCKS);
	lessons = Array();

	for(i = 0; i < lessons.length; i++) {
		//console.log("calling createNewListElement");
		var rElement = createNewListElement(lessons[i].title, lessons[i]._id);
		lessonDiv.appendChild(rElement);
	}
}
var createNewListElement = function(itemString, itemId) {
		//searchArray.push(lessons[i]);
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
  

/********************* BEGIN COMMENT *******************
	    var loadJSON = function() {
		    for(i = 0; i < lessons.length; i++) {
				var rElement = createNewListElement(lessons[i].title, lessons[i]._id);
			    lessonDiv.appendChild(rElement);
			}
		}
		var createNewListElement = function(itemString, itemId) {
				//searchArray.push(lessons[i]);
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
			editButton.setAttributeNode(link);
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

****** END COMMENT */