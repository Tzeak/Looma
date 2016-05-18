


/////////////////////////// INITIALIZING THINGS ///////////////////////////


var timelineAssArray = new Object();

var homedirectory = "../";







/////////////////////////// ONLOAD FUNCTION ///////////////////////////

// This loads all the preliminary elements in the page.
window.onload = function loadPageElements() {

		// Navbar 

		$("<p/>", {
			html : "Lesson Plan Creator: Edit"
		}).appendTo("#navbar");

		// Sidebar: Search

		$("<div/>", {
			id : "div_search"
		}).appendTo("#div_filter");
		$("<p/>", {
			class : "filter_label",
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

		// Sidebar: Chapter

		$("<div/>", {
			id : "div_chapter"
		}).appendTo("#div_filter");

		$("<p/>", {
			class : "filter_label",
			html : "Chapter: ", 
		}).appendTo("#div_chapter");

		$("<select/>", {
			class : "filter_dropdown",
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
			class : "filter_label",
			html : "Section: ", 
		}).appendTo("#div_section");

		$("<select/>", {
			class : "filter_dropdown",
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
		 		class : "filter_checkbox",
		    	type : "checkbox",
		    	style : "zoom:1.5",
		    	id : value.id,
		        name : key,
		        // html : value.display
	    	}).appendTo("#div_filetypes");
	    	$("<label/>", { 
	    		class : "filter_label",
		    	for : value.id,
		    	html : value.display
	    	}).appendTo("#div_filetypes");
	    	//$("#div_filetypes").append("<br/>");
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
			onclick : "querySearch()",
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

		openTimeline();
}


var addToAssArray = function(object) {
	timelineAssArray[object._id] = object;
}


//////////////////////////// SUBMIT LESSON TITLE NAME ///////////////////////

// var findTitleName = function() {
// 	var timelength = timelines.length;
// 	for (var i=0; i<timelength; i++) {
// 		if (timelines[i])
// 	}
// }




/////////////////////////// TIMELINE MANIPULATION //////////////////////////
//***********************************************************************things we need for present**********************************************************************************************

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

	addToAssArray(object);
	console.log(timelineAssArray);

	// if($(innerdiv).has("h3")){
	// 	$("h3").remove();
	// }

	// Remove "resultitem" class from div
	$(innerdiv).removeClass("resultitem");
	$(innerdiv).addClass("innerdiv");
	// $(innerdiv).removeElement

	var timelinediv = $("<div/>", {class:"timelinediv"}).appendTo("#timelineDisplay");
	$(innerdiv).appendTo(timelinediv);
 	$(timelinediv).attr("data-objid", object._id);
 	// console.log(timelinediv.className);
 	$(".timelinediv button.add").remove();
	var removebutton = $("<button/>", {class: "remove", html:"Remove"}).bind("click", removeTimelineElement);
	$(innerdiv).append(removebutton);

	sortableFunction();
}


 

var removeTimelineElement = function() {
  // Removing list item from timelineHolder
  var timelineItem = this.parentNode;
  timelineItem.parentNode.remove();
}	

//***********************************************************************end of things we need for present**********************************************************************************************










/////////////////////////// QUERY / RESULTS ///////////////////////////

// var resultArray = [];

var clearFilter = function() {
	 // $("#div_filter").each(function() { this.selectedIndex = 0 });
	 $(".filter_dropdown").each(function() {
	 	this.selectedIndex = 0
	 });
	 $(".filter_checkbox").each(function() {
	 	$(this).prop("checked", false);
	 })
}

var querySearch = function() {
	
	//check if filter/search items are empty upon submitting query, and give an alert if they are
	var count=0;

	if($("#searchString").val().length > 0) {
		count ++;
	}

	$(".filter_dropdown").each(function() {
		if(this.selectedIndex != 0){
			count++;
		}
	 });
	 $(".filter_checkbox").each(function() {
		if ($(this).prop('checked')==true){ 
	 		count++;
	 	}
	 });

	 if (count == 0) {
	 	alert("Please enter a search or filter query before submitting.");
	 }
	 else {
	 	console.log("count = " + count);
	 }

	 //check if chapter is selected, and display section dropdown if it is
	// if($("#dropdown_chapter").prop('checked') == true){
	// 	$("#dropdown_section").show();
	// 	console.log("need to show dropdown");
	// }

	$("#innerResultsDiv").empty();
	$("#innerResultsMenu").empty();



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

			// var chapterResults = chapterResultDiv.getElementsByTagName("*");

			// for (i=0; i<chapterResults.length; i++) {
			// 	console.log($(chapterResults[i]).data("chprefix"));
			// 	// if ($(chapterResults[i]).data("chprefix") == $(rElement).data("chprefix")) {
			// 	// 	console.log("IT'S A MATCH!!!!!!!");
			// 	// 	// append to chapterResults[i]
			// 	// }
			// 	// search through and check ch prefixes 
			// }
			// var sectionChapterDiv = document.getElementBy
		}
		// var rElement = createChapterDiv(resultArray[i]);
		
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
		var rElement = createDictionaryDiv(filterdata_object.dictionary[i])
		// var rElement = createChapterDiv(resultArray[i]);
		dictResultDiv.appendChild(rElement);
	}

	// Create inner results menu
	$("<a/>", {
		href : "#textbooks",
		html : "Textbooks "
	}).appendTo("#innerResultsMenu");
	$("<a/>", {
		href : "#chapters",
		html : "Chapters "
	}).appendTo("#innerResultsMenu");
	$("<a/>", {
		href : "#activities",
		html : "Activities "
	}).appendTo("#innerResultsMenu");
	$("<a/>", {
		href : "#dictionary",
		html : "Dictionary "
	}).appendTo("#innerResultsMenu");
	$("#innerResultsMenu").css("border-bottom","1px solid #000");

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


