//console.log(content.library[0].tag);
//console.log(content.library[0].format);

var lib = '{"library":[' +
    '{"format":"textbook", "tag":"Geometry Through the Ages: Chapter 7"},' +
    '{"format":"quiz", "tag":"Grade 6 Math Quiz - Algebra"},' +
    '{"format":"video", "tag":"Chemistry Safety with Bill Nye"},' +
    '{"format":"game", "tag":"Is this letter a vowel?"},' +
    '{"format":"video", "tag":"Napalise with Elise: Chapter 3"} ]}';

var content = JSON.parse(lib);

 console.log(content.library[0].format);


var searchResults = new Object();
	searchResults.module = 'search';
	searchResults.string = "";


var filterResults = new Object(); //APPLY BUTTON FOR FILTER????
	filterResults.module = 'filter';
	filterResults.bbooks = false;
	filterResults.bquiz = true;
	filterResults.bvideos = true;
	filterResults.bgames = true;


	//results from search
	if(searchResults.module  == 'search' ) {
		var i;
		var j;

		console.log(searchResults.module);
		//loop through content

		var searchArray = [];

		for(i = 0; i < content.library.length; i++) { //how to get length of content array?
			var str = content.library[i].tag;
			var find = str.search(searchResults.string);
			//create array
			//console.log(str);
		
			if(find >= 0) { //match was found
				//console.log(content.library[i]);
				searchArray.push(content.library[i]); //how to get content??

				/*for(j=0;j<2;j++) {
					if(find > 0) {
						searchArray[j] = "bananer";
					}
				}*/

			}
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
		console.log(resultArray);


		document.getElementById("results").innerHTML="dog";


	}

