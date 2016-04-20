// This loads all the preliminary elements in the page.
var loadPageElements = function() {
	$(document).ready(function () {

		// Sidebar: Search

		$("<div/>", {
			id : "div_search"
		}).appendTo("#div_filter");
		$("<p/>", {
			html : "Search: "
		}).appendTo("#div_search");
		$("<input/>", {
			id : "searchString",
			class: "textBox",
			type : "text",
			name : "search",
		}).appendTo("#div_search");


		// Sidebar: Grade

		$("<div/>", {
			id : "div_grade"
		}).appendTo("#div_filter");

		$("<p/>", {
			html : "Grade Level: ", 
		}).appendTo("#div_grade");

		$("<select/>", {
			id : "dropdown_grade"
		}).appendTo("#div_grade");

		for (var i=0; i<8; i++) {
			if (i == 0) {
				$("<option/>", {
					html : "",
					id : ""
				}).appendTo("#dropdown_grade");
			} 
			else {
				$("<option/>", {
					html : i,
					id : i
				}).appendTo("#dropdown_grade");
			}
		}

		// Sidebar: Subject

		var subjects = {
			"English" : "EN",
			"Math" : "M",
			"Science" : "S",
			"Social Studies" : "SS"
		}

		$("<div/>", {
			id : "div_subject"
		}).appendTo("#div_filter");

		$("<p/>", {
			html : "Subject: ", 
		}).appendTo("#div_subject");

		$("<select/>", {
			id : "dropdown_subject"
		}).appendTo("#div_subject");

		$('<option>', { 
	        value: "",
	        html : "" 
	    }).appendTo("#dropdown_subject");

		$.each(subjects, function (key, value) {
		    $("<option/>", { 
		        value: value,
		        html : key 
	    	}).appendTo("#dropdown_subject");
		});

		// Sidebar: Chapter

		$("<div/>", {
			id : "div_chapter"
		}).appendTo("#div_filter");

		$("<p/>", {
			html : "Chapter: ", 
		}).appendTo("#div_chapter");

		$("<select/>", {
			id : "dropdown_chapter"
		}).appendTo("#div_chapter");

		for (var i=0; i<8; i++) {
			if (i == 0) {
				$("<option/>", {
					html : "",
					id : ""
				}).appendTo("#dropdown_chapter");
			} 
			else {
				$("<option/>", {
					html : i,
					id : i
				}).appendTo("#dropdown_chapter");
			}
		}

		// Sidebar: Section

		$("<div/>", {
			id : "div_section"
		}).appendTo("#div_filter");

		$("<p/>", {
			html : "Section: ", 
		}).appendTo("#div_section");

		$("<select/>", {
			id : "dropdown_section"
		}).appendTo("#div_section");

		for (var i=0; i<8; i++) {
			if (i == 0) {
				$("<option/>", {
					html : "",
					id : ""
				}).appendTo("#dropdown_section");
			} 
			else {
				$("<option/>", {
					html : i,
					id : i
				}).appendTo("#dropdown_section");
			}
		}

		// Sidebar: File Type

		var filetypes = {
			"image" : 	{ 	id : "ft_image", 	display : "Image" 	},
			"video" : 	{ 	id : "ft_video", 	display : "Video" 	},
			"audio" : 	{ 	id : "ft_audio", 	display : "Audio" 	},
			"misc" : 	{ 	id : "ft_misc", 	display : "Misc" 	},
		}

		$("<div/>", {
			id : "div_filetypes"
		}).appendTo("#div_filter");

		$("<p/>", {
			html : "File types: ", 
		}).appendTo("#div_filetypes");

		$.each(filetypes, function (key, value) {
		    $("<input/>", { 
		    	type : "checkbox",
		    	style : "zoom:2",
		    	id : value.id,
		        name : key,
		        // html : value.display
	    	}).appendTo("#div_filetypes");
	    	$("<label/>", { 
		    	for : value.id,
		    	html : value.display
	    	}).appendTo("#div_filetypes");
	    	$("#div_filetypes").append("<br/>");
		});

		// Button

	    $("#div_filetypes").append("<br/>");

		$("<button/>", {
			onclick : "querySearch()",
			type : "button",
			html : "Search"
		}).appendTo("#div_filter");

	});	// End document.ready


/*

	// Create Elements to add to
	var div = document.createElement("div");
	var p = document.createElement("p");
	var h1 = document.createElement("h1");
	var h3 = document.createElement("h3");
	var select = document.createElement("select");
	var option = document.createElement("option");
	var input = document.createElement("input");

	var div_search = document.createElement("div");
	var form = document.getElementById("div_filter");

	// Sidebar: Search
	div_search.id = "div_search";
	p.innerHTML = "Search: ";
	input.type = "text";
	input.name = "search";
	input.id = "searchString";

	$("#div_filter").append(div_search);
	$(div_search).append(p);
	// div_search.appendChild(p);
	$(div_search).append(input);
	// div_search.appendChild(input);
	// $("#div_filter").append(div_search);

	// Sidebar: Grade
	p.innerText = "Grade Level";
	var select = $('<select />');
	select.id="dropdown_grade";
	for(var i=0; i<8; i++) {
	    $('<option />', {value: i, text: i}).appendTo(select);
	}
	$("#div_filter").append(p);
	// $("div_filter").append(select);
	select.appendTo(form); 

*/


	// Sidebar: Subject

	// Sidebar: Chapter

	// Sidebar: Section

	// Sidebar: File Type

	// document.getElementById("sidebar").appendChild(form);
}



var resultArray = [];

var displaybox = document.querySelector("div#displaybox");

var querySearch = function() {


	var filterdata = new Object();
	filterdata.module = 'filter';
	filterdata.grade = document.getElementById('dropdown_grade').value;
	filterdata.subject = document.getElementById('dropdown_subject').value;
	filterdata.chapter = document.getElementById('dropdown_chapter').value;
	filterdata.section = document.getElementById('dropdown_section').value;
	filterdata.image = document.getElementById('ft_image').checked;
	filterdata.video = document.getElementById('ft_video').checked;
	filterdata.audio = document.getElementById('ft_audio').checked;
	filterdata.misc = document.getElementById('ft_misc').checked;



	// var filterdata = {
	// 	'grade' : document.getElementById('dropdown_grade').value,
	// 	'subject' : document.getElementById('dropdown_subject').value,
	// 	'chapter' : '',
	// 	'section': null,
	// 	'image' : false,
	// 	'video' : false,
	// 	'audio' : false,
	// 	'misc' : false
	// };
	$.get("../BackEnd/query.php", filterdata, function(filterdata) {

		// $("#displaybox").html("hi");
		// console.log(JSON.parse(filterdata));
		var filterdata_object = storeFilterData(filterdata);
		printFilterData(filterdata_object);
	}); //Send filter data to server via GET request

}

var storeFilterData = function(filterdata) {
	var filterdata_object = JSON.parse(filterdata);
	return filterdata_object;
}

var printFilterData = function(filterdata_object) {
	// var resultArray = ["apple", "orange", "banana", "penis"];

// INFO: I tried to create a loop that would generate everything automatically depending on what collection it was in.
// The problem is when I try to use the variable name when accessing the object: "filterdata_object.currentCollection".
// It takes that as a literal. So, "filterdata_object.chapter" works, but even if "currentCollection" = "chapter",
// "filterdata_object.currentCollection" doesn't work. :(

/* //////////// BEGIN LOOP
	// A loop that prints the data in each collection array
	for (var key in filterdata_object) {
		var currentCollection = key;	// The current collection that it's printing through
		var currentCollection_array = filterdata_object[currentCollection];
		console.log(currentCollection);

		// Heading of the collection section
		var sectionHeading = document.createElement("h1");
		sectionHeading.id = "collectionTitle";
		var collectionArray_length = filterdata_object.currentCollection.length;
		console.log(collectionArray_length);
		if (collectionArray_length == 1) {
			sectionHeading.innerHTML = "<h3>" + currentCollection + "(" + collectionArray_length + " Result)</h3>";
		} 
		else {
			sectionHeading.innerHTML = "<h3>" + currentCollection + "(" + collectionArray_length + " Results)</h3>";
		}
		displaybox.appendChild(sectionHeading);

		// Print actual collection info
		if (currentCollection == "chapter") {
			for(var i=0; i<collectionArray_length; i++) {
				var rElement = createChapterResults(filterdata_object.currentCollection[i])
				// var rElement = createChapterResults(resultArray[i]);
				displaybox.appendChild(rElement);
			}
		}
		else if (currentCollection == "textbook") {
			for(var i=0; i<collectionArray_length; i++) {
				var rElement = createTextbookResults(filterdata_object.currentCollection[i])
				// var rElement = createChapterResults(resultArray[i]);
				displaybox.appendChild(rElement);
			}
		}
	}
*/ ////////// END LOOP


	// Print Chapter array
	var currentResultDiv = document.createElement("div");
	currentResultDiv.id = "currentResultDiv";
	var collection = document.createElement("h1");
	collection.id = "collectionTitle";
	var arraylength = filterdata_object.chapter.length;
	if (arraylength == 1) {
		collection.innerHTML = "Chapters (" + arraylength + " Result)";
	} 
	else {
		collection.innerHTML = "Chapters (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collection);

	for(var i=0; i<filterdata_object.chapter.length; i++) {
		var rElement = createChapterResults(filterdata_object.chapter[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	// Print Textbooks array
	var collection = document.createElement("h1");
	collection.id = "collectionTitle";

	var arraylength = filterdata_object.textbook.length;
	if (arraylength == 1) {
		collection.innerHTML = "Textbooks (" + arraylength + " Result)";
	} 
	else {
		collection.innerHTML = "Textbooks (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collection);

	for(var i=0; i<filterdata_object.textbook.length; i++) {
		var rElement = createTextbookResults(filterdata_object.textbook[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}

	// Print Actdict array
	var collection = document.createElement("h1");
	collection.id = "collectionTitle";

	var arraylength = filterdata_object.actdict.length;
	if (arraylength == 1) {
		collection.innerHTML = "Activites & Dictionary (" + arraylength + " Result)";
	} 
	else {
		collection.innerHTML = "Activites & Dictionary (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collection);

	for(var i=0; i<filterdata_object.actdict.length; i++) {
		var rElement = createActdictResults(filterdata_object.actdict[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	$("#displaybox").html(currentResultDiv);

	// var filterdata_array = [];
	// for (var i=0; i < filterdata_object.chapter.length; i++) {
	// 	filterdata_array.push(filterdata_object.chapter[i]);
	// 	console.log(filterdata_array[i]);
	// }
	// $("#displaybox").html();
}



/* //////////////////////TO-DO FOR RESULTS

THUMBNAILS
- Need to make thumbnails work for chapters
	- 	function: createChapterResults()
	- 	We'll need to extract the whole ID. For example, from 1M03, we 
		need to get 1, M, and 03.  Idk how to do that yet.
- Take care of if the image source is null
	- 	All the "thumbnail_prefix" variables: If the image source is null, 
		it shouldn't try to get the substring, because it'll break the code
	- 	If the file isn't there. We need to make a little 404 image and
		code it in.

//////////////////////////END TO-DO */


var homedirectory = "../";

// Create "Chapter" collection results
var createChapterResults = function(item) {

	var thumbnail_prefix = item._id;
	thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('0'));	

	var div = document.createElement("div");
	div.id = "resultitem";

	// Thumbnail
	var image = document.createElement("img");
	image.id = "resultsimg";
	image.src = homedirectory + "content/audio/thumbnail.png";
	div.appendChild(image);

	// ID
	var loomaID = document.createElement("p");
	loomaID.id = "result_ID";
	loomaID.innerHTML = "<b>ID: </b>" + item._id;
	div.appendChild(loomaID);

	// Display name
	var displayname = document.createElement("p");
	displayname.id = "result_dn";
	displayname.innerHTML = "<b>Name: </b>" + item.dn;
	div.appendChild(displayname);

	// Nepali name
	var nepaliname = document.createElement("p");
	nepaliname.id = "result_ndn";
	nepaliname.innerHTML = "<b>Nepali Name: </b>" + item.ndn;
	div.appendChild(nepaliname);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	return div;
}

// Create "Textbook" collection results
var createTextbookResults = function(item) {
	var div = document.createElement("div");
	div.id = "resultitem";

	// Thumbnail
	var thumbnail_prefix = item.fn;
	thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

	var image = document.createElement("img");
	image.id = "resultsimg";
	image.src =  homedirectory + "content/" + item.fp + thumbnail_prefix + "_thumb.jpg";
	div.appendChild(image);

	// ID
	var loomaID = document.createElement("p");
	loomaID.id = "result_ID";
	loomaID.innerHTML = "<b>ID: </b>" + item.prefix;
	div.appendChild(loomaID);

	// Display name
	var displayname = document.createElement("p");
	displayname.id = "result_dn";
	displayname.innerHTML = "<b>Name: </b>" + item.dn;
	div.appendChild(displayname);

	// Nepali name
	var nepaliname = document.createElement("p");
	nepaliname.id = "result_ndn";
	nepaliname.innerHTML = "<b>Nepali Name: </b>" + item.ndn;
	div.appendChild(nepaliname);

	// Subject
	var subject = document.createElement("p");
	subject.id = "result_subject";
	subject.innerHTML = "<b>Subject: </b>" + item.subject;
	div.appendChild(subject);

	// File path
	var filepath = document.createElement("p");
	filepath.id = "result_fp";
	filepath.innerHTML = "<b>Filepath: </b>" + item.fp;
	div.appendChild(filepath);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	return div;
}

// Create "Actdict" collection results
var createActdictResults = function(item) {
	var div = document.createElement("div");
	div.id = "resultitem";

	if (item.def != null) {	// If this is a dictionary entry
		var image = document.createElement("img");
		image.id = "resultsimg";
		image.src = homedirectory + "content/dictionaries/thumbnail.png";
		div.appendChild(image);

		var loomaID = document.createElement("p");
		loomaID.id = "result_ID";
		loomaID.innerHTML = "<b>ID: </b>" + item.ch_id;
		div.appendChild(loomaID);

		var resulttype = document.createElement("p");
		resulttype.id = "result_ID";
		resulttype.innerHTML = "<b>Result type: </b> Dictionary entry";
		div.appendChild(resulttype);

		var word = document.createElement("p");
		word.innerHTML = "<b>Word: </b>" + item.en;
		div.appendChild(word);

		var part = document.createElement("p");
		part.innerHTML = "<b>Part of speech: </b>" + item.part;
		div.appendChild(part);
	}
	else {		// If this is an activity
		// Thumbnail
		var image = document.createElement("img");
		if (item.ft == "mp3") {	 //audio
			image.id = "resultsimg";
			image.src = homedirectory + "content/audio/thumbnail.png";
		} 
		else if (item.ft == "mp4" || item.ft == "mp5") { //video
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.id = "resultsimg";
			image.src = homedirectory + "content/videos/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "jpg"  || item.ft == "gif" || item.ft == "png" ) { //picture
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.id = "resultsimg";
			image.src = homedirectory + "content/pictures/" + thumbnail_prefix + "_thumb.jpg";
		}
		else if (item.ft == "pdf") { //pdf
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.id = "resultsimg";
			image.src = homedirectory + "content/pdfs/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "EP") {
			var image = document.createElement("img");
			image.id = "resultsimg";
			image.src = homedirectory + "content/epaath/thumbnail.png";
		} 
		// else {
		// 	var image = document.createElement("img");
		// 	image.id = "resultsimg";
		// 	image.src = "images/kitty.jpg";
		// }
		div.appendChild(image);

		// Display ID
		var loomaID = document.createElement("p");
		loomaID.id = "result_ID";
		loomaID.innerHTML = "<b>ID: </b>" + item.ch_id;
		div.appendChild(loomaID);

		// Display file type
		var filetype = document.createElement("p");
		filetype.id = "result_ft";
		filetype.innerHTML = "<b>File type: </b>" + item.ft;
		div.appendChild(filetype);

		// Display file name
		var filename = document.createElement("p");
		filename.id = "result_fn";
		filename.innerHTML = "<b>File name: </b>" + item.fn;
		div.appendChild(filename);
	}

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	return div;
}


function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    // return http.status != 404;
    console.log("IMAGE NOT FOUND");

}



/////////// CURRENTLY NOT USING THIS AT ALL
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

	// Change size of image & add break
	newListItem.querySelector("img#resultsimg").style.width = "70px";
	// newListItem.querySelector("img#resultsimg").style.display = "block";

	// Delete unnecessary attributes
	if(newListItem.querySelector("p#result_subject")) {
		newListItem.querySelector("p#result_subject").remove();
	}
	// newListItem.querySelector("p#chapterID").remove();

	// Make the timeline div wider
	// newListItem.querySelector("div.timelinediv").style.width = "500px";
	// console.log(typeof(newListItem.parentNode));
	// newListItem.parentNode.style.width = "500px";

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
		filepath.value = resultArray[i].fp; 
		listItem.setAttributeNode(filepath);

		var filename = document.createAttribute("data-fn");       
		filename.value = resultArray[i].dn;         
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
		console.log("filepath exists?" + resultArray[i].fp);
		var att = document.createAttribute("src");
		if(resultArray[i].fp != null) {
			

			//attempting ajax for getting image filename (BUT THIS SHIT DOESN'T WORK)
			/*get_image = null;
			
			$(document).ready(function () {
				function imageAjax() {
		            var fileExt = {};
					fileExt[0]=".jpg";
					$.ajax({
					    //This will retrieve the contents of the folder if the folder is configured as 'browsable'
					    url: resultArray[i].fp,
					    success: function (data) {
					       $("#displaybox").html('<ul>');
					       //List all png or jpg or gif file names in the page
					       $(data).find('a:contains(" + fileExt[0] + ")').each(function () {
					           var filename = this.href.replace(window.location.host, "").replace("http:///", "");
					           console.log("image file:" + filename);
					           //$("#displaybox").append( '<li>'+filename+ <'/li'>);
					       });
					       $("#displaybox").append('</ul>');
					     }     
					  });
					}
					get_image=imageAjax;
				})
			
			get_image();*/

			var filename = "English-1_thumb.jpg";
			att.value = "../" + resultArray[i].fp + filename;       
			console.log("i = " + i);
			console.log("resultArray[i] = " + resultArray[i]);
			   
		}
		else if(resultArray[i].ft == "mp3" || resultArray[i].ft == "mp4") {
			att.value = "images/audio_icon.png";
		}
		else if(resultArray[i].ft == "EP") {
			att.value = "images/game_icon.png";
		}
		else if(resultArray[i].def != null) {
			att.value = "images/dictionary_icon.png";
		}
		//chapter
		else if(resultArray[i].pn !=null)
			att.value = "images/chapter_icon.png";
		else if(resultArray[i].ft = "jpg")
			att.value = "images/picture_icon.jpg";
		//picture

		thumbnail.setAttributeNode(att);
		listItem.appendChild(thumbnail);
               

		
		//set the display text for each content item
		listLabel.innerText = itemString.dn + ", Grade " + resultArray[i].ch_id[0];
		console.log("new list element:"+listLabel);
		
		//append elements to the list item
		
		listItem.appendChild(listLabel);
		listItem.appendChild(addButton);

	  	return listItem;

}



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

		$.post("../BackEnd/save.php", timeline, function() {
			console.log("Saved!");
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






