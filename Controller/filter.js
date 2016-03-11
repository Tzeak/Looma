var sendFilter = function() {

	var grades = $(".grade");
	var subjects = $(".subject");
	var data = new Object();
	var results = new Object();

	for(var i = 0; i < grades.length; i++)
	{
		if(grades[i].checked)
		{
		   alert(i+1 +  " is checked");
		   data.grade = i+1;
		}
	}
	
	for(var i = 0; i < subjects.length; i++)
	{
		if(subjects[i].checked)
		{
			//attach to data - call media type
			alert(subjects[i].name);
		}
	}
};
var mediaType = function() {
	var media = $(".media");
	for(var i = 0; i < media.length; i++)
	{
		if(media[i].checked)
		{
			data.ft = media[i].name; //This won't work - needs a scalable solution
			//POST request to mongo query.php
		}




