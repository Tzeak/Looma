var timeline2 = document.getElementsByClassName("timelinediv2");

console.log(timeline2);

timelineID ={"$id": getParameterByName("timeID")};

console.log(timelineID);
$.post("../BackEnd/openTimeline.php", timelineID, function(data) {
	//>>>>>>DEBUG
		//console.log(typeof(data));
		data = JSON.parse(data);
		//console.log(typeof(data));
		//console.log(data);
		//console.log(data[0]['fp']);
		//content = data[0].fp
	//Attempt to make regex to find thumbnail - fail
		//var thumbnail = content.match(/[A-Z\-_]+thumb.jpg/gi);

	//Find Thumbnail and add to timeline div
	var img = "<img src='../" + data[0].fp + "English-1_thumb.jpg'>" + "<br/>";
	//This is where I'd put my thumbnail variable, IF IT WORKED X.X 
		//var img = "<img src='../" + data[0].fp + thumbnail + "<br/>";
	
	var title = data[0].dn;

	//print dat shiz
	$(".timelinediv2").html(img + title);
	
});

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
