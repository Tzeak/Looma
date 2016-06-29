


////////////////////////////////////////////// INITIALIZING THINGS //////////////////////////////////////////////


var timelineAssArray = new Object();

var homedirectory = "../../";







////////////////////////////////////////////// INITIALIZATION //////////////////////////////////////////////

/* 
	Function:		loadPageElements()
	Description:	Creates & appends HTML DOM elements using JS/jquery on window load.
*/

window.onload = function loadPageElements() {
	
		// Navigation Bar 

		$("<p/>", {
			html : "Lesson Plan Creator: Edit"
		}).appendTo("#navbar");



		// Filter: Search

		$("<div/>", { 
			id : "div_search" 
		}).appendTo("#div_filter");	// Appends a div to "#div_filter"
		$("<p/>", {
			class : "filter_label",
			id : "search_label",
		}).appendTo("#div_search");	// Appends a p element to #div_search div
		$("<input/>", {
			id : "searchString",
			class: "textBox",
			type : "text",
			placeholder: "Search",
			name : "search",
		}).appendTo("#div_search");	// Appends a text box to #div_search div, etc.



		// Filter: Grade

		$("<div/>", {
			id : "div_grade"
		}).appendTo("#div_filter");	

		$("<p/>", {
			class : "filter_label",
			html : "Grade Level:<br/>", 
		}).appendTo("#div_grade");

		$("<select/>", {
			class : "filter_dropdown",
			id : "dropdown_grade",
			placeholder: "Grade Level"
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

		// Filter: Subject

		var subjects = {
			"English" : "EN",
			"Math" : "M",
			"Nepali" : "N",
			"Science" : "S",
			"Social Studies" : "SS"
		}

		$("<div/>", {
			id : "div_subject"
		}).appendTo("#div_filter");

		$("<p/>", {
			class : "filter_label",
			html : "Subject: ", 
		}).appendTo("#div_subject");

		$("<select/>", {
			class : "filter_dropdown",
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


		// Filter: File Type

		var filetypes = {
			"image" : 		{ 	id : "ft_image", 	display : "Image" 	},
			"video" : 		{ 	id : "ft_video", 	display : "Video" 	},
			"audio" : 		{ 	id : "ft_audio", 	display : "Audio" 	},
			"game" : 		{ 	id : "ft_game", 	display : "Game" 	},
			"pdf" : 		{ 	id : "ft_pdf", 		display : "PDF" 	},
			"webpage" : 	{ 	id : "ft_webpage", 	display : "Webpage" },
		}

		
		$("<div/>", {
			id : "div_filetypes"
		}).appendTo("#div_filter");

		$.each(filetypes, function (key, value) {
		    $("<input/>", { 
		 		class : "filter_checkbox",
		    	type : "checkbox",
		    	style : "zoom:1.5",
		    	id : value.id,
		        name : key
	    	}).appendTo("#div_filetypes");
	    	$("<label/>", { 
	    		class : "filter_label",
		    	for : value.id,
		    	html : value.display
	    	}).appendTo("#div_filetypes");
		});


		// Button

	    $("#div_filetypes").append("<br/>");

		$("<button/>", {
			id : "clear_button",
			onclick : "clearFilter()",
			type : "button",
			html : "Clear"
		}).appendTo("#div_filter");

		$("<button/>", {
			id : "submit_button",
			onclick : "queryData()",
			type : "button",
			html : "Search"
		}).appendTo("#div_filter");


		// Title string

		$("<p/>", {
			html : "Lesson Plan Title:&nbsp;&nbsp;"
		}).appendTo("#titleDiv");

		$("<input/>", {
			id : "titleInput",
			class: "textBox",
			type : "text",
			placeholder: "e.g. Level 1 Math",
			name : "title",
		}).appendTo("#titleDiv");

		openTimeline();	// This can be called only after the DOM elements are loaded.
}


/* 
	Function:		addToAssArray(object)
	Description:	Loads the object into timelineAssArray[], 
					which holds the order of the elements in 
					the timeline.
					Input: 	- object 
*/
var addToAssArray = function(object) {
	timelineAssArray[object._id] = object;
}





////////////////////////////////////////////// TIMELINE MANIPULATION //////////////////////////////////////////////

/* 
	Function:		openTimeline()
	Description:	After the DOM elements are loaded, this
					checks to see if there is a timeline ID
					in the URL, which means that the page
					means to be opening a pre-existing timeline.
					If there is, the object is sent to 
					createTimelineElement.
*/

var openTimeline = function() {
	var timelineElements = opentime();	// gets the ID from the URL and retrieves the whole timeline array
	$.each(timelineElements, function(index, timelineObj) {
		createTimelineElement(timelineObj);
	});
}


var createTimelineElement = function(item, collection, issection){
	console.log("item: ");
	console.log(item);

	var idExtractArray = extractItemId(item, collection);
	// currentSection
	// currentChapter
	// currentSubject
	// currentGradeNumber
	// currentGradeFolder
	// currentSubjectFull
	// chprefix

	var timelinediv = $("<div/>", {class : "timelinediv"}).appendTo("#timelineDisplay");
	$(timelinediv).attr("data-objid", item._id);

	var innerdiv = document.createElement("div");
	innerdiv.className = "innerdiv";
	var textdiv = document.createElement("div");
	textdiv.className = "timelineTextDiv";
	var buttondiv = document.createElement("div");
	buttondiv.className = "timelineButtonDiv";

	 //textbook
 	if(collection == "textbooks" || item.subject != null) {

		var thumbnail_prefix = item.fn;
		thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));
		$("<img/>", {
			class : "timelineimg",
			src : getImgFilepath(item, collection)
		}).appendTo(textdiv);
 		$("<p/>", { html : "<b>Textbook:</b>" }).appendTo(textdiv);
 		$("<p/>", { html : "<b>" + item.dn + "</b>" }).appendTo(textdiv);
 		
 	}


 	 //chapter
 	if(collection == "chapters" || item.pn != null) {
 		$("<img/>", {
			class : "timelineimg",
			src : getImgFilepath(item, collection)
		}).appendTo(textdiv);

 		if (issection == 1) {
 			$("<p/>", { html : "<b>Chapter Section:</b>" }).appendTo(textdiv);
 			$("<p/>", { html : "<b>" + item.dn + "</b>" }).appendTo(textdiv);
 			$("<p/>", { html : "Class " + idExtractArray["currentGradeNumber"] + " " + idExtractArray["currentSubjectFull"] + ",<br/>Chapter " + idExtractArray["currentChapter"] + ", Section " + idExtractArray["currentSection"]}).appendTo(textdiv);
 		}
 		else {
 			$("<p/>", { html : "<b>Chapter:</b>" }).appendTo(textdiv);
 			$("<p/>", { html : "<b>" + item.dn + "</b>" }).appendTo(textdiv);
 			$("<p/>", { html : "Class " + idExtractArray["currentGradeNumber"] + " " + idExtractArray["currentSubjectFull"] + ",<br/>Chapter " + idExtractArray["currentChapter"]}).appendTo(textdiv);
 		}
 	}



	// activities
 	if(collection == "activity" || item.ft != null) {

 		// Thumbnail
 		$("<img/>", {
			class : "timelineimg",
			src : getImgFilepath(item, collection)
		}).appendTo(textdiv);

		$("<p/>", { html : "<b>" + getFileType(item.ft) + ":</b>" }).appendTo(textdiv);
		$("<p/>", { html : "<b>" + item.dn + "</b>" }).appendTo(textdiv);

 		if (issection == 1) {
 			$("<p/>", { html : "<Class " + idExtractArray["currentGradeNumber"] + " " + idExtractArray["currentSubjectFull"] + ",<br/>Chapter " + idExtractArray["currentChapter"] + ", Section " + idExtractArray["currentSection"]}).appendTo(textdiv);
 		}
 		else {
 			$("<p/>", { html : "Class " + idExtractArray["currentGradeNumber"] + " " + idExtractArray["currentSubjectFull"] + ",<br/>Chapter " + idExtractArray["currentChapter"]}).appendTo(textdiv);
 		}
 	}



 	//dictionary
 	if(collection == "dictionary" || item.part != null) {
 		$("<p/>", { html : "<b>Dictionary Entry:</b>" }).appendTo(textdiv);

 		$("<p/>", { html : "Class " + idExtractArray["currentGradeNumber"] + " " + idExtractArray["currentSubjectFull"] + ",<br/>Chapter " + idExtractArray["currentChapter"]}).appendTo(textdiv);
 	}

 	var previewbutton = $("<button/>", {class: "preview", html:"Preview"}).bind("click", function() {
		preview_result(collection, item);
	});
	$(buttondiv).append(previewbutton);
		var removebutton = $("<button/>", {class: "remove", html:"Remove"}).bind("click", removeTimelineElement);
	$(buttondiv).append(removebutton);

	$(textdiv).appendTo(innerdiv);
	$(buttondiv).appendTo(innerdiv);

	$(innerdiv).appendTo(timelinediv);
	addToAssArray(item);
	console.log("timeline ass array: ");
	console.log(timelineAssArray);

	sortableFunction();
}


var removeTimelineElement = function() {
  // Removing list item from timelineHolder
  var outerDiv = this.parentNode.parentNode.parentNode;
  outerDiv.remove();	// "Remove" button is within 3 divs
}	






////////////////////////////////////////////// QUERY / RESULTS //////////////////////////////////////////////



var clearFilter = function() {
	 // $("#div_filter").each(function() { this.selectedIndex = 0 });
	 $(".filter_dropdown").each(function() {
	 	this.selectedIndex = 0
	 });
	 $(".filter_checkbox").each(function() {
	 	$(this).prop("checked", false);
	 })
}




var queryData = function() {
	$("#innerResultsDiv").empty();
	$("#innerResultsMenu").empty();
	$("#innerResultsSubMenu").empty();
	$("#innerResultsSubMenu").addClass("hidden");

	var filterdata = {
		'grade' : document.getElementById('dropdown_grade').value,
		'subject' : document.getElementById('dropdown_subject').value,
		'image' : document.getElementById('ft_image').checked,
		'video' : document.getElementById('ft_video').checked,
		'audio' : document.getElementById('ft_audio').checked,
		'game' : document.getElementById('ft_game').checked,
		'pdf' : document.getElementById('ft_pdf').checked,
		'webpage' : document.getElementById('ft_webpage').checked,
	};

	if (filterdata['grade'] == "" && filterdata['subject'] == "" && filterdata['image'] == false && filterdata['video'] == false && filterdata['audio'] == false && filterdata['game'] == false && filterdata['pdf'] == false && filterdata['webpage'] == false) {
		$("#innerResultsDiv").html("Please select at least 1 filter option before searching.");
	}
	else {
		var loadingmessage = $("<p/>", {html : "Loading results..."}).appendTo("#innerResultsDiv");
		$.get("../BackEnd/query.php", filterdata, function(filterdata) {
			$(loadingmessage).remove();
			var filterdata_object = JSON.parse(filterdata);
			console.log(filterdata_object);
			printFilterData(filterdata_object);
		}); //Send filter data to server via GET request
	}
}

/*		
//////// SEARCH BUTTON: NOT COMPLETED

var data = {
	'search' : "Classroom"
};

var searchButton = function() {
	console.log("search butt pressed");
	$.getJSON("../BackEnd/search.php", data, function(data) {
		console.log(data);
	});
}

*/



var printFilterData = function(filterdata_object) {
	var currentResultDiv = document.createElement("div");
	currentResultDiv.id = "currentResultDiv";
	// currentResultDiv.appendTo("#innerResultsDiv");
	$(currentResultDiv).appendTo("#innerResultsDiv");


	// Print Textbooks array

	var textbookResultDiv = document.createElement("div");
	textbookResultDiv.id = "textbookResultDiv";
	$(textbookResultDiv).appendTo(currentResultDiv);

	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";

	var arraylength = filterdata_object.textbooks.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "<a name='textbooks'>Textbooks (" + arraylength + " Result)</a>";
	} 
	else {
		collectionTitle.innerHTML = "<a name='textbooks'>Textbooks (" + arraylength + " Results)</a>";
	}
	textbookResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.textbooks.length; i++) {
		var rElement = createTextbookDiv(filterdata_object.textbooks[i]);

		textbookResultDiv.appendChild(rElement);
		console.log(filterdata_object.textbooks[i]._id);
	}




	// Print Chapter array

	var chapterResultDiv = document.createElement("div");
	chapterResultDiv.id = "chapterResultDiv";
	$(chapterResultDiv).appendTo(currentResultDiv);

	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";
	var arraylength = filterdata_object.chapters.length;		// WE NEED TO FIX THIS. This is counting sections as well!!!
	if (arraylength == 1) {
		collectionTitle.innerHTML = "<a name='chapters'>Chapters (" + arraylength + " Result)</a>";
	} 
	else {
		collectionTitle.innerHTML = "<a name='chapters'>Chapters (" + arraylength + " Results)</a>";
	}
	chapterResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.chapters.length; i++) {
		var rElement = createChapterDiv(filterdata_object.chapters[i], filterdata_object.chapters[i-1]);
		if ($(rElement).data("type") == "chapter") {
			chapterResultDiv.appendChild(rElement);
		}
		else if ($(rElement).data("type") == "section") {
			var matchingDiv = getSectionChapterByPrefix(chapterResultDiv, rElement);
			if (matchingDiv != null) {
				$(matchingDiv).append(rElement);
			}
			else {
				chapterResultDiv.appendChild(rElement);
			}
		}		
	}



	// Print Activities array

	var actResultDiv = document.createElement("div");
	actResultDiv.id = "actResultDiv";
	$(actResultDiv).appendTo(currentResultDiv);

	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";
	var arraylength = filterdata_object.activities.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "<a name='activities'>Activities (" + arraylength + " Result)</a>";
	} 
	else {
		collectionTitle.innerHTML = "<a name='activities'>Activities (" + arraylength + " Results)</a>";
	}
	actResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.activities.length; i++) {
		var rElement = createActivityDiv(filterdata_object.activities[i], filterdata_object.activities[i-1]);
		if ($(rElement).data("type") == "chapter") {
			actResultDiv.appendChild(rElement);
		}
		else if ($(rElement).data("type") == "section") {
			var matchingDiv = getSectionChapterByPrefix(actResultDiv, rElement);
			if (matchingDiv != null) {
				$(matchingDiv).append(rElement);
			}
			else {
				actResultDiv.appendChild(rElement);
			}
		
		}

	}


	// Print Dictionary array

	var dictResultDiv = document.createElement("div");
	dictResultDiv.id = "dictResultDiv";
	$(dictResultDiv).appendTo(currentResultDiv);

	var collectionTitle = document.createElement("h1");
	collectionTitle.id = "collectionTitle";

	var arraylength = filterdata_object.dictionary.length;
	if (arraylength == 1) {
		collectionTitle.innerHTML = "<a name='dictionary'>Dictionary (" + arraylength + " Result)</a>";
	} 
	else {
		collectionTitle.innerHTML = "<a name='dictionary'>Dictionary (" + arraylength + " Results)</a>";
	}
	dictResultDiv.appendChild(collectionTitle);

	for(var i=0; i<filterdata_object.dictionary.length; i++) {
		var rElement = createDictionaryDiv(filterdata_object.dictionary[i], filterdata_object.dictionary[i-1]);
		// var rElement = createChapterDiv(resultArray[i]);
		dictResultDiv.appendChild(rElement);
	}

	// Create inner results menu
	$("<a/>", {
		href : "#textbooks",
		html : "Textbooks"
	}).appendTo("#innerResultsMenu");
	$("<a/>", {
		href : "#chapters",
		html : "Chapters",
	}).hover(function() {
		// $("#innerResultsSubMenu").removeClass("hidden");
		// loadInnerResultsSubMenu(filterdata_object.chapters, "chapters");
	}).appendTo("#innerResultsMenu");
	$("<a/>", {
		href : "#activities",
		html : "Activities",
	}).hover(function() {
		// $("#innerResultsSubMenu").removeClass("hidden");
		// loadInnerResultsSubMenu(filterdata_object.activities, "activities");
	} ).appendTo("#innerResultsMenu");
	$("<a/>", {
		href : "#dictionary",
		html : "Dictionary"
	}).appendTo("#innerResultsMenu");


	$("#innerResultsMenu").removeClass("hidden");
}


