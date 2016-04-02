var library2 = [
//AUDIO FILE mp4
    {
		"_id" : "ObjectId('568dcdda9324a6f91e741082')",
		"ch_id" : "1EN01",
		"ft" : "mp4",
		"MB" : 7.6,
		"min" : "1:32",
		"fn" : "Sesame_Street_Alphabet.mp4",
		"dn" : "Sesame Street Alphabet"
    },
//AUDIO FILE mp3
    {
	    "_id" : "ObjectId('568dcdda9324a6f91e74108f')",
		"ch_id" : "2EN01",
		"ft" : "mp3",
		"MB" : 3,
		"fn" : "Classroom_Song.mp3",
		"dn" : "Classroom Song"
    },
//GAME FILE
    {
		"_id" : "ObjectId('568dcdda9324a6f91e741084')",
		"ch_id" : "1EN02",
		"ft" : "EP",
		"fn" : 3122231,
		"dn" : "EP Colour Identification"
    },
//PICTURE FILE
    {
	    "_id" : "ObjectId('568dcdda9324a6f91e74108a')",
		"ch_id" : "1EN10",
		"ft" : "jpg",
		"MB" : 0.1,
		"fn" : "Family_Tree_1.jpg",
		"dn" : "Family Tree 1"
    },
//ENGLISH TEXTBOOK
    {
	    "_id" : "ObjectId('568dcdf19324a6f91e74131d')",
		"class" : "class1",
		"subject" : "english",
		"prefix" : "1EN",
		"fn" : "English-1.pdf",
		"fp" : "textbooks/Class1/English/",
		"dn" : "Class 1 English",
		"ndn" : "कक्षा 1 अन्ग्रेगी",
		"ch_id" : "1EN10"
    },
//NEPALI TEXTBOOK
    {
	 	"_id" : "ObjectId('568dcdf19324a6f91e74131e')",
		"class" : "class1",
		"subject" : "nepali",
		"prefix" : "1N",
		"nfn" : "Nepali-1.pdf",
		"fp" : "textbooks/Class1/English/",
		"dn" : "Class 1 Nepali",
		"ndn" : "कक्षा 1 नेपाली",
		"ch_id" : "1EN10"
    },
//English AND nepali TEXTBOOK
    {
		"_id" : "ObjectId('568dcdf19324a6f91e74131f')",
		"class" : "class1",
		"subject" : "math",
		"prefix" : "1M",
		"fn" : "Math-1.pdf",
		"nfn" : "Math-1-Nepali.pdf",
		"fp" : "textbooks/Class1/English/",
		"dn" : "Class 1 Math",
		"ndn" : "कक्षा 1 गणित",
		"ch_id" : "1EN10"
    },
    //DICTIONARY
    {
		"_id" : "ObjectId('5690154a9324a6f91e7429a0')",
		"ch_id" : "1EN01",
		"en" : "four",
		"np" : "चार",
		"part" : "noun",
		"def" : "four - noun   being one more than three; noun the cardinal number that is the sum of three and one",
		"hom" : "for, fore",
		"rand" : 0.04336044892825207
    },
// CHAPTER
    {
    	"_id" : "1M10",
		"pn" : 30,
		"npn" : 28,
		"dn" : "Addition and Subtraction up to 9",
		"ndn" : "९ सम्मको जोड र घटाउ",
		"ch_id" : "1EN10"
    },
];

//////////////////////////////////////////////////////////////////////////////////////////////////

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
	clearResults();



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

		for(i = 0; i < library2.length; i++) {
			var str = library2[i].dn;

				searchArray.push(library2[i]); //how to get content
			
		}

		

		//grade filter
		for(i=0;i<searchArray.length;i++) {
				console.log(searchArray[i].ch_id[0]);
					resultArray.push(searchArray[i]);
		}

		console.log("result array:" + resultArray);


//TIMELINE
		// Check for next empty div
		// Load the JSON object
		
		console.log("load json");
		loadJSON(); 
		checkDivsEmpty();


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





var save = function(){    
    console.log("saving...");
    var itemIds = [];
    var titleString = document.getElementById("titleString").value;
    console.log("title:" + titleString);
    
    if(titleString == "") {
    	alert("Lesson plan requires a title before saving.");
    }
    else {
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
	    	timeline.items_array = itemIds;

		console.log(timeline);
		$.post("../BackEnd/save.php", timeline, function(data) {
		console.log("Saved!");
		console.log("data" + data);
		});
	}
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


/*var query = window.location.search;
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

*/
var script = document.createElement('script');
script.src = "https://code.jquery.com/ui/1.11.4/jquery-ui.js";
script.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(script);





