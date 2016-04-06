
        $(document).ready(function () {
            $("#timelineWhole").sortable({
            //$('#btnSave').hide();
                opacity: 0.7,
                revert: true,   //Animates
                scroll: true,   //Allows page to scroll when dragging. Good for tall pages.
                handle: $(".timelinediv"),
                update: function () {  
                	$('#btnSave').show() 
            	}
            });

        })

var clearResults = function() {  
    var ul = document.getElementById("resultsDivUL");
    console.log("existing results:" + ul.childNodes.length);


    if(ul.childNodes.length > 0) {
        var children = ul.querySelectorAll("li");
    }

        //THIS IS NOT WORKING-- supposed to delete existing content
        //replace array name with array.prototype?
    Array.prototype.forEach.call(children,function(node) {
        node.parentNode.removeChild(node);
    });
}

var addJSON = function() {

    console.log("hello!!!");
    // Clone current list item
    var listItem = this.parentNode;
    var newListItem = listItem.cloneNode(true);

    // Change button class to "remove"
    newListItem.querySelector("button.add").classList.remove("add");
    newListItem.querySelector("button").classList.add("remove");

    // Modify new "remove" button
    var newRemoveButton = newListItem.querySelector("button.remove");
    newRemoveButton.innerText = "Remove";
    newRemoveButton.addEventListener("click", removeJSON);

    // Append newListItem to first empty div using checkDivsEmpty()
    var nextEmptyDiv = checkDivsEmpty();

    if (nextEmptyDiv === "none") {
    alert ("No empty divs");
    } else {
    console.log("Adding new list item to timeline...");
    nextEmptyDiv.appendChild(newListItem);
    }
}

var removeJSON = function() {
      console.log("Removing list item from timeline...");

      // Removing list item from timelineHolder
      var listItem = this.parentNode;
      listItem.remove();
    }   


var checkDivsEmpty = function() {
      console.log("Checking for first empty timeline div...");

      // Gather all timeline divs so we can traverse through them
      var timelineDivs = document.getElementsByClassName("timelinediv");


      // Traverse through timeline divs and check for first empty div
      for (var i = 0; i < timelineDivs.length; i++) {
        if (timelineDivs[i].innerHTML === "") {
          return timelineDivs[i];
        } 
  }
  return "none";
}   

//Load JSON objects into Results div
var loadJSON = function() {

      console.log("Loading JSON objects into Results div...");

      for(i=0;i<resultArray.length; i++)
      {
        var rElement = createNewListElement(resultArray[i]);
        resultsUL.appendChild(rElement);
      }
}

// Create new list items for results div
var createNewListElement = function(itemString) {
      var listItem = document.createElement("li");
      
        //id for li element
        var id = document.createAttribute("id"); 
        id.value = "item";           
        listItem.setAttributeNode(id);

        //index attribute for li element (to access resultArray[index] info after the item is moved around in the timeline)
        var num = document.createAttribute("index");      
        num.value = i;    
        listItem.setAttributeNode(num);

        //attributes to list items for when we add preview feature
        var filetype = document.createAttribute("data-ft");   
        filetype.value = resultArray[i].ft; 
        listItem.setAttributeNode(filetype);

        var filepath = document.createAttribute("data-fp");   
        filepath.value = resultArray[i].fp; 
        listItem.setAttributeNode(filepath);

        var filename = document.createAttribute("data-fn");       
        filename.value = resultArray[i].dn;         
        listItem.setAttributeNode(filename);


        //create label element for displaying content display name/info   
        var listLabel = document.createElement("label");

        //id for label element
        var id = document.createAttribute("id");  
        id.value = "name";         
        listLabel.setAttributeNode(id);


        //image element for thumbnail photo 
        var thumbnail = document.createElement("img");
        
        //add button to add list item from results div to timeline
        var addButton = document.createElement("button");
        addButton.innerText = "Add";
        addButton.className = "add";

      
        //access thumbnail image using filepath in json object
        console.log("filepath exists?" + resultArray[i].fp);
        var att = document.createAttribute("src");
        if(resultArray[i].fp != null) {
            

            //attempting ajax for getting image filename (BUT THIS SHIT DOESN'T WORK)
            /*get_image = null;
            
            $(document).ready(function () {
                function imageAjax() {
                    var fileExt = {};
                    fileExt[0]=".jpg";
                    $.ajax({
                        //This will retrieve the contents of the folder if the folder is configured as 'browsable'
                        url: resultArray[i].fp,
                        success: function (data) {
                           $("#display x").html('<ul>');
                           //List all png or jpg or gif file names in the page
                           $(data).find('a:contains(" + fileExt[0] + ")').each(function () {
                               var filename = this.href.replace(window.location.host, "").replace("http:///", "");
                               console.log("image file:" + filename);
                               //$("#displaybox").append( '<li>'+filename+ <'/li'>);
                           });
                           $("#displaybox").append('</ul>');
                         }     
                      });
                    }
                    get_image=imageAjax;
                })
            
            get_image();*/

            var filename = "English-1_thumb.jpg";
            att.value = "../" + resultArray[i].fp + filename;       
            console.log("i = " + i);
            console.log("resultArray[i] = " + resultArray[i]);
               
        }
        else if(resultArray[i].ft == "mp3" || resultArray[i].ft == "mp4") {
            att.value = "images/audio_icon.png";
        }
        else if(resultArray[i].ft == "EP") {
            att.value = "images/game_icon.png";
        }
        else if(resultArray[i].def != null) {
            att.value = "images/dictionary_icon.png";
        }
        //chapter
        else if(resultArray[i].pn !=null)
            att.value = "images/chapter_icon.png";
        else if(resultArray[i].ft = "jpg")
            att.value = "images/picture_icon.jpg";
        //picture

        thumbnail.setAttributeNode(att);
        listItem.appendChild(thumbnail);
               

        
        //set the display text for each content item
        listLabel.innerText = itemString.dn + ", Grade " + resultArray[i].ch_id[0];
        console.log("new list element:"+listLabel);
        
        //append elements to the list item
        
        listItem.appendChild(listLabel);
        listItem.appendChild(addButton);

        return listItem;

}
    