//temporary variable
<script language = "javascript" >

var content = {"library":[
    {"format":"textbook", "tag":"Geometry Through the Ages: Chapter 7"},
    {"format":"quiz", "tag":"Grade 6 Math Quiz - Algebra"},
    {"format":"video", "tag":"Chemistry Safety with Bill Nye"},
    {"format":"game", "tag":"Is this letter a vowel?"},
    {"format":"textbook", "tag":"Napalise with Elise: Chapter 3"}
]};

var searchResults = new Object();
	results.module = 'search';
	results.string = searchString;

var filterResults = new Object(); //APPLY BUTTON FOR FILTER????
	results.module = 'filter';
	results.bbooks = true;
	results.bquiz = true;
	results.bvideos = true;
	results.bgames = true;

var constructResults = function(content) {
	
	//results from search
	if(results.module  === 'search' && searchResults.string != null) {
		var i;
		var j;
		var resultArray = [];
		//loop through content
		for(i = 0; i < library.length; i++) { //how to get length of content array?
			var str = content.library[i].tag;
			var find = str.search(searchString);
			//create array
			var searchArray = [];
			if(find > 0) { //match was found
				searchArray.push(content.library[i]); //how to get content??
			}
		}	
		for(j=0; j < searchArray.length; j++) {
			if(searchArray[j].format == "textbook" && results.bbooks == true) {
				consule.log(content.library[j].tag);
			}
			if(content.library[j].format == "quiz" && results.bquiz == true) {
				//list results
			}
			if(content.library[j].format == "video" && results.bvideos == true) {
				//list results
			}
			if(content.library[j].format == "game" && results.bgames == true) {
				//list results
			}
		}
	}
	//results from filter
	if (searchResults.searchString == null) {
		if(results.bbooks == true) {
			//list results
		}
		if(results.bquiz == true) {
			//list results
		}
		if (results.bvideos == true) {
			//list results
		}
		if (results.bgames == true) {
			//list results
		}
	}

	</script>
}