// ON HOVER MENU FOR INNERRESULTSMENU: NOT COMPLETED
/*
var loadInnerResultsSubMenu = function(itemObject, collection) {
	console.log("loading inner results menu");
	console.log(itemObject.length);

	for (var i=0; i<itemObject.length; i++) {
		var idExtractArray = extractItemId(itemObject[i], collection);
		if (collection="chapters") {
			$("<a/>", { 
				html : idExtractArray["currentChapter"],
				href : "#chapter_chapter" + idExtractArray["currentChapter"]
			}).appendTo("#innerResultsSubMenu");
		}
		else if (collection="activities") {
			$("<a/>", { 
				html : idExtractArray["currentChapter"],
				href : "#activities_chapter" + idExtractArray["currentChapter"]
			}).appendTo("#innerResultsSubMenu");
		}
	}
}
*/





// Create "Textbook" collection results
var createTextbookDiv = function(item) {
	var issection = 0;
	var collection = "textbooks";
	var resultdiv = document.createElement("div");
	resultdiv.className = "resultitem";

	// Thumbnail
	var thumbnaildiv = document.createElement("div");
	thumbnaildiv.className = "thumbnaildiv";
	$(thumbnaildiv).appendTo(resultdiv);

	$("<img/>", {
		class : "resultsimg",
		src : getImgFilepath(item, collection)
	}).appendTo(thumbnaildiv);

	// Result Text
	var textdiv = document.createElement("div");
	textdiv.className = "textdiv";
	$(textdiv).appendTo(resultdiv);

	$("<p/>", {	// Display name
		class : "result_dn",
		html : "<b>" + item.dn + "</b>"
	}).appendTo(textdiv);

	$("<p/>", {	// Nepali display name
		class : "result_ndn",
		html : item.ndn
	}).appendTo(textdiv);

	$("<p/>", {	// Mongo ID
		class : "result_ID",
		html : item._id
	}).appendTo(textdiv);


	// Buttons
	var buttondiv = document.createElement("div");
	buttondiv.className = "buttondiv";
	$(buttondiv).appendTo(resultdiv);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	$(addButton).bind("click", function() {
		createTimelineElement(item, collection, issection); 
	});
	$(addButton).appendTo(buttondiv);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection,
		 item);
	});
	$(previewButton).appendTo(buttondiv);

	return resultdiv;
}






// Create "Chapter" collection results
var createChapterDiv = function(item, previtem) {
	var collection = "chapters";
	var issection = 0;

	var idExtractArray = extractItemId(item, collection);
	if (previtem != null) {
		var idExtractArray_prev = extractItemId(previtem, collection);
	}

	if (previtem != null) {
		if (item._id.indexOf(".") >= 0) {
			//	If the prefix is equal to the prefix before it
			if (idExtractArray["chprefix"] == idExtractArray_prev["chprefix"]) {
				issection = 1;
				var sectionDiv = document.createElement("div");
				sectionDiv.className = "result_chapter_section";
				$(sectionDiv).attr("data-chprefix", idExtractArray["chprefix"]);
				$(sectionDiv).attr("data-type", "section");
				$(sectionDiv).attr("data-collection", collection);
				// console.log("prefix for item " + item.dn + " is " + $(sectionDiv).data('chprefix'));

				$("<p/>", {
					class : "result_dn",
					html : "<b>Section " + idExtractArray["currentSection"]
				}).appendTo(sectionDiv);
				$("<p/>", {
					class : "result_dn",
					html : item.dn
				}).appendTo(sectionDiv);

				var addButton = document.createElement("button");
				addButton.innerText = "Add";
				addButton.className = "add";
				// addButton.onclick = createTimelineElement(item);
				$(addButton).bind("click", function() {
					createTimelineElement(item, collection, issection); 
				});
				sectionDiv.appendChild(addButton);

				var previewButton = document.createElement("button");
				previewButton.innerText = "Preview";
				previewButton.className = "preview";
				// previewButton.onclick = preview_result(item);
				$(previewButton).bind("click", function() {
					preview_result(collection, item);
				})
				sectionDiv.appendChild(previewButton);

				return sectionDiv;
			}
		}
	}

	// $("<a/>", { 
	// 	html : idExtractArray["currentChapter"],
	// 	href : "#chapter_chapter" + idExtractArray["currentChapter"]
	// }).appendTo("#innerResultsSubMenu");

	var div = document.createElement("div");
	div.className = "resultitem";
	// var div = $("<div/>", {class:"resultitem"});

	
	$(div).attr("data-chprefix", idExtractArray["chprefix"]);
	$(div).attr("data-type", "chapter");
	$(div).attr("data-collection", collection);

	$("<img/>", {
		class : "resultsimg",
		src : getImgFilepath(item, collection)
	}).appendTo(div);

	// Display name
	$("<a/>", {
		class : "result_dn",
		name : "chapter_chapter" + idExtractArray["currentChapter"],
		html : "<b>Chapter " + idExtractArray["currentChapter"] + ": " + item.dn + "</b>"
	}).appendTo(div);

	// Nepali Name
	$("<p/>", {
		class : "result_ndn",
		html : item.ndn
	}).appendTo(div);

	// ID
	$("<p/>", {
		class : "result_ID",
		html : item._id
	}).appendTo(div);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	// addButton.onclick = createTimelineElement(item);
	$(addButton).bind("click", function() {
		createTimelineElement(item, collection, issection); 
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






var createActivityDiv = function(item, previtem) {
	var collection = "activities";
	var issection = 0;

	var idExtractArray = extractItemId(item, collection);
	if (previtem != null) {
		var idExtractArray_prev = extractItemId(previtem, collection);
	}

	var div = document.createElement("div");
	div.className = "resultitem";
	$(div).attr("data-chprefix", idExtractArray["chprefix"]);
	$(div).attr("data-type", "section");
	$(div).attr("data-collection", collection);





	var innerActivityDiv = function(item) {

		var activityDiv = document.createElement("div");
		activityDiv.className = "activityDiv";
		
		$(activityDiv).attr("data-chprefix", idExtractArray["chprefix"]);
		$(activityDiv).attr("data-collection", collection);

		// Thumbnail
		var thumbnaildiv = document.createElement("div");
		thumbnaildiv.className = "thumbnaildiv";
		$(thumbnaildiv).appendTo(activityDiv);

		$("<img/>", {
			class : "resultsimg",
			src : getImgFilepath(item, collection)
		}).css("width","140").appendTo(thumbnaildiv);


		// Result Text
		var textdiv = document.createElement("div");
		textdiv.className = "textdiv";
		$(textdiv).appendTo(activityDiv);

		// ID
		$("<p/>", {
			class : "result_ID",
			html : item.ch_id
		}).appendTo(textdiv);

		// Display Name
		$("<p/>", {
			class : "result_dn",
			html : "<b>" + item.dn + "</b>"
		}).appendTo(textdiv);

		// File Type
		$("<p/>", {
			class : "result_ft",
			html : getFileType(item.ft) + " // " + item.ft
		}).appendTo(textdiv);


		// Buttons
		var buttondiv = document.createElement("div");
		buttondiv.className = "buttondiv";
		$(buttondiv).appendTo(activityDiv);

		// "Add" button
		var addButton = document.createElement("button");
		addButton.innerText = "Add";
		addButton.className = "add";
		$(addButton).bind("click", function() {
			createTimelineElement(item, collection, issection); 
		});
		buttondiv.appendChild(addButton);

		var previewButton = document.createElement("button");
		previewButton.innerText = "Preview";
		previewButton.className = "preview";
		// previewButton.onclick = preview_result(item);
		$(previewButton).bind("click", function() {
			preview_result(collection, item);
		})
		buttondiv.appendChild(previewButton);

		return activityDiv;
	}








	// If this item is the first item
	if (previtem == null) {
		// Create h3 Chapter element

		$("<a/>", { 
			name : "activities_chapter" + idExtractArray["currentChapter"],
			html : "<b>Chapter " + idExtractArray["currentChapter"] + "</b>"
		}).appendTo(div);

		// If the item ID has a decimal
		if (item.ch_id.indexOf(".") >= 0) {
			// Create a section div & append to main div
			issection = 1;
			var sectionDiv = innerActivityDiv(item);
			$(sectionDiv).attr("data-type", "section").appendTo(div);
		}
		// Else if the item ID doesn't have a decimal
		else {
			// Create a chapter div & append to main div
			var chapterDiv = innerActivityDiv(item);
			$(chapterDiv).attr("data-type", "chapter").appendTo(div);
		}
	}
	// If this item isn't the first item
	else if (previtem != null) {
		// If the item  ID has a decimal
		if (item.ch_id.indexOf(".") >= 0) {
			issection = 1;
			// If the ID prefix matches the prefix of the last one
			if (idExtractArray["chprefix"] == idExtractArray_prev["chprefix"]) {
				//	Make a section div
				var sectionDiv = innerActivityDiv(item);
				$(sectionDiv).attr("data-type", "section").appendTo(div);
			}
			// Else if the ID prefix doesn't match the last one
			else if (idExtractArray["chprefix"] != idExtractArray_prev["chprefix"]) {
				// Create a new Chapter section
				// $("<a/>", { 
				// 	html : idExtractArray["currentChapter"],
				// 	href : "#activities_chapter" + idExtractArray["currentChapter"]
				// }).appendTo("#innerResultsSubMenu");

				$("<a/>", { 
					name : "activities_chapter" + idExtractArray["currentChapter"],
					html : "<b>Chapter " + idExtractArray["currentChapter"] + "</b>"
				}).appendTo(div);
				issection = 1;
				var sectionDiv = innerActivityDiv(item);
				$(sectionDiv).attr("data-type", "section").appendTo(div);
			}
		}
		// Else if the item ID doesn't have a decimal
		else {
			// Create h3 Chapter element
			$("<h3/>", { 
				html : "Chapter " + idExtractArray["currentChapter"] 
			}).appendTo(div);
			var chapterDiv = innerActivityDiv(item);
			$(chapterDiv).attr("data-type", "chapter").appendTo(div);

		}
	}



	return div;
}






var createDictionaryDiv = function(item, previtem) {
	var collection = "dictionary";
	var issection = 0;

	var idExtractArray = extractItemId(item, collection);
	if (previtem != null) {
		var idExtractArray_prev = extractItemId(previtem, collection);
	}

	var div = document.createElement("div");
	div.className = "resultitem";

	if (previtem == null) {
		if (idExtractArray["currentChapter"] == "01") {
			var headerdiv = document.createElement("div");
			div.appendChild(headerdiv);
			$("<h3/>", { 
				html : "Chapter 01"
			}).appendTo(headerdiv);
		}
	}
	else if (previtem != null) {
		if (idExtractArray["chprefix"] != idExtractArray_prev["chprefix"]) {
			var headerdiv = document.createElement("div");
			div.appendChild(headerdiv);
			$("<h3/>", { 
				html : "Chapter " + idExtractArray["currentChapter"] 
			}).appendTo(headerdiv);
		}
	}

	var textdiv = document.createElement("div");
	textdiv.className = "textdiv";
	div.appendChild(textdiv);

	var buttondiv = document.createElement("div");
	buttondiv.className = "buttondiv";
	div.appendChild(buttondiv);

	$("<p/>", {
		html : "<b>" + item.en + "</b> (" + item.part + ")"
	}).appendTo(textdiv);

	$("<p/>", {
		html : item.ch_id
	}).appendTo(textdiv);

	// "Add" button
	var addButton = document.createElement("button");
	addButton.innerText = "Add";
	addButton.className = "add";
	$(addButton).bind("click", function() {
		createTimelineElement(item, collection, issection); 
	});
	buttondiv.appendChild(addButton);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection, item);
	})
	buttondiv.appendChild(previewButton);

	return div;	
}





