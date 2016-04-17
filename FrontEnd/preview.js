var library2 = [
//Video FILE mp4
    {
		"_id" : "ObjectId('568dcdda9324a6f91e741082')",
		"ch_id" : "1EN01",
		"ft" : "mp4",
		"MB" : 7.6,
		"min" : "1:32",
		"fn" : "Sesame_Street_Alphabet.mp4",
		"dn" : "Sesame Street Alphabet"
    },
//AUDIO FILE mp3
    {
	    "_id" : "ObjectId('568dcdda9324a6f91e74108f')",
		"ch_id" : "2EN01",
		"ft" : "mp3",
		"MB" : 3,
		"fn" : "Classroom_Song.mp3",
		"dn" : "Classroom Song"
    },
//GAME FILE
    {
		"_id" : "ObjectId('568dcdda9324a6f91e741084')",
		"ch_id" : "1EN02",
		"ft" : "EP",
		"fn" : 3122231,
		"dn" : "EP Colour Identification"
    },
//PICTURE FILE
    {
	    "_id" : "ObjectId('568dcdda9324a6f91e74108a')",
		"ch_id" : "1EN10",
		"ft" : "jpg",
		"MB" : 0.1,
		"fn" : "image.jpg",
		"dn" : "Family Tree 1"
    },
//ENGLISH TEXTBOOK
    {
	    "_id" : "ObjectId('568dcdf19324a6f91e74131d')",
		"class" : "class1",
		"subject" : "english",
		"prefix" : "1EN",
		"fn" : "English-1.pdf",
		"fp" : "textbooks/Class1/English/",
		"dn" : "Class 1 English",
		"ndn" : "कक्षा 1 अन्ग्रेगी",
		"ch_id" : "1EN10"
    },
//NEPALI TEXTBOOK
    {
	 	"_id" : "ObjectId('568dcdf19324a6f91e74131e')",
		"class" : "class1",
		"subject" : "nepali",
		"prefix" : "1N",
		"nfn" : "Nepali-1.pdf",
		"fp" : "textbooks/Class1/English/",
		"dn" : "Class 1 Nepali",
		"ndn" : "कक्षा 1 नेपाली",
		"ch_id" : "1EN10"
    },
//English AND nepali TEXTBOOK
    {
		"_id" : "ObjectId('568dcdf19324a6f91e74131f')",
		"class" : "class1",
		"subject" : "math",
		"prefix" : "1M",
		"fn" : "Math-1.pdf",
		"nfn" : "Math-1-Nepali.pdf",
		"fp" : "textbooks/Class1/English/",
		"dn" : "Class 1 Math",
		"ndn" : "कक्षा 1 गणित",
		"ch_id" : "1EN10"
    },
    //DICTIONARY
    {
		"_id" : "ObjectId('5690154a9324a6f91e7429a0')",
		"ch_id" : "1EN01",
		"en" : "four",
		"np" : "चार",
		"part" : "noun",
		"def" : "four - noun   being one more than three; noun the cardinal number that is the sum of three and one",
		"hom" : "for, fore",
		"rand" : 0.04336044892825207
    },
// CHAPTER
    {
    	"_id" : "1M10",
		"pn" : 30,
		"npn" : 28,
		"dn" : "Addition and Subtraction up to 9",
		"ndn" : "९ सम्मको जोड र घटाउ",
		"ch_id" : "1EN10"
    },
];


function loadTimelineDivs() {
	var timelineDivs = document.getElementsByClassName("timelinediv");

	  	// add each timeline item to each timelinediv
	  	for (var i = 0; i < timelineDivs.length; i++) {
	  			console.log("inserting into box# " + i);
	  			timelineDivs[i].innerText="Title:" + library2[i].dn + "  file type:" + library2[i].ft;
	  			//timelineDivs[i].onclick=preview(i);
	  			timelineDivs[i].onclick = (function() {
			      var currentI = i;
			      return function() { 
			          preview(currentI);
      }
   })();
	  	}

}

function preview(i) {
	// var ft = null;
	// var subject =null;
	// var part = null;
	

	/*media type variables*/
	console.log("calling preview function for item number" + i);

	var pn = 3;
	var pdf = "test.pdf";
	var audio = "media/audio.mp3";
	var video = "media/video.mp4";

	// var timelineBox = document.getElementsByClassName("timelinediv")[i];
	// timelineBox.id = "timelineBox";
	// console.log(timelineBox.innerHTML);
	
	console.log(library2[i]);
	/*video*/
	if(library2[i].ft == "mp4") {
		document.querySelector("div#displaybox").innerHTML = '<video width="100%" height="100%" controls> <source src="' + video + '" type="video/mp4"> </video>';
		// var newParagraph = document.createElement("p");
		// newParagraph.innerText = "media type: video";
		// document.querySelector("div#timelineBox").appendChild(newParagraph);
	}
	/*audio*/
	else if(library2[i].ft=="mp3") {
		document.querySelector("div#displaybox").innerHTML = '<audio controls> <source src="' + audio + '" type="audio/mpeg"></audio>';
	}
	/*picture*/
	else if(library2[i].ft=="jpg") {
		document.querySelector("div#displaybox").innerHTML = '<img src="media/' + library2[i].fn + '"id="displayImage">';
	}
	/*PDF */
	else if(library2[i].subject!=null) {
		document.querySelector("div#displaybox").innerHTML = '<embed src="' + pdf + '" width="100%" height="100%" type="application/pdf">';
	}
	/*Definition*/
	else if(library2[i].part!=null) {
		document.querySelector("div#displaybox").innerHTML = library2[i].def;
	}
	/*chapter (page number of textbook)*/
	else if(library2[i].pn!=null) {
		document.querySelector("div#displaybox").innerHTML = '<embed src="test.pdf#page=' + pn + '" width="100%" height="100%" type="application/pdf">';
	}
	else
		document.querySelector("div#displaybox").innerHTML = '<p> cannot display media file YET -- file type: EP">';

}