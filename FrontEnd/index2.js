var library = [
    {
    	"_id":"ObjectId(5549)", 
    	"prefix":"2EN02",
    	"filetype":"EP",
    	"thumbnail":"images/kitty.jpg",
    	"filepath": "resources/textbook/",
    	"dn":"KITTY"
    },
    {
    	"_id":"ObjectId(5551)", 
    	"prefix":"3EN02",
    	"filetype":"EP",
    	"filepath":"resources/pictures/",
    	"format":"video", 
    	"thumbnail":"images/pup.jpg",
    	"dn":"Chemistry Safety with Bill Nye"
    },
    {
    	"_id":"ObjectId(5552)", 
    	"prefix":"4EN02",
    	"filetype":"EP",
    	"filepath":"resources/videos/",
    	"format":"game", 
    	"thumbnail":"images/pup2.jpg",
    	"dn":"Is this letter a vowel?"
    },
    {
    	"_id":"ObjectId(5548)", 
    	"prefix":"5EN02",
    	"filetype":"EP",
    	"filepath":"resources/audio/",
    	"format":"video", 
    	"thumbnail":"images/pup4.jpg",
    	"dn":"The Chronicles of Narnia: The Lion, the Witch, and the Wardrobe, and Supilise"
    },
        {
    	"_id":"ObjectId(5547)", 
    	"prefix":"2EN02",
    	"filetype":"EP",
    	"thumbnail":"images/kitty.jpg",
    	"filepath": "resources/textbook/",
    	"dn":"KITTY"
    },
    {
    	"_id":"ObjectId(5559)", 
    	"prefix":"3EN02",
    	"filetype":"EP",
    	"filepath":"resources/pictures/",
    	"format":"video", 
    	"thumbnail":"images/pup.jpg",
    	"dn":"Chemistry Safety with Bill Nye"
    },
    {
    	"_id":"ObjectId(5552)", 
    	"prefix":"4EN02",
    	"filetype":"EP",
    	"filepath":"resources/videos/",
    	"format":"game", 
    	"thumbnail":"images/pup2.jpg",
    	"dn":"Is this letter a vowel?"
    },
    {
    	"_id":"ObjectId(5557)", 
    	"prefix":"5EN02",
    	"filetype":"EP",
    	"filepath":"resources/audio/",
    	"format":"video", 
    	"thumbnail":"images/pup4.jpg",
    	"dn":"The Chronicles of Narnia: The Lion, the Witch, and the Wardrobe, and Supilise"
    },
];

var timeline = [
    {
    	"_id":"ObjectId(5549)", 
    	"prefix":"2EN02",
    	"filetype":"EP",
    	"thumbnail":"images/kitty.jpg",
    	"filepath": "resources/textbook/",
    	"dn":"KITTY"
    },
    {
    	"_id":"ObjectId(5551)", 
    	"prefix":"3EN02",
    	"filetype":"EP",
    	"filepath":"resources/pictures/",
    	"format":"video", 
    	"thumbnail":"images/pup.jpg",
    	"dn":"Chemistry Safety with Bill Nye"
    },
    {
    	"_id":"ObjectId(5552)", 
    	"prefix":"4EN02",
    	"filetype":"EP",
    	"filepath":"resources/videos/",
    	"format":"game", 
    	"thumbnail":"images/pup2.jpg",
    	"dn":"Is this letter a vowel?"
    },
];


var resultArray = [];



var querySearch = function() {	//Query filter every time a filter option is pressed
	console.log('Running filter');


	//checking if results div has content in it, and if it does remove it before adding new search results.
	var ul = document.getElementById("resultsDivUL");
	if(ul.children != null) {
		var children = ul.querySelectorAll("li");
		console.log(children);
	}

	console.log("deleting existing content");
	//THIS IS NOT WORKING-- supposed to delete existing content
	Array.prototype.forEach.call(children,function(node) {
		node.parentNode.removeChild (node);
	});

//SEARCH

	//searchString is user inputed search term
	var searchString = document.getElementById("string").value;

	//construct Results JSON object
	var searchResults = new Object();
		searchResults.module = 'search';
		searchResults.string = searchString;

	//Read all checkboxes in filter
	var books = document.getElementById('Books');
	var audio = document.getElementById('Audio');
	var videos = document.getElementById('Videos');
	var activities = document.getElementById('Activities');
	var pictures = document.getElementById('Pictures');

	var grade1 = document.getElementById('1');
	var grade2 = document.getElementById('2');
	var grade3 = document.getElementById('3');
	var grade4 = document.getElementById('4');
	var grade5 = document.getElementById('5');
	var grade6 = document.getElementById('6');
	var grade7 = document.getElementById('7');
	var grade8 = document.getElementById('8');

	var math = document.getElementById('Math');
	var science = document.getElementById('Science');
	var english = document.getElementById('English');
	var history = document.getElementById('History');
	var geography = document.getElementById('Geography');


	//Construct Results object
	var filterResults = new Object();
		filterResults.module = 'filter';
		filterResults.bbooks = books.checked;
		filterResults.baudio = audio.checked;
		filterResults.bvideos = videos.checked;
		filterResults.bactivities = activities.checked;
		filterResults.bpictures = pictures.checked;

		filterResults.grade1 = grade1.checked;
		filterResults.grade2 = grade2.checked;
		filterResults.grade3 = grade3.checked;
		filterResults.grade4 = grade4.checked;
		filterResults.grade5 = grade5.checked;
		filterResults.grade6 = grade6.checked;
		filterResults.grade7 = grade7.checked;
		filterResults.grade8 = grade8.checked;

		filterResults.math = math.checked;
		filterResults.science = science.checked;
		filterResults.english = english.checked;
		filterResults.history1 = history.checked;
		filterResults.geography = geography.checked;
		
	
	//searching all content items for search term and pushing them into new searchArray
	if(searchResults.module  == 'search' ) {
		var i;
		var j;
		var searchArray = [];

		for(i = 0; i < library.length; i++) {
			var str = library[i].dn;
			var find = str.search(searchResults.string);
			//create array
		
			if(find >= 0) { //match was found
				searchArray.push(library[i]); //how to get content?

			}
		}

		//push all searchArray items that also fit filter settings to new filterArray1
		//media type filter
		var filterArray1 = [];

		for(j=0; j < searchArray.length; j++) {
			if(searchArray[j].filepath == "resources/textbook/" && filterResults.bbooks == true) {
				//console.log(searchArray[j].tag);
				filterArray1.push(searchArray[j]);
			}
			if(searchArray[j].filepath == "resources/audio/" && filterResults.baudio == true) {
				//console.log(searchArray[j].tag);
				filterArray1.push(searchArray[j]);
			}
			if(searchArray[j].filepath == "resources/videos/" && filterResults.bvideos == true) {
				//console.log(searchArray[j].tag);
				filterArray1.push(searchArray[j]);
			}
			if(searchArray[j].filepath == "resources/epaath/activities/" && filterResults.bactivities == true) {
				//console.log(searchArray[j].tag);
				filterArray1.push(searchArray[j]);
			}
			if(searchArray[j].filepath == "resources/pictures/" && filterResults.bpictures == true) {
				//console.log(searchArray[j].tag);
				filterArray1.push(searchArray[j]);
			}
		}

		//grade filter
		for(i=0;i<filterArray1.length;i++) {
			for (j=1;j<9;j++) {
				console.log(filterArray1[i].prefix[0]);
				if((filterArray1[i].prefix[0]) == j && filterResults['grade' + j] == true)
					resultArray.push(filterArray1[i]);
			}
		}


//TIMELINE
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

		// Load the JSON object
		loadJSON(); 

		// Cycle over the resultsUL ul list items
		for (var i = 0; i < resultsUL.children.length; i++) {   // for each LI
		  var addButton = resultsUL.children[i].querySelector("button.add");  // select the add button
		  addButton.addEventListener("click", addJSON);   // bind addJSON to add button
		  console.log("Giving add buttons actions...");
		}
	}
}
//End of querySearch


console.log("results display");
var resultsWhole = document.querySelector("div#resultsdiv");
var resultsUL = document.querySelector("div#resultsdiv ul#resultsDivUL");
var timelineWhole = document.querySelector("div#timelineWhole");

var addJSON = function() {

	console.log("hello!!!");
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

//Load JSON objects into Results div
var loadJSON = function() {

	  console.log("Loading JSON objects into Results div...");

	  for(i=0;i<resultArray.length; i++)
	  {
	    var rElement = createNewListElement(resultArray[i]);
	    resultsUL.appendChild(rElement);
	  }
}

// Create new list items for results div
var createNewListElement = function(itemString) {
	  var listItem = document.createElement("li");
	  
	  	//id for li element
		var id = document.createAttribute("id"); 
		id.value = "item";           
		listItem.setAttributeNode(id);

		//index attribute for li element (to access resultArray[index] info after the item is moved around in the timeline)
		var num = document.createAttribute("index");      
		num.value = i;    
		listItem.setAttributeNode(num);

		//attributes to list items for when we add preview feature
		var filetype = document.createAttribute("data-ft");   
		filetype.value = resultArray[i].filetype; 
		listItem.setAttributeNode(filetype);

		var filepath = document.createAttribute("data-fp");   
		filepath.value = resultArray[i].filepath; 
		listItem.setAttributeNode(filepath);

		var filename = document.createAttribute("data-fn");       
		filename.value = resultArray[i].displayname;         
		listItem.setAttributeNode(filename);


		//create label element for displaying content display name/info	  
	  	var listLabel = document.createElement("label");

	  	//id for label element
	  	var id = document.createAttribute("id");  
		id.value = "name";         
		listLabel.setAttributeNode(id);


		//image element for thumbnail photo	
		var thumbnail = document.createElement("img");
		
		//add button to add list item from results div to timeline
		var addButton = document.createElement("button");
		addButton.innerText = "Add";
		addButton.className = "add";

	  
		//access thumbnail image using filepath in json object
		var att = document.createAttribute("src");    
		att.value = resultArray[i].fp + "*.jpg";       
		console.log("i = " + i);
		console.log("resultArray[i] = " + resultArray[i]);
		thumbnail.setAttributeNode(att);                    

		
		//set the display text for each content item
		listLabel.innerText = itemString.dn + ", Grade " + resultArray[i].prefix[0];
		
		//append elements to the list item
		listItem.appendChild(thumbnail);
		listItem.appendChild(listLabel);
		listItem.appendChild(addButton);

	  	return listItem;

}



var save = function(){    
    console.log("saving...");
    var itemIds = [];
    var titleString = document.getElementById("titleString").value;

    var timelineDivs = document.getElementsByClassName("timelinediv");
    for (var i = 0; i < timelineDivs.length; i++) {

    	if((document.getElementsByClassName("timelinediv")[i].lastElementChild)!=null) {
	    	var x = document.getElementsByClassName("timelinediv")[i].lastElementChild;
	    	var index = x.getAttribute("index");
	    	console.log("index : " + index);
	    	objectId=resultArray[index]._id;
	    	//var y = timelineDivs[i].document.getElementById("name").outerText;
	    	console.log("item: " + objectId);
	    	itemIds.push(objectId);
    	}
   	}

   	var timeline = new Object();
    	timeline.lesson_title = titleString;
    	timeline.items = itemIds;

 console.log(timeline);
}


function loadTimeline() {
	console.log("loadTimeline");
	
	var datavalues = localStorage.getItem('data');
	//parse the value 
	var finalvalue = JSON.parse(datavalues);

	console.log(finalvalue);

	var timelineDivs = document.getElementsByClassName("timelinediv");

  	// add each timeline item to each timelinediv
  	for (var i = 0; i < timelineDivs.length; i++) {
  			console.log("inserting into box# " + i);
  			timelineDivs[i].innerText="HELLO";

  			//createNewListElement(timeline[i].displayname);
  	}
}

var createTimelineElement = function(itemString) {

	
	  // Create new list items

	  var listItem = document.createElement("li");

		var id = document.createAttribute("id");        // Create a "href" attribute
		id.value = "item";            // Set the value of the href attribute
		listItem.setAttributeNode(id);

		var num = document.createAttribute("index");        // Create a "href" attribute
		num.value = i;            // Set the value of the href attribute
		listItem.setAttributeNode(num);

		/*var remove = document.createAttribute("ondrag");        // Create a "href" attribute
		remove.value = "addJSON(event)";            // Set the value of the href attribute
		listItem.setAttributeNode(remove);*/


	  var listLabel = document.createElement("label");

	  var id = document.createAttribute("id");        // Create a "href" attribute
		id.value = "name";            // Set the value of the href attribute
		listLabel.setAttributeNode(id);


	  var thumbnail = document.createElement("img");
	  var addButton = document.createElement("button");
	  addButton.innerText = "Add";
	  addButton.className = "add";

	  
	var att = document.createAttribute("src");        // Create a "href" attribute
	att.value = resultArray[i].fp + "*.jpg";            // Set the value of the href attribute
	//console.log("i = " + i);
	thumbnail.setAttributeNode(att);                      // Add the href attribute to <a>

	  listLabel.innerText = itemString.dn + ", Grade " + itemString.prefix[0];
	  // addButton.onclick = addJSON;
	  // listItem.appendChild(thumbnail);
	  listItem.appendChild(listLabel);
	  listItem.appendChild(addButton);

	  return listItem;



	}


var query = window.location.search;
console.log("query1: " + query);
if (query.substring(0, 1) == '?') {
    query = query.substring(1);
}
query2 = decodeURI(query);
// var query2 = query.replace(/%22/g, '"').replace(/%20/g, " ");
// var query3 = query2;
console.log("query2: " + query2);
//document.getElementById("displaybox").innerHTML = query2;


var resultArray = JSON.parse(query3);
console.log("timeline: " + resultArray);



// THIS LOADS THE DOCS TO INDEX2.HTML!!!!!!!!!!! 
var timelineID = resultArray._id;
$.post("../BackEnd/openTimeline.php", timelineID, function(timelineID) {
	$("#displaybox").html(timelineID);
});

var timelineDiv = timelineID;

// var timelineDiv2 = JSON.parse(timelineDiv);
// console.log(typeof(timelineDiv2));
// HI

console.log("timelineDiv " +timelineDiv);
console.log("class: " + timelineDiv[0].class);

var timelineDivs = document.getElementsByClassName("timelinediv");

for (var i = 0; i < timelineDiv.length; i++) {
	console.log(timelineDiv);
	var rElement = createTimelineElement(timelineDiv[i]);
	timelineDivs[i].appendChild(rElement);

	//console.log("inserting hello into box# " + i);
	timelineDivs[i].innerText="HELLO";
}

    	//if((document.getElementsByClassName("timelinediv")[i].lastElementChild)!=null) {


var script = document.createElement('script');
script.src = "https://code.jquery.com/ui/1.11.4/jquery-ui.js";
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);





