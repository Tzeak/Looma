/* search */
var querySearch = function() {

var searchString = document.getElementById("string").value;



//construct Results JSON object
var results = new Object();
	results.module = 'search';
	results.string = searchString;

console.log(results);
	
}

//filter
var queryFilter = function() {	//Query filter every time a filter option is pressed
	console.log('Running filter');

	//Read all checkboxes in filter
	var books = document.getElementById('Books');
	var quiz = document.getElementById('Quiz');
	var videos = document.getElementById('Videos');
	var games = document.getElementById('Games');

	//Construct Results object
	var results = new Object();
		results.module = 'filter';
		results.bbooks = books.checked;
		results.bquiz = quiz.checked;
		results.bvideos = videos.checked;
		results.bgames = games.checked;

	//Pass results to results module
	console.log(results);
	//constructResults(results);
	
}
