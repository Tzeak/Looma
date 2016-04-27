


/////////////////////////// INITIALIZING THINGS ///////////////////////////


var timelineAssArray = new Object();

var homedirectory = "../";







/////////////////////////// ONLOAD FUNCTION ///////////////////////////

// This loads all the preliminary elements in the page.
window.onload = function loadPageElements() {

		// Sidebar: Search

		$("<div/>", {
			id : "div_search"
		}).appendTo("#div_filter");
		$("<p/>", {
			id : "search_label",
			
		}).appendTo("#div_search");
		$("<input/>", {
			id : "searchString",
			class: "textBox",
			type : "text",
			placeholder: "Search",
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
			id : "dropdown_grade",
			placeholder: "Grade Level"
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

		// $("<p/>", {
		// 	html : "File types: ", 
		// }).appendTo("#div_filetypes");

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
	    	//$("#div_filetypes").append("<br/>");
		});

		// Button

	    $("#div_filetypes").append("<br/>");

		$("<button/>", {
			id : "submit_button",
			onclick : "querySearch()",
			type : "button",
			html : "Search"
		}).appendTo("#div_filter");


		openTimeline();
}


var addToAssArray = function(object) {
	timelineAssArray[object._id] = object;
	console.log("added " + object._id + " to ass array");
}







/////////////////////////// TIMELINE MANIPULATION ///////////////////////////

var openTimeline = function() {
	var timelineElements = opentime();	// gets the ID from the URL and retrieves the whole timeline array
	$.each(timelineElements, function(index, timelineObj) {
		createTimelineElement(timelineObj);
	});
}


var createTimelineElement = function(object){

	var innerdiv = null;

 	if(object.ft !=null)
 		innerdiv = createActivityDiv(object);

 	//textbook
 	//if (collection=="textbooks")
 	if(object.subject!=null)
 		innerdiv = createTextbookDiv(object);

 	//dictionary
 	//if (collection=="dictionary")
 	if(object.part!=null)
 		innerdiv = createDictionaryDiv(object);

 	//chapter
 	//if (collection = "chapters")
 	if(object.pn!=null)
 		innerdiv = createChapterDiv(object);	

 	var timelinediv = $(innerdiv).appendTo($("<div/>", {class: "timelinediv"}).appendTo("#timelineDisplay"));
 	$(".timelinediv button.add").remove();
	var removebutton = $("<button/>", {class: "remove", html:"Remove"}).bind("click", removeTimelineElement);
	$(timelinediv).append(removebutton);

	sortableFunction();
}


 

var removeTimelineElement = function() {
  // Removing list item from timelineHolder
  var timelineItem = this.parentNode;
  timelineItem.parentNode.remove();
}	











/////////////////////////// QUERY / RESULTS ///////////////////////////

// var resultArray = [];

var querySearch = function() {

	var filterdata = {
		'grade' : document.getElementById('dropdown_grade').value,
		'subject' : document.getElementById('dropdown_subject').value,
		'chapter' : document.getElementById('dropdown_chapter').value,
		'section': document.getElementById('dropdown_section').value,
		'image' : document.getElementById('ft_image').checked,
		'video' : document.getElementById('ft_video').checked,
		'audio' : document.getElementById('ft_audio').checked,
		'misc' : document.getElementById('ft_misc').checked
	};
	$.get("../BackEnd/query.php", filterdata, function(filterdata) {
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
	// Print Chapter array
	var currentResultDiv = document.createElement("div");
	currentResultDiv.id = "currentResultDiv";
	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";
	var arraylength = filterdata_object.chapters.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Chapters (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Chapters (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);


	for(var i=0; i<filterdata_object.chapters.length; i++) {
		var rElement = createChapterDiv(filterdata_object.chapters[i])
		// var rElement = createChapterDiv(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	// Print Textbooks array

	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";

	var arraylength = filterdata_object.textbooks.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Textbooks (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Textbooks (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.textbooks.length; i++) {
		var rElement = createTextbookDiv(filterdata_object.textbooks[i])
		// var rElement = createChapterDiv(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	// Print Activities array
	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";

	var arraylength = filterdata_object.activities.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Activites (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Activites (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.activities.length; i++) {
		var rElement = createActivityDiv(filterdata_object.activities[i])
		// var rElement = createChapterDiv(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}


	// Print Dictionary array
	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";

	var arraylength = filterdata_object.dictionary.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "Dictionary (" + arraylength + " Result)";
	} 
	else {
		collectionTitle.innerHTML = "Dictionary (" + arraylength + " Results)";
	}
	currentResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.dictionary.length; i++) {
		var rElement = createDictionaryDiv(filterdata_object.dictionary[i])
		// var rElement = createChapterDiv(resultArray[i]);
		currentResultDiv.appendChild(rElement);
	}



	$("#outerResultsDiv").html(currentResultDiv);
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
var createChapterDiv = function(item) {
	var collection = "chapters";
	var div = document.createElement("div");
	div.className = "resultitem";

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
	// addButton.onclick = createTimelineElement(item);
	$(addButton).bind("click", function() {
		addToAssArray(item);
		createTimelineElement(item); 
	});
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
var createTextbookDiv = function(item) {
	var collection = "textbooks";
	var div = document.createElement("div");
	div.className = "resultitem";

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
	$(addButton).bind("click", function() {
		addToAssArray(item);
		createTimelineElement(item); 
		console.log("clicked add button lol");
	});
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
var createActivityDiv = function(item) {
	var collection = "activities";
	var div = document.createElement("div");
	// div.className = "resultitem";

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
	$(addButton).bind("click", function() {
		addToAssArray(item);
		createTimelineElement(item); 
		console.log("clicked add button lol");
	});
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

var createDictionaryDiv = function(item) {
	var collection = "dictionary";
	var div = document.createElement("div");
	div.className = "resultitem";

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
	$(addButton).bind("click", function() {
		addToAssArray(item);
		createTimelineElement(item); 
		console.log("clicked add button lol");
	});
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









/////////////////////////// PREVIEW ///////////////////////////

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



/////////////////////////// SAVE ///////////////////////////

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










/////////////////////////// SORTABLE UI ///////////////////////////

var sortableFunction = function() {
    $("#timelineDisplay").sortable({
    //$('#btnSave').hide();
        opacity: 0.7,
        revert: true,   //Animates
        scroll: true,   //Allows page to scroll when dragging. Good for tall pages.
        handle: $(".timelinediv"),
        update: function () {  
        	$('#btnSave').show() 
    	}
    });
}