/* //////////////////////TO-DO FOR RESULTS

THUMBNAILS
- Take care of if the image source is null
	- 	All the "thumbnail_prefix" variables: If the image source is null, 
		it shouldn't try to get the substring, because it'll break the code
	- 	If the file isn't there. We need to make a little 404 image and
		code it in.

//////////////////////////END TO-DO */
//*************************************************************************************start of things we need for presentation **********************************************

var extractItemId = function(item, collection) {
	
	var elementsArray = [];

	if (collection == "chapters") {
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

	else if (collection == "textbooks") {
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

	

	else if (collection == "activities" || collection == "dictionary") {
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

/*
	else if (collection == "dictionary") {
		// Array will contain:
			// currentChapter
			// currentSubject
			// currentGradeNumber
			// currentGradeFolder
			// currentSubjectFull
			// chprefix

		var itemId = item.ch_id;
		console.log("current id: " + item.ch_id);
		var itemId_splitArray = itemId.split("");
		var arr_length = itemId_splitArray.length;

		// Extracts the last 2 numbers as the chapter
		var currentChapter = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
		elementsArray["currentChapter"] = currentChapter;
		console.log("current chapter: " + currentChapter);
		itemId_splitArray.splice(arr_length-1, 1);
		itemId_splitArray.splice(arr_length-2, 1);
		arr_length = itemId_splitArray.length;

		if (arr_length == 3) {	// If the subject is EN, or SS (or something with 2 letters)
			var currentSubject = itemId_splitArray[arr_length-2].concat(itemId_splitArray[arr_length-1]);
			elementsArray["currentSubject"] = currentSubject;
			console.log("current subject: " + currentSubject);
			itemId_splitArray.splice(arr_length-1, 1);
			itemId_splitArray.splice(arr_length-2, 1);
			arr_length = itemId_splitArray.length;
		}
		else if (itemId_splitArray.length == 2) {	// If the subject is M or S, N (or something with 1 letter)
			var currentSubject = itemId_splitArray[arr_length-1];
			elementsArray["currentSubject"] = currentSubject;
			console.log("current subject: " + currentSubject);
			itemId_splitArray.splice(arr_length-1, 1);
			arr_length = itemId_splitArray.length;
		}

		var currentGradeNumber = itemId_splitArray[0];
		elementsArray["currentGradeNumber"] = currentGradeNumber;
		console.log("current grade number: " + currentGradeNumber);

		var currentGradeFolder = "Class".concat(currentGradeNumber);
		elementsArray["currentGradeFolder"] = currentGradeFolder;
		console.log("current grade folder: " + currentGradeFolder);

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
*/

return elementsArray;
}







// Create "Textbook" collection results
var createTextbookDiv = function(item) {
	var collection = "textbooks";
	var resultdiv = document.createElement("div");
	resultdiv.className = "resultitem";

	// Thumbnail
	var thumbnaildiv = document.createElement("div");
	thumbnaildiv.className = "thumbnaildiv";
	$(thumbnaildiv).appendTo(resultdiv);
	var thumbnail_prefix = item.fn;
	thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));
	$("<img/>", {
		class : "resultsimg",
		src : homedirectory + "content/" + item.fp + thumbnail_prefix + "_thumb.jpg"
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
		createTimelineElement(item); 
	});
	$(addButton).appendTo(buttondiv);

	var previewButton = document.createElement("button");
	previewButton.innerText = "Preview";
	previewButton.className = "preview";
	// previewButton.onclick = preview_result(item);
	$(previewButton).bind("click", function() {
		preview_result(collection, item);
	})
	$(previewButton).appendTo(buttondiv);

	return resultdiv;
}









// Create "Chapter" collection results
var createChapterDiv = function(item, previtem) {
	var collection = "chapters";

	var idExtractArray = extractItemId(item, collection);
	if (previtem != null) {
		var idExtractArray_prev = extractItemId(previtem, collection);
	}

	if (previtem != null) {
		if (item._id.indexOf(".") >= 0) {
			//	If the prefix is equal to the prefix before it
			if (idExtractArray["chprefix"] == idExtractArray_prev["chprefix"]) {
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
					createTimelineElement(item); 
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

	var div = document.createElement("div");
	div.className = "resultitem";
	// var div = $("<div/>", {class:"resultitem"});

	
	$(div).attr("data-chprefix", idExtractArray["chprefix"]);
	$(div).attr("data-type", "chapter");
	$(div).attr("data-collection", collection);


	var thumbnail_prefix = idExtractArray["currentSubjectFull"].concat("-", idExtractArray["currentGradeNumber"]);
	// ADD AN IF STATEMENT FOR IF THE VALUES DONT EXISTTTTT ???

	var image = document.createElement("img");
	image.className = "resultsimg";
	image.src = homedirectory + "content/textbooks/" + idExtractArray["currentGradeFolder"] + "/" + idExtractArray["currentSubjectFull"] + "/" + thumbnail_prefix + "_thumb.jpg";
	div.appendChild(image);

	// Display name
	$("<p/>", {
		class : "result_dn",
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









var createActivityDiv = function(item, previtem) {
	var collection = "activities";

	var idExtractArray = extractItemId(item, collection);
	if (previtem != null) {
		var idExtractArray_prev = extractItemId(previtem, collection);
	}

	var div = document.createElement("div");
	$(div).attr("data-chprefix", idExtractArray["chprefix"]);
	$(div).attr("data-type", "section");
	$(div).attr("data-collection", collection);

	var sectionActivityDiv = function(item) {
		var sectionDiv = document.createElement("div");
		sectionDiv.className = "result_activity_section";
		$(sectionDiv).attr("data-chprefix", idExtractArray["chprefix"]);
		$(sectionDiv).attr("data-type", "section");
		$(sectionDiv).attr("data-collection", collection);
		// console.log("prefix for item " + item.dn + " is " + $(sectionDiv).data('chprefix'));

		// Thumbnail
		var image = document.createElement("img");
		if (item.ft == "mp3") {	 //audio
			image.className = "resultsimg";
			image.src = homedirectory + "content/audio/thumbnail.png";
		} 
		else if (item.ft == "mp4" || item.ft == "mp5") { //video
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/videos/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "jpg"  || item.ft == "gif" || item.ft == "png" ) { //picture
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/pictures/" + thumbnail_prefix + "_thumb.jpg";
		}
		else if (item.ft == "pdf") { //pdf
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/pdfs/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "EP") {
			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/epaath/activities/" + item.fn + "/thumbnail.jpg";
		} 
		$(image).css("width","140");
		sectionDiv.appendChild(image);

		$("<p/>", {
			html : item.ch_id
		}).appendTo(sectionDiv);

		$("<p/>", {
			class : "result_dn",
			html : "<b>" + item.dn + "</b><br/>Chapter " + idExtractArray["currentChapter"] + ", Section " + idExtractArray["currentSection"]
		}).appendTo(sectionDiv);

		// File Type
		if (item.ft == "gif" || item.ft == "jpg" || item.ft == "png") {
			$("<p/>", {
				class : "result_ft",
				html : "Image // " + item.ft
			}).appendTo(sectionDiv);
		}
		else if (item.ft == "mov" || item.ft == "mp4" || item.ft == "mp5") {
			$("<p/>", {
				class : "result_ft",
				html : "Video // " + item.ft
			}).appendTo(sectionDiv);
		}
		else if (item.ft == "mp3") {
			$("<p/>", {
				class : "result_ft",
				html : "Audio // " + item.ft
			}).appendTo(sectionDiv);
		}
		else if (item.ft == "EP") {
			$("<p/>", {
				class : "result_ft",
				html : "Game // " + item.ft
			}).appendTo(sectionDiv);
		}
		else if (item.ft == "html") {
			$("<p/>", {
				class : "result_ft",
				html : "Webpage // " + item.ft
			}).appendTo(sectionDiv);
		}
		else if (item.ft == "pdf") {
			$("<p/>", {
				class : "result_ft",
				html : "Page // " + item.ft
			}).appendTo(sectionDiv);
		}

		var addButton = document.createElement("button");
		addButton.innerText = "Add";
		addButton.className = "add";
		// addButton.onclick = createTimelineElement(item);
		$(addButton).bind("click", function() {
			createTimelineElement(item); 
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

	var chapterActivityDiv = function(item) {
		var chapterDiv = document.createElement("chapterDiv");
		
		$(chapterDiv).attr("data-chprefix", idExtractArray["chprefix"]);
		$(chapterDiv).attr("data-type", "chapter");
		$(chapterDiv).attr("data-collection", collection);

		// Thumbnail
		var image = document.createElement("img");
		if (item.ft == "mp3") {	 //audio
			image.className = "resultsimg";
			image.src = homedirectory + "content/audio/thumbnail.png";
		} 
		else if (item.ft == "mp4" || item.ft == "mp5") { //video
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/videos/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "jpg"  || item.ft == "gif" || item.ft == "png" ) { //picture
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/pictures/" + thumbnail_prefix + "_thumb.jpg";
		}
		else if (item.ft == "pdf") { //pdf
			var thumbnail_prefix = item.fn;
			thumbnail_prefix = thumbnail_prefix.substr(0, thumbnail_prefix.indexOf('.'));

			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/pdfs/" + thumbnail_prefix + "_thumb.jpg";
		} 
		else if (item.ft == "EP") {
			var image = document.createElement("img");
			image.className = "resultsimg";
			image.src = homedirectory + "content/epaath/activities/" + item.fn + "/thumbnail.jpg";
		} 

		$(image).css("width","140");
		// else {
		// 	var image = document.createElement("img");
		// 	image.className = "resultsimg";
		// 	image.src = "images/kitty.jpg";
		// }
		chapterDiv.appendChild(image);

		// ID
		$("<p/>", {
			class : "result_ID",
			html : item.ch_id
		}).appendTo(chapterDiv);

		// Display Name
		$("<p/>", {
			class : "result_dn",
			html : "<b>" + item.dn + "</b>"
		}).appendTo(chapterDiv);

		// File Type
		if (item.ft == "gif" || item.ft == "jpg" || item.ft == "png") {
			$("<p/>", {
				class : "result_ft",
				html : "Image // " + item.ft
			}).appendTo(chapterDiv);
		}
		else if (item.ft == "mov" || item.ft == "mp4" || item.ft == "mp5") {
			$("<p/>", {
				class : "result_ft",
				html : "Video // " + item.ft
			}).appendTo(chapterDiv);
		}
		else if (item.ft == "mp3") {
			$("<p/>", {
				class : "result_ft",
				html : "Audio // " + item.ft
			}).appendTo(chapterDiv);
		}
		else if (item.ft == "EP") {
			$("<p/>", {
				class : "result_ft",
				html : "Game // " + item.ft
			}).appendTo(chapterDiv);
		}
		else if (item.ft == "html") {
			$("<p/>", {
				class : "result_ft",
				html : "Webpage // " + item.ft
			}).appendTo(chapterDiv);
		}
		else if (item.ft == "pdf") {
			$("<p/>", {
				class : "result_ft",
				html : "Page // " + item.ft
			}).appendTo(chapterDiv);
		}

		// "Add" button
		var addButton = document.createElement("button");
		addButton.innerText = "Add";
		addButton.className = "add";
		$(addButton).bind("click", function() {
			createTimelineElement(item); 
		});
		chapterDiv.appendChild(addButton);

		var previewButton = document.createElement("button");
		previewButton.innerText = "Preview";
		previewButton.className = "preview";
		// previewButton.onclick = preview_result(item);
		$(previewButton).bind("click", function() {
			preview_result(collection, item);
		})
		chapterDiv.appendChild(previewButton);

		return chapterDiv;
	}

	// If this item is the first item
	if (previtem == null) {
		// Create h3 Chapter element
		$("<h3/>", { 
			html : "Chapter " + idExtractArray["currentChapter"] 
		}).appendTo(div);

		// If the item ID has a decimal
		if (item.ch_id.indexOf(".") >= 0) {
			// Create a section div & append to main div
			var sectionDiv = sectionActivityDiv(item);
			$(sectionDiv).appendTo(div);
		}
		// Else if the item ID doesn't have a decimal
		else {
			// Create a chapter div & append to main div
			var chapterDiv = chapterActivityDiv(item);
			$(chapterDiv).appendTo(div);
		}
	}
	// If this item isn't the first item
	else if (previtem != null) {
		// If the item  ID has a decimal
		if (item.ch_id.indexOf(".") >= 0) {
			// If the ID prefix matches the prefix of the last one
			if (idExtractArray["chprefix"] == idExtractArray_prev["chprefix"]) {
				//	Make a raw section div
				var sectionDiv = sectionActivityDiv(item);
				$(sectionDiv).appendTo(div);
			}
			// Else if the ID prefix doesn't match the last one
			else if (idExtractArray["chprefix"] != idExtractArray_prev["chprefix"]) {
				// Create h3 Chapter element
				$("<h3/>", { 
					html : "Chapter " + idExtractArray["currentChapter"] 
				}).appendTo(div);
				var sectionDiv = sectionActivityDiv(item);
				$(sectionDiv).appendTo(div);
			}
		}
		// Else if the item ID doesn't have a decimal
		else {
			// Create h3 Chapter element
			$("<h3/>", { 
				html : "Chapter " + idExtractArray["currentChapter"] 
			}).appendTo(div);
			var chapterDiv = chapterActivityDiv(item);
			$(chapterDiv).appendTo(div);

		}
	}



	return div;
}







var createDictionaryDiv = function(item) {
	var collection = "dictionary";

	var idExtractArray = extractItemId(item, collection);

	var div = document.createElement("div");
	div.className = "resultitem";

	var image = document.createElement("img");
	image.className = "resultsimg";
	image.src = homedirectory + "content/dictionaries/thumbnail.png";
	div.appendChild(image);

	var loomaID = document.createElement("p");
	loomaID.className = "result_ID";
	loomaID.innerHTML = "<b>ID: </b>" + item.ch_id;
	div.appendChild(loomaID);

	var resulttype = document.createElement("p");
	resulttype.className = "result_ID";
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









/////////////////////////// PREVIEW ///////////////////////////

// When you click the preview button
var preview_result = function(collection, item) {

	var idExtractArray = extractItemId(item, collection);

	if (collection == "chapters") {

		document.querySelector("div#displaybox").innerHTML = '<embed src="' + homedirectory + 'content/textbooks/' + idExtractArray["currentGradeFolder"] + "/" + idExtractArray["currentSubjectFull"] + "/" + idExtractArray["currentSubjectFull"] + "-" + idExtractArray["currentGradeNumber"] + '.pdf#page=' + item.pn + '" width="100%" height="100%" type="application/pdf">';
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
		document.querySelector("div#displaybox").innerHTML = '<object type="text/html" data="' + homedirectory + 'content/epaath/activities/' + item.fn  + '/index.html" style="width:100%; height:100%; margin:1%;"> </object>';
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
//*********************************************************************** end of things we need for present **********************************************************************************************



/////////////////////////// SAVE ///////////////////////////

var save = function(){    
    console.log("saving...");
    var itemIds = [];
    var titleInput = document.getElementById("titleInput").value;
    console.log("title:" + titleInput);
    
    if(titleInput == "") {
    	alert("Lesson plan requires a title before saving.");
    }
    else {
	    // var timelineDivs = document.getElementsByClassName("timelinediv");
	    // for (var i = 0; i < timelineDivs.length; i++) {

	    // 	if((document.getElementsByClassName("timelinediv")[i].lastElementChild)!=null) {
		   //  	var x = document.getElementsByClassName("timelinediv")[i].lastElementChild;
		   //  	var index = x.getAttribute("index");
		   //  	console.log("index : " + index);
		   //  	objectId=resultArray[index]._id;
		   //  	//var y = timelineDivs[i].document.getElementById("name").outerText;
		   //  	console.log("item: " + objectId);
		   //  	itemIds.push(objectId);
	    // 	}

	     var timelineDivs = document.getElementsByClassName("timelinediv");
	     var objectId = "";
	     for (var i=0; i<timelineDivs.length; i++) {
	     	objectId = timelineAssArray[$(timelineDivs[i]).data("objid")]._id;
	     	itemIds.push(objectId);
	     }

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
		}).fail(function(data){
			console.log(data);
		});
		alert("Your timeline, " + titleInput + ", has been saved!");

}


////////////////////////// Present button from index  /////////////////////////////

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