var getSectionChapterByPrefix = function(currentResultsDiv, rElement) {
	if ($(currentResultsDiv).html != "") {
		if ($(rElement).data("collection") == "chapters") {
			var chapterResults = currentResultsDiv.getElementsByTagName("div");
			for (i=0; i<chapterResults.length; i++) {
				if ($(chapterResults[i]).data("collection") == "chapters" && $(chapterResults[i]).data("type") == "chapter" && $(chapterResults[i]).data("chprefix") == $(rElement).data("chprefix")) {
					return chapterResults[i];	// IT'S A MATCH!
				}
			}
			return null;
		}
		else if ($(rElement).data("collection") == "activities") {
			var actResults = currentResultsDiv.getElementsByTagName("div");
			for (i=0; i<actResults.length; i++) {
				if ($(actResults[i]).data("collection") == "activities" && $(actResults[i]).data("type") == "chapter" && $(actResults[i]).data("chprefix") == $(rElement).data("chprefix")) {
					return actResults[i];	// IT'S A MATCH!
				}
			}
			return null;
		}
	}
}




var getFileType = function(ft) {
	if (ft == "gif" || ft == "jpg" || ft == "png") {
		return "Image";
	}
	else if (ft == "mov" || ft == "mp4" || ft == "mp5") {
		return "Video";
	}
	else if (ft == "mp3") {
		return "Audio";
	}
	else if (ft == "EP") {
		return "Game";
	}
	else if (ft == "html") {
		return "Webpage";
	}
	else if (ft == "pdf") {
		return "PDF";
	}
}



