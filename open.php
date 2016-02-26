<?php

// foreach ($_POST as $entry => $lala) {
// 	echo $entry . $lala;
// }

// require_once 'mongoSetup.php';

try
{
	$m			= new MongoClient(); 
	$db			= $m->selectDB("looma");
	$activities	= $db->activities;
	$textbooks	= $db->textbooks;
	$dictionary = $db->dictionary;
	$chapters	= $db->chapters;
	$timelines	= $db->timelines; 
}
catch(MongoConnectionException $e)
{
	echo "Error connecting to MongoDB. Make sure you have run the command mongod --dbpath data/";
	exit();
}


	// make variable for the timeline ID
	$thisID = $_POST['id'];

	// Find a specific document using the Mongo ID
	$document = $timelines->findOne(array('_id' => new MongoId($thisID)));
	echo json_encode($document) . "<br/><br/>";
	
	// Create array to hold the timeline element JSONs
	$timelineArray = array();
	$cntelements = count($document['elements']);
	for ($i=0; $i<$cntelements; $i++) {
		$mongoID = $document['elements'][$i];	// placeholder for the mongoID we're searching for


		// $collection = searchMongo($mongoID);		// searchMongo() searches the collection for the right 

		$collectionarray = array($activities, $textbooks, $dictionary, $chapters);

		for ($i=0; $i<count($collectionarray); $i++) {
			$thisdocument = $collectionarray[$i]->findOne(array('_id' => new MongoId($thisID)));
			if ($thisdocument != null) {
				break;
			} 
		}



		if ($thisdocument == null) {
			error_log("There is no document with this ID!", 0);
			// We should make a real error log .......
			// error_log("You messed up!", 3, "/var/tmp/my-errors.log");
			break;
		}
		$timelineArray[$i] = $thisdocument;		// find the document! yay!
	}
	var_dump($timelineArray);


























	// $document = $dictionary->findOne(array('_id' => new MongoId('568dcdf19324a6f91e74132d')));
	// echo json_encode($document) . "<br/><br/>";


	// COPY OBJECT IDS INTO AN ARRAY
	// (this is imitating the "save" module)
	// $i = 0;
	// $objectIdArray = [];
	// foreach($cursor as $id => $value)
	// {
	// 	$objectIdArray[$i] = $id; 
	// 	$i++;	
	// }
	// $cnt = count($objectIdArray);



	// foreach($cursor as $id => $value) {
	// 	for ($i = 0; $i < $cnt; $i++) {
	// 		if ($id == $objectIdArray[$i]) {
	// 			echo '<div class="timeline">';
	// 			echo $id . "<br/>";
	// 			$document = $col->findOne(array('_id' => new MongoId($id)));
	// 			echo json_encode($document) . "<br/>";
	// 			$bookarray = $document['book'];
	// 			echo json_encode($bookarray) . "<br/>";
	// 			echo '<img src="'. $document['book']['image'] .'">' . '<br/>';
	// 			echo "</div>";
	// 		}
	// 	}
	// }


	// // GENERATE DIVS FROM OBJECT ID ARRAY
	// for($i=0; $i<count($objectIdArray); $i++) {
	// 	// echo "<div class='timeline'>";													// starting little timeline div
	// 	// echo "<b>Object ID #" . $i . ":</b><br/>" . $objectIdArray[$i] . "<br/>";		// listing that document's ID
	// 	// echo '<button id="hiclass">delete</button>';
	// 	// echo "</div>";	
	// }

	// // cycle through objectIdArray and put properties of each document into new document
	// $cnt = count($objectIdArray);
	// //Open
	// for($i = 0; $i< $cnt; $i++) // Create JSON to Send to Front End
	// {
	// 	$hi = $col->findOne(array('_id' => new MongoId($objectIdArray[$i])));
	// 	echo json_encode($hi);
	// }














	/*

	File:			open.php
	Description:	This file runs upon opening a timeline from the main web application. 
					Receives:
					- One _POST request containing the ID of the requested timeline
						from the "Open" module dialogue
					Returns: 
					- One array (the "timeline" being opened) of JSON objects 
						(each media element in the timeline).
	*/	




/*
//Might be good to split the mongo connection  up from the application logic.
try
{
	$m			= new MongoClient(); 
	$db			= $m->selectDB("looma");
	$activities	= $db->activities;
	$textbooks	= $db->textbooks;
	$dictionary = $db->dictionary;
	$chapters	= $db->chapters;
	$timelines	= $db->timelines; //If no timelines exist, a new timeline will be created
}
catch(MongoConnectionException $e)
{
	echo "Error connecting to MongoDB. Make sure you have run the command mongod --dbpath data/";
	exit();
}
	 // Model work for dropping collections and inserting into collections 
	$col->drop();
	$info = array("title" => "Thing 1", "author" => "Author 1");
	$col->insert($info);
	$info = array("title" => "Thing 2", "author" => "Author 2");
	$col->insert($info);
	$info = array("title" => "Thing 3", "author" => "Author 3");
	$col->insert($info);
	$info = array("title" => "Thing 4", "author" => "Author 4");
	$col->insert($info);
	 

	//SEARCH RESULTS
	//$results = query.php //How does this work again?

	//READ DATA
	// $cursor = $timelines->find($results);
	// $cursor = $timelines->find();
	$cursor = $col->find();



	// COPY OBJECT IDS INTO AN ARRAY
	$i = 0;
	$objectIdArray = [];
	foreach($cursor as $id => $value)
	{
		$objectIdArray[$i] = $id; 
		$i++;	
	}

	// GENERATE DIVS FROM OBJECT ID ARRAY
	for($i=0; $i<count($objectIdArray); $i++) {
		// echo "<div class='timeline'>";													// starting little timeline div
		// echo "<b>Object ID #" . $i . ":</b><br/>" . $objectIdArray[$i] . "<br/>";		// listing that document's ID
		// echo '<button id="hiclass">delete</button>';
		// echo "</div>";	
	}

	// cycle through objectIdArray and put properties of each document into new document
	$cnt = count($objectIdArray);
	//Open
	for($i = 0; $i < $cnt; $i++) // Create JSON to Send to Front End
	{
		$hi = $col->findOne(array('_id' => new MongoId($objectIdArray[$i])));
		echo json_encode($hi);
	}

	// Print array of IDs into divs
	for($i=0; $i<count($objectIdArray); $i++) {
		// echo "<div class='timeline'>";													// starting little timeline div
		// echo "<b>Object ID #" . $i . ":</b><br/>" . $objectIdArray[$i] . "<br/>";		// listing that document's ID
		// echo '<button id="hiclass">delete</button>';
		// echo "</div>";	
	}


*/



	/* 

	OPEN TIMELINE
	1. Get object ID from results box
	2. Use object ID to access document with information
	3. Load all information from document into a JSON

	 */

?>
