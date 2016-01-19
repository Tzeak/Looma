var lib = '{"library":[' +
    '{"format":"textbook", "tag":"Geometry Through the Ages: Chapter 7"},' +
    '{"format":"quiz", "tag":"Grade 6 Math Quiz - Algebra"},' +
    '{"format":"video", "tag":"Chemistry Safety with Bill Nye"},' +
    '{"format":"game", "tag":"Is this letter a vowel?"},' +
    '{"format":"video", "tag":"Napalise with Elise: Chapter 3"} ]}';

var content = JSON.parse(lib);

var querySearch = function() {	//Query filter every time a filter option is pressed
	console.log('Running filter');

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

	//Construct Results object
	var filterResults = new Object();
		filterResults.module = 'filter';
		filterResults.bbooks = books.checked;
		filterResults.bquiz = quiz.checked;
		filterResults.bvideos = videos.checked;
		filterResults.bgames = games.checked;

		console.log(filterResults);

		//Pass results to results module
		console.log(searchResults);
		//constructResults(results);

	if(searchResults.module  == 'search' ) {
		var i;
		var j;

		//console.log(searchResults.module);
		//loop through content

		var searchArray = [];

		for(i = 0; i < content.library.length; i++) {
			var str = content.library[i].tag;
			var find = str.search(searchResults.string);
			//create array
			//console.log(str);
		
			if(find >= 0) { //match was found
				//console.log(content.library[i]);
				searchArray.push(content.library[i]); //how to get content??



				console.log(content.library[i].tag);
				console.log(content.library[i].format);


				//searchArray.push(content.library[i].tag); 
				/*for(j=0;j<2;j++) {
					if(find > 0) {
						searchArray[j] = "bananer";
					}
				}*/

			}
			document.getElementById("results").innerHTML = searchArray[0];


		}	

		//console.log(searchArray);
		//console.log(searchArray[1]);

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
		//console.log(resultArray);


	
}
}
	

