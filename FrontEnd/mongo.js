var timeline2 = document.getElementsByClassName("timelinediv2");

console.log(timeline2);

timelineID ={"$id": getParameterByName("timeID")};

console.log(timelineID);
$.post("../BackEnd/openTimeline.php", timelineID, function(data) {
		data = JSON.parse(data);
		
	//Attempt to make regex to find thumbnail - fail
		//var thumbnail = content.match(/[A-Z\-_]+thumb.jpg/gi);

	//for(var i = 0; i < data.legnth; i++) {
		console.log(data);
		var img = "<img src='../" + data[i].fp + "English-" + (i+1) + "_thumb.jpg'>" + "<br/>";
		var title = data[i].dn;
		$("#time" + (i+1)).html(img + title);
	//}
	//This is where I'd put my thumbnail variable, IF IT WORKED X.X 
		//var img = "<img src='../" + data[0].fp + thumbnail + "<br/>";
	

	//print dat shiz
	
});

function getParameterByName(name) {
	var match = RegExp('[?&]' + name + '=([^&]*)').exec(window.location.search);
	return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}