var getImgFilepath = function(item, collection) {

	var idExtractArray = extractItemId(item, collection);

	var imgsrc = "";

	if (collection == "chapters" || item.pn != null) {
		var thumbnail_prefix = idExtractArray["currentSubjectFull"].concat("-", idExtractArray["currentGradeNumber"]);
		imgsrc = homedirectory + "content/textbooks/" + idExtractArray["currentGradeFolder"] + "/" + idExtractArray["currentSubjectFull"] + "/" + thumbnail_prefix + "_thumb.jpg";

	}

	else if (collection == "textbooks" || item.subject != null) {
		var thumbnail_prefix = item.fn;
		thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));
		imgsrc = homedirectory + "content/" + item.fp + thumbnail_prefix + "_thumb.jpg";
	}

	else if (collection == "activity" || item.ft != null) {
		var thumbnail_prefix = item.fn;
		if (item.ft == "mp3") {	 //audio
			imgsrc = homedirectory + "content/audio/thumbnail.png";
		} 
		else if (item.ft == "mp4" || item.ft == "mp5") { //video
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));
			imgsrc = homedirectory + "content/videos/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "jpg"  || item.ft == "gif" || item.ft == "png" ) { //picture
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));
			imgsrc = homedirectory + "content/pictures/" + thumbnail_prefix + "_thumb.jpg";
		}
		else if (item.ft == "pdf") { //pdf
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));
			imgsrc = homedirectory + "content/pdfs/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "EP") {
			imgsrc = homedirectory + "content/epaath/activities/" + item.fn + "/thumbnail.jpg";
		} 
		
	}

	// Note: We don't use thumbnails for dictionary.

	return imgsrc;
}




