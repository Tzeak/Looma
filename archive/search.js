var querySearch = function() {

console.log('Running search');

var searchString = document.getElementById("string").value;



//construct Results JSON object
var results = new Object();
	results.module = 'search';
	results.string = searchString;

console.log(results);
	
}