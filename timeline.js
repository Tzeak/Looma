//Results JSON object
var results = new Object();
	results.team1 = 'Suparna';
	results.team2 = 'Kate';
	results.team3 = 'Roshan';
  results.team4 = 'Elise';

var resultsWhole = document.querySelector("div#resultsdiv");
var resultsUL = document.querySelector("div#resultsdiv ul#resultsDivUL");
var timelineWhole = document.querySelector("div#timelineWhole");


// Load JSON objects into results box immediately
// window.onload = function loadJSON() {

var loadJSON = function() {

  //Load JSON objects into Results div
  console.log("Loading JSON objects into Results div...");

  for (var key in results) 
  {
    var rElement = createNewListElement(results[key]);
    resultsUL.appendChild(rElement);
  }
}


var createNewListElement = function(itemString) {
  // Create new list items

  var listItem = document.createElement("li");
  var listLabel = document.createElement("label");
  var addButton = document.createElement("button");
  addButton.innerText = "Add";
  addButton.className = "add";
  listLabel.innerText = itemString;
  // addButton.onclick = addJSON;
  listItem.appendChild(listLabel);
  listItem.appendChild(addButton);

  return listItem;

}



// Check for next empty div
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



var addJSON = function() {
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


// Load the JSON object
loadJSON(); 


// Cycle over the resultsUL ul list items
for (var i = 0; i < resultsUL.children.length; i++) {   // for each LI
  var addButton = resultsUL.children[i].querySelector("button.add");  // select the add button
  addButton.addEventListener("click", addJSON);   // bind addJSON to add button
  console.log("Giving add buttons actions...");
}



// Cycle over the timelineHolder ul list items
// THIS CURRENTLY DOES NOTHING (b/c it doesn't start out with any remove buttons)
for (var i = 0; i < timelineWhole.children.length; i++) {  // for each timeline div
  var removeButton = timelineWhole.querySelector("li button.remove");
  // var removeButton = timelineWhole.children[i].querySelector("li button.remove");
  removeButton.addEventListener("click", removeJSON);   // bind removeJSON to remove button
  console.log("Giving remove buttons actions...");
}