var extractItemId = function(item, collection) {
	
	var elementsArray = [];

	if (collection == "chapters" || item.pn != null) {
		// Array will contain:
			// currentSection
			// currentChapter
			// currentSubject
			// currentGradeNumber
			// currentGradeFolder
			// currentSubjectFull
			// chprefix

		var itemId = item._id;
		var itemId_splitArray = itemId.split("");
		var arr_length = itemId_splitArray.length;

		// Extracts the section number
		if (itemId.indexOf(".") >= 0) {
			var currentSection = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
			elementsArray["currentSection"] = currentSection;
			itemId_splitArray.splice(arr_length-1, 1);
			itemId_splitArray.splice(arr_length-2, 1);
			itemId_splitArray.splice(arr_length-3, 1);
			arr_length = itemId_splitArray.length;
		}

		// Extracts the last 2 numbers as the chapter
		var currentChapter = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
		elementsArray["currentChapter"] = currentChapter;
		itemId_splitArray.splice(arr_length-1, 1);
		itemId_splitArray.splice(arr_length-2, 1);
		arr_length = itemId_splitArray.length;

		if (arr_length == 3) {	// If the subject is EN, or SS (or something with 2 letters)
			var currentSubject = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
			elementsArray["currentSubject"] = currentSubject;
			itemId_splitArray.splice(arr_length-1, 1);
			itemId_splitArray.splice(arr_length-2, 1);
			arr_length = itemId_splitArray.length;
		}
		else if (itemId_splitArray.length == 2) {	// If the subject is M or S, N (or something with 1 letter)
			var currentSubject = itemId_splitArray[arr_length-1];
			elementsArray["currentSubject"] = currentSubject;
			itemId_splitArray.splice(arr_length-1, 1);
			arr_length = itemId_splitArray.length;
		}

		var currentGradeNumber = itemId_splitArray[0];
		elementsArray["currentGradeNumber"] = currentGradeNumber;

		var currentGradeFolder = "Class".concat(currentGradeNumber);
		elementsArray["currentGradeFolder"] = currentGradeFolder;

		if (currentSubject == "EN") {
			var currentSubjectFull = "English";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "M") {
			var currentSubjectFull = "Math";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "N") {
			var currentSubjectFull = "Nepali";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "S") {
			var currentSubjectFull = "Science";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "SS") {
			var currentSubjectFull = "SocialStudies";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		}

		var chprefix = currentGradeNumber.concat(currentSubject,currentChapter);
		elementsArray["chprefix"] = chprefix;
	}

	else if (collection == "textbooks" || item.subject != null) {
		// Array will contain:
			// currentSubject
			// currentGradeNumber
			// currentSubjectFull

		var itemId = item.prefix;
		var itemId_splitArray = itemId.split("");
		var arr_length = itemId_splitArray.length;

		if (arr_length == 3) {	// If the subject is EN, or SS (or something with 2 letters)
			var currentSubject = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
			elementsArray["currentSubject"] = currentSubject;
			itemId_splitArray.splice(arr_length-1, 1);
			itemId_splitArray.splice(arr_length-2, 1);
			arr_length = itemId_splitArray.length;
		}
		else if (itemId_splitArray.length == 2) {	// If the subject is M or S, N (or something with 1 letter)
			var currentSubject = itemId_splitArray[arr_length-1];
			elementsArray["currentSubject"] = currentSubject;
			itemId_splitArray.splice(arr_length-1, 1);
			arr_length = itemId_splitArray.length;
		}

		var currentGradeNumber = itemId_splitArray[0];
		elementsArray["currentGradeNumber"] = currentGradeNumber;

		if (currentSubject == "EN") {
			var currentSubjectFull = "English";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "M") {
			var currentSubjectFull = "Math";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "N") {
			var currentSubjectFull = "Nepali";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "S") {
			var currentSubjectFull = "Science";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "SS") {
			var currentSubjectFull = "SocialStudies";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		}

	}

	

	else if (collection == "activity" || item.ft != null || collection == "dictionary" || item.part != null) {
		// Array will contain:
			// currentSection
			// currentChapter
			// currentSubject
			// currentGradeNumber
			// currentGradeFolder
			// currentSubjectFull
			// chprefix

		var itemId = item.ch_id;
		var itemId_splitArray = itemId.split("");
		var arr_length = itemId_splitArray.length;

		// Extracts the section number
		if (itemId.indexOf(".") >= 0) {
			var currentSection = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
			elementsArray["currentSection"] = currentSection;
			itemId_splitArray.splice(arr_length-1, 1);
			itemId_splitArray.splice(arr_length-2, 1);
			itemId_splitArray.splice(arr_length-3, 1);
			arr_length = itemId_splitArray.length;
		}

		// Extracts the last 2 numbers as the chapter
		var currentChapter = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
		elementsArray["currentChapter"] = currentChapter;
		itemId_splitArray.splice(arr_length-1, 1);
		itemId_splitArray.splice(arr_length-2, 1);
		arr_length = itemId_splitArray.length;

		if (arr_length == 3) {	// If the subject is EN, or SS (or something with 2 letters)
			var currentSubject = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
			elementsArray["currentSubject"] = currentSubject;
			itemId_splitArray.splice(arr_length-1, 1);
			itemId_splitArray.splice(arr_length-2, 1);
			arr_length = itemId_splitArray.length;
		}
		else if (itemId_splitArray.length == 2) {	// If the subject is M or S, N (or something with 1 letter)
			var currentSubject = itemId_splitArray[arr_length-1];
			elementsArray["currentSubject"] = currentSubject;
			itemId_splitArray.splice(arr_length-1, 1);
			arr_length = itemId_splitArray.length;
		}

		var currentGradeNumber = itemId_splitArray[0];
		elementsArray["currentGradeNumber"] = currentGradeNumber;

		var currentGradeFolder = "Class".concat(currentGradeNumber);
		elementsArray["currentGradeFolder"] = currentGradeFolder;

		if (currentSubject == "EN") {
			var currentSubjectFull = "English";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "M") {
			var currentSubjectFull = "Math";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "N") {
			var currentSubjectFull = "Nepali";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "S") {
			var currentSubjectFull = "Science";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		} 
		else if (currentSubject == "SS") {
			var currentSubjectFull = "SocialStudies";
			elementsArray["currentSubjectFull"] = currentSubjectFull;
		}

		var chprefix = currentGradeNumber.concat(currentSubject,currentChapter);
		elementsArray["chprefix"] = chprefix;
	}

return elementsArray;
}




////////////////////////////////////////////// PREVIEW //////////////////////////////////////////////

// When you click the preview button
var preview_result = function(collection, item) {

	$("<p/>", {html : "Loading preview..."}).appendTo("#displaybox");

	var idExtractArray = extractItemId(item, collection);

	if (collection == "chapters") {

		document.querySelector("div#displaybox").innerHTML = '<embed src="' + homedirectory + 'content/textbooks/' + idExtractArray["currentGradeFolder"] + "/" + idExtractArray["currentSubjectFull"] + "/" + idExtractArray["currentSubjectFull"] + "-" + idExtractArray["currentGradeNumber"] + '.pdf#page=' + item.pn + '" width="100%" height="100%" type="application/pdf">';
	}


	else if (collection == "textbooks") {
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
		document.querySelector("div#displaybox").innerHTML = '<object type="text/html" data="' + homedirectory + 'content/epaath/activities/' + item.fn  + '/index.html" style="width:100%; height:100%; margin:1%;"> </object>';
		}
		else if (item.ft=="pdf") {
			document.querySelector("div#displaybox").innerHTML = '<embed src="' + homedirectory + 'content/pdfs/' + item.fn + '" width="100%" height="100%" type="application/pdf">';
		}
		else if (item.ft=="html") {
			// MAKE THIS WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
		}
	}

	else if (collection == "dictionary") {
		$("<p/>", {
			html : item.def
		}).appendTo("#displaybox");
		// document.querySelector("div#displaybox").innerHTML = item.def;
	}


	// Chapter information

	// Video

	// Audio
	
	// Definiton 
	
	// Game
}



