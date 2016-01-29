var lib = '{"library":[' +
    '{"format":"textbook", "tag":"Geometry Through the Ages: Chapter 7"},' +
    '{"format":"quiz", "tag":"Grade 6 Math Quiz - Algebra"},' +
    '{"format":"video", "tag":"Chemistry Safety with Bill Nye"},' +
    '{"format":"game", "tag":"Is this letter a vowel?"},' +
    '{"format":"textbook", "tag":"This is a new book and ITS HEREEE"},' +
    '{"format":"video", "tag":"Napalise with Elise: Chapter 3"} ]}';

var content = JSON.parse(lib);

var querySearch = function() {	//Query filter every time a filter option is pressed
	console.log('Running filter');

	var ul = document.getElementById("resultsDivUL");
	if(ul.children != null) {
		var children = ul.querySelectorAll("li");
		console.log(children);
	}

	Array.prototype.forEach.call(children,function(node) {
		node.parentNode.removeChild (node);
	});

//SEARCH

	var searchString = document.getElementById("string").value;

	//construct Results JSON object
	var searchResults = new Object();
		searchResults.module = 'search';
		searchResults.string = searchString;

	//Read all checkboxes in filter
	var books = document.getElementById('Books');
	var quiz = document.getElementById('Quiz');
	var videos = document.getElementById('Videos');
	var games = document.getElementById('Games');

	var grade = document.getElementById('grade');
	var gradeValue= grade.options[grade.selectedIndex].value;

	var subject = document.getElementById('subject');
	var subjectValue= subject.options[subject.selectedIndex].value;


	//Construct Results object
	var filterResults = new Object();
		filterResults.module = 'filter';
		filterResults.bbooks = books.checked;
		filterResults.bquiz = quiz.checked;
		filterResults.bvideos = videos.checked;
		filterResults.bgames = games.checked;
		filterResults.grade = gradeValue;
		filterResults.subject = subjectValue;

		console.log(filterResults);

		//Pass results to results module
		console.log(searchResults);
		//constructResults(results);

	


	if(searchResults.module  == 'search' ) {
		var i;
		var j;


		
		var searchArray = [];

		for(i = 0; i < content.library.length; i++) {
			var str = content.library[i].tag;
			var find = str.search(searchResults.string);
			//create array
			//console.log(str);
		
			if(find >= 0) { //match was found
				//console.log(content.library[i]);
				searchArray.push(content.library[i]); //how to get content?

			}
		}

		var resultArray = [];

		for(j=0; j < searchArray.length; j++) {
			if(searchArray[j].format == "textbook" && filterResults.bbooks == true) {
				//console.log(searchArray[j].tag);
				resultArray.push(searchArray[j]);
			}
			if(searchArray[j].format == "quiz" && filterResults.bquiz == true) {
				//console.log(searchArray[j].tag);
				resultArray.push(searchArray[j]);
			}
			if(searchArray[j].format == "video" && filterResults.bvideos == true) {
				//console.log(searchArray[j].tag);
				resultArray.push(searchArray[j]);
			}
			if(searchArray[j].format == "game" && filterResults.bgames == true) {
				//console.log(searchArray[j].tag);
				resultArray.push(searchArray[j]);
			}
		}

		/*document.getElementById("results0").innerHTML = resultArray[0].tag;
		document.getElementById("results1").innerHTML = resultArray[1].tag;
		document.getElementById("results2").innerHTML = resultArray[2].tag;
		document.getElementById("results3").innerHTML = resultArray[3].tag;*/
		//console.log(resultArray);


		//Timeline
		//Results JSON object
		var results = new Object();
			/*results.team1 = resultArray[0].tag;
			results.team2 = resultArray[1].tag;
			results.team3 = resultArray[2].tag;
		 	results.team4 = resultArray[3].tag;
		 	results.team5 = resultArray[4].tag;*/

		 	for(i=0;i<resultArray.length; i++) {
				results["team" + i]=resultArray[i].tag;
				//results.i = resultArray[i].tag;
				console.log(results.team0);
				console.log(resultArray[i]);
		 	}




		console.log("results display");
		var resultsWhole = document.querySelector("div#resultsdiv");
		var resultsUL = document.querySelector("div#resultsdiv ul#resultsDivUL");
		var timelineWhole = document.querySelector("div#timelineWhole");


		// Load JSON objects into results box immediately
		// window.onload = function loadJSON() {

		var loadJSON = function() {

		  //Load JSON objects into Results div
		  console.log("Loading JSON objects into Results div...");

		  for (var key in results) 
		  {
		    var rElement = createNewListElement(results[key]);
		    resultsUL.appendChild(rElement);
		  }
		}


		var createNewListElement = function(itemString) {
		  // Create new list items

		  var listItem = document.createElement("li");
		  var listLabel = document.createElement("label");
		  var addButton = document.createElement("button");
		  addButton.innerText = "Add";
		  addButton.className = "add";
		  listLabel.innerText = itemString;
		  // addButton.onclick = addJSON;
		  listItem.appendChild(listLabel);
		  listItem.appendChild(addButton);

		  return listItem;

		}



		// Check for next empty div
		var checkDivsEmpty = function() {
		  console.log("Checking for first empty timeline div...");

		  // Gather all timeline divs so we can traverse through them
		  var timelineDivs = document.getElementsByClassName("timelinediv");

		  // Traverse through timeline divs and check for first empty div
		  for (var i = 0; i < timelineDivs.length; i++) {
		    if (timelineDivs[i].innerHTML === "") {
		      return timelineDivs[i];
		    } 
		  }
		  return "none";
		}



		var addJSON = function() {
		  // Clone current list item
		  var listItem = this.parentNode;
		  var newListItem = listItem.cloneNode(true);

		  // Change button class to "remove"
		  newListItem.querySelector("button.add").classList.remove("add");
		  newListItem.querySelector("button").classList.add("remove");

		  // Modify new "remove" button
		  var newRemoveButton = newListItem.querySelector("button.remove");
		  newRemoveButton.innerText = "Remove";
		  newRemoveButton.addEventListener("click", removeJSON);

		  // Append newListItem to first empty div using checkDivsEmpty()
		  var nextEmptyDiv = checkDivsEmpty();

		  if (nextEmptyDiv === "none") {
		    alert ("No empty divs");
		  } else {
		    console.log("Adding new list item to timeline...");
		    nextEmptyDiv.appendChild(newListItem);
		  }
		}



		var removeJSON = function() {
		  console.log("Removing list item from timeline...");

		  // Removing list item from timelineHolder
		  var listItem = this.parentNode;
		  listItem.remove();
		}


		// Load the JSON object
		loadJSON(); 


		// Cycle over the resultsUL ul list items
		for (var i = 0; i < resultsUL.children.length; i++) {   // for each LI
		  var addButton = resultsUL.children[i].querySelector("button.add");  // select the add button
		  addButton.addEventListener("click", addJSON);   // bind addJSON to add button
		  console.log("Giving add buttons actions...");
		}



		// Cycle over the timelineHolder ul list items
		// THIS CURRENTLY DOES NOTHING (b/c it doesn't start out with any remove buttons)
		for (var i = 0; i < timelineWhole.children.length; i++) {  // for each timeline div
		  var removeButton = timelineWhole.querySelector("li button.remove");
		  // var removeButton = timelineWhole.children[i].querySelector("li button.remove");
		  if(removeButton!=null)
		  	removeButton.addEventListener("click", removeJSON);   // bind removeJSON to remove button
		  console.log("Giving remove buttons actions...");
		}




	
}
}
	

