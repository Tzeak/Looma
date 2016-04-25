// This loads all the preliminary elements in the page.
window.onload = function loadPageElements() {

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
					html : "3",
					id : "3"
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
	        value: "EN",
	        html : "English" 
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

		createTimelineElement();
}




var createTimelineElement = function() {

	var timelineElements = opentime();	// gets the ID from the URL and retrieves the whole timeline array
	console.log(timelineElements);

	$.each(timelineElements, function(index, timelineObj) {

		var timelinediv = document.createElement("div");
		timelinediv.className = "timelinediv";

		var div = document.createElement("div");
		div.id = "resultitem";


		$("<p/>", {
			id : "timline_dn",
			html : "<b>" + timelineObj.dn + "</b>"
		}).appendTo(div);

		// Nepali Name
		$("<p/>", {
			id : "timeline_ndn",
			html : timelineObj.ndn
		}).appendTo(div);

		// ID
		$("<p/>", {
			id : "result_ID",
			html : timelineObj._id
		}).appendTo(div);
		
		$(div).appendTo(timelinediv);
		$(timelinediv).appendTo("#timelineDisplay");
		// $(".timelinediv").sortable('refresh');
	});

	

	/*
	  // Create new list items

	  var listItem = document.createElement("li");

		var id = document.createAttribute("id");        // Create a "href" attribute
		id.value = "item";            // Set the value of the href attribute
		listItem.setAttributeNode(id);

		var num = document.createAttribute("index");        // Create a "href" attribute
		num.value = i;            // Set the value of the href attribute
		listItem.setAttributeNode(num);

		// var remove = document.createAttribute("ondrag");        // Create a "href" attribute
		// remove.value = "addJSON(event)";            // Set the value of the href attribute
		// listItem.setAttributeNode(remove);


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

*/

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
		console.log(JSON.parse(filterdata));
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

	// Roshan said use bracket notation instead of dot notation

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
	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitleTitle";
	var arraylength = filterdata_object.chapters.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Chapters (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Chapters (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.chapters.length; i++) {
		var rElement = createChapterResults(filterdata_object.chapters[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	// Print Textbooks array
	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitleTitle";

	var arraylength = filterdata_object.textbooks.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Textbooks (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Textbooks (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.textbooks.length; i++) {
		var rElement = createTextbookResults(filterdata_object.textbooks[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}

	// Print Actdict array
	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitleTitle";

	var arraylength = filterdata_object.activities.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Activites (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Activites (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.activities.length; i++) {
		var rElement = createActivityResults(filterdata_object.activities[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}

	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitleTitle";

	var arraylength = filterdata_object.dictionary.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Dictionary (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Dictionary (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.dictionary.length; i++) {
		var rElement = createDictionaryResults(filterdata_object.dictionary[i])
		// var rElement = createChapterResults(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	$("#outerResultsDiv").html(currentResultDiv);

	// var filterdata_array = [];
	// for (var i=0; i < filterdata_object.chapter.length; i++) {
	// 	filterdata_array.push(filterdata_object.chapter[i]);
	// 	console.log(filterdata_array[i]);
	// }
	// $("#displaybox").html();
}

var homedirectory = "../";


// When you click the preview button
var preview_result = function(collection, item) {
	console.log("PREVIEWING THINGS");

	if (collection == "chapters") {
		console.log("chapters");
		// Chapter (pn of textbook)
		var str = item._id;
		var arr_split = str.split("");

		// For loop extracts the last 2 numbers as the chapter.

/////////////// THIS ACCOMMODATES FOR LACK OF 0'S BEFORE SOME OF THEM. LOL UGH.
		// If there is a decimal
			// If there are 2 numbers between the last letter & the decimal
				// Extract the 2 numbers between the last letter & the decimal
				// If the first number is 0
					// current chapter = the 2nd number
				// Else if the first number is not 0
					// concatenate the 2 numbers
					// current chapter = the 2 numbers
			// Else if there is 1 number between the last letter & the decimal
				// Extract the number between the last letter & decimal
				// current chapter = that number
		// Else if there is no decimal
			// If there are 2 numbers after the last letter
					// Extract the 2 numbers after the last letter
					// If the first number is 0
						// current chapter = the 2nd number
					// Else if the first number is not 0
						// concatenate the 2 numbers
						// current chapter = the 2 numbers
				// Else if there is 1 number after the last letter
					// Extract the number after the last letter
					// current chapter = that number
/////////////////////////////

// TO DO
// - extract sections when there is a decimal
// - some of them have display names & some dont & some have nepali dns & some dont & idk
// - add Roshan's function for mongo fix _id object into not object b/c i took that out when i was making the 3 arrays into 4 arrays


			for (var i = arr_split.length-1; i>=0; i--) {
				var currentChapter = arr_split[i-1].concat(arr_split[i]);
				arr_split.splice(i, 1);
				arr_split.splice(i-1, 1);
				break;
			}

		if (arr_split.length == 3) {	// If the subject is EN, or SS (or something with 2 letters)
			arr_split[1] = arr_split[1].concat(arr_split[2]);
			arr_split.splice(2, 1);
		}
		else if (arr_split.length < 3) {	// If the subject is M or S, N (or something with 1 letter)
			// MAKE THIS WORK
		}

		var currentGradeNumber = arr_split[0];
		var currentGrade = "Class".concat(arr_split[0]);
		if (arr_split[1] == "EN") {
			var currentSubject = "English";
		} 
		else if (arr_split[1] == "M") {
			var currentSubject = "Math";
		} 
		else if (arr_split[1] == "N") {
			var currentSubject = "Nepali";
		} 
		else if (arr_split[1] == "S") {
			var currentSubject = "Science";
		} 
		else if (arr_split[1] == "SS") {
			var currentSubject = "SocialStudies";
		}

		document.querySelector("div#displaybox").innerHTML = '<embed src="' + homedirectory + 'content/textbooks/' + currentGrade + "/" + currentSubject + "/" + currentSubject + "-" + currentGradeNumber + '.pdf#page=' + item.pn + '" width="100%" height="100%" type="application/pdf">';
	}


	else if (collection == "textbooks") {
		console.log("textbooks");
		document.querySelector("div#displaybox").innerHTML = '<embed src="' + homedirectory + 'content/' + item.fp + item.fn + '" width="100%" height="100%" type="application/pdf">';
	}


	else if (collection == "activities") {
		if(item.ft == "mp4" || item.ft == "mov" || item.ft == "mp5") {
			document.querySelector("div#displaybox").innerHTML = '<video width="100%" height="100%" controls> <source src="' + homedirectory + 'content/videos/' + item.fn + '" type="video/mp4"> </video>';
			// var newParagraph = document.createElement("p");
			// newParagraph.innerText = "media type: video";
			// document.querySelector("div#timelineBox").appendChild(newParagraph);
		}
		else if(item.ft=="mp3") {
		document.querySelector("div#displaybox").innerHTML = '<audio controls> <source src="' + homedirectory + 'content/audio/' + item.fn + '" type="audio/mpeg"></audio>';
		}
		// Pictures
		else if(item.ft=="jpg" || item.ft=="gif" || item.ft=="png") {
			document.querySelector("div#displaybox").innerHTML = '<img src="' + homedirectory + 'content/pictures/' + item.fn + '"id="displayImage">';
		}
		else if (item.ft=="EP") {
		document.querySelector("div#displaybox").innerHTML = '<object type="text/html" data="' + homedirectory + 'content/epaath/activites/' + item.fn  + 'style="width:100%; height:100%; margin:1%;"> </object>;'
		}
	}


	else if (collection == "dictionary") {
		document.querySelector("div#displaybox").innerHTML = item.def;
	}


	// Chapter information



	// Video

	// Audio
	
	// Definiton 
	
	
	// Game
	
}


/* //////////////////////TO-DO FOR RESULTS

THUMBNAILS
- Take care of if the image source is null
	- 	All the "thumbnail_prefix" variables: If the image source is null, 
		it shouldn't try to get the substring, because it'll break the code
	- 	If the file isn't there. We need to make a little 404 image and
		code it in.
- Names
	-	If there's a decimal in the ID, make it so that it extracts
		info correctly

//////////////////////////END TO-DO */

// Create "Chapter" collection results
var createChapterResults = function(item) {

	var collection = "chapters";
	var div = document.createElement("div");
	div.id = "resultitem";

	// Thumbnail & Extracting the ID elements
	/////////////////////// ALSO MAKE WORK IF THE ID HAS A DECIMAL!!!!!!!!//////////////////////

	var str = item._id;
	var arr_split = str.split("");

	// For loop extracts the last 2 numbers as the chapter.

	for (var i = arr_split.length-1; i>=0; i--) {
		// console.log(typeof(arr_split[i]));
		// if (arr_split[i] == "0" || arr_split[i] == "1" || arr_split[i] == "2" || arr_split[i] == "3" || arr_split[i] == "4" || arr_split[i] == "5" || arr_split[i] == "6" || arr_split[i] == "7" || arr_split[i] == "8" || arr_split[i] == "9") {
		// 	arr_split.splice(i,1); 
		// }
		// console.log(arr_split);
		// break;

		var currentChapter = arr_split[i-1].concat(arr_split[i]);
		arr_split.splice(i, 1);
		arr_split.splice(i-1, 1);
		break;
	}

	if (arr_split.length == 3) {	// If the subject is EN, or SS (or something with 2 letters)
		arr_split[1] = arr_split[1].concat(arr_split[2]);
		arr_split.splice(2, 1);
	}
	else if (arr_split.length < 3) {	// If the subject is M or S, N (or something with 1 letter)
		// MAKE THIS WORK
	}

	var currentGradeNumber = arr_split[0];
	var currentGrade = "Class".concat(arr_split[0]);
	if (arr_split[1] == "EN") {
		var currentSubject = "English";
	} 
	else if (arr_split[1] == "M") {
		var currentSubject = "Math";
	} 
	else if (arr_split[1] == "N") {
		var currentSubject = "Nepali";
	} 
	else if (arr_split[1] == "S") {
		var currentSubject = "Science";
	} 
	else if (arr_split[1] == "SS") {
		var currentSubject = "SocialStudies";
	}

	var thumbnail_prefix = currentSubject.concat("-", currentGradeNumber);

	var image = document.createElement("img");
	image.id = "resultsimg";
	image.src = homedirectory + "content/textbooks/" + currentGrade + "/" + currentSubject + "/" + thumbnail_prefix + "_thumb.jpg";
	div.appendChild(image);

	// Display name
	$("<p/>", {
		id : "result_dn",
		html : "<b>" + item.dn + "</b>"
	}).appendTo(div);

	// Nepali Name
	$("<p/>", {
		id : "result_ndn",
		html : item.ndn
	}).appendTo(div);

	// ID
	$("<p/>", {
		id : "result_ID",
		html : item._id
	}).appendTo(div);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection, item);
	})
	div.appendChild(previewButton);

	return div;
}

// Create "Textbook" collection results
var createTextbookResults = function(item) {
	var collection = "textbooks";
	var div = document.createElement("div");
	div.id = "resultitem";

	// Thumbnail
	var thumbnail_prefix = item.fn;
	thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

	$("<img/>", {
		id : "resultsimg",
		src : homedirectory + "content/" + item.fp + thumbnail_prefix + "_thumb.jpg"
	}).appendTo(div);

	// var image = document.createElement("img");
	// image.id = "resultsimg";
	// image.src =  homedirectory + "content/" + item.fp + thumbnail_prefix + "_thumb.jpg";
	// div.appendChild(image);

	// Display name
	$("<p/>", {
		id : "result_dn",
		html : "<b>" + item.dn + "</b>"
	}).appendTo(div);

	// Nepali Name
	$("<p/>", {
		id : "result_ndn",
		html : item.ndn
	}).appendTo(div);

	// ID
	$("<p/>", {
		id : "result_ID",
		html : item._id
	}).appendTo(div);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection, item);
	})
	div.appendChild(previewButton);

	return div;
}

// Create "Actdict" collection results
var createActivityResults = function(item) {
	console.log("creating activities");
	var collection = "activities";
	var div = document.createElement("div");
	div.id = "resultitem";

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

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection, item);
	})
	div.appendChild(previewButton);

	return div;
}

var createDictionaryResults = function(item) {
	var collection = "dictionary";
	var div = document.createElement("div");
	div.id = "resultitem";

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

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	addButton.onclick = addJSON;
	div.appendChild(addButton);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection, item);
	})
	div.appendChild(previewButton);

	return div;
}


function imageExists(image_url){

    var http = new XMLHttpRequest();

    http.open('HEAD', image_url, false);
    http.send();

    // return http.status != 404;
    console.log("IMAGE NOT FOUND");

}



var resultsWhole = document.querySelector("div#resultsdiv");
var resultsUL = document.querySelector("div#resultsdiv ul#resultsDivUL");
var timelineWhole = document.querySelector("div#timelineWhole");

var addJSON = function() {

	console.log("hello!!!");
	// Clone current list item
	var listItem = this.parentNode;
	var newListItem = listItem.cloneNode(true);

	// TRYING TO GET THIS TO WORK... When the div is added to timeline, get rid of the bottom border
	// $(newListItem).css("border-bottom", "");

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