////////////////////////////////////////////// SAVE //////////////////////////////////////////////

var save = function(){    
    console.log("saving...");
    var itemIds = [];
    var titleInput = document.getElementById("titleInput").value;
    console.log("title:" + titleInput);
    
    if(titleInput == "") {
    	alert("Lesson plan requires a title before saving.");
    }
    else {
    	console.log("TITLE INPUT IS RUNNING");
	    var timelineDivs = document.getElementsByClassName("timelinediv");
	    var objectId = "";
	    for (var i=0; i<timelineDivs.length; i++) {
	    	objectId = timelineAssArray[$(timelineDivs[i]).data("objid")]._id;
	    	itemIds.push(objectId);
	    }

	    var timeline = {
			timeline_id: getParameterByName("timelineId"),
	   		lesson_title : titleInput,
	   		items_array : itemIds
	   	}

	 	console.log(timeline);

		$.post("../BackEnd/save.php", timeline, function(data) {
			console.log(data);
			console.log("Saved!");
			alert("Your timeline, " + titleInput + ", has been saved!");
		}).fail(function(data){
			console.log(data);
			alert("Your timeline, " + titleInput + ", did NOT save");
		});
	}
}





////////////////////////////////////////////// SORTABLE UI //////////////////////////////////////////////

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




////////////////////////////////////////////// Present button from index  //////////////////////////////////////////////
var indexToPresent = function(){
	timelineId = getParameterByName("timelineId");
	save();
	if(timelineId){
		location.href = "present.html?timelineId=" + timelineId;
	}
	else{
		name = $('#titleInput').val();
		$.getJSON("../BackEnd/timelines.json", function(timelinesJSON) {
			var keys = Object.keys(timelinesJSON);
			var last = keys[keys.length-1];
			console.log("last: " + last);
			console.log(timelinesJSON(last));
			
		});
	}
}

//var indexToPresent = function(){    
//	console.log("opening timeline in present...");
//	var itemIdArray = [];
//
//	var timelineDivs = document.getElementsByClassName("timelinediv");
//
//	var objectId = "";
//	var form = $("<form/>", {
//		method: "post",
//		action: homedirectory + "present.php",
//	});
//
//	for (var i=0; i<timelineDivs.length; i++) {
//		var formInput = $("<input/>", {
//			type : "text",
//			name : "objid",
//			value: $(timelineDivs[i]).data("objid"),
//		});
//
//		form.append(formInput);
//	}
//	form.submit();
//}







