<?php
 require_once 'mongoSetup.php';

	// make variable for the timeline ID
	$thisID = $_POST['id'];

	// Find a specific timeline using the Mongo ID
	$line = $timelines->findOne(array('_id' => new MongoId($thisID)));
	echo json_encode($line);

	// function getElementIds ($thisID) {
	// 	// Create array to hold the timeline element JSONs
	// 	$timelineArray = array();
	// 	$cntelements = count($line['line']);
	// 	for ($i=0; $i<$cntelements; $i++) 
	// 	{
	// 		$mongoID = $line['line'][$i];	// placeholder for the mongoID we're searching for
	// 		$document = searchMongo($mongoID);		// searchMongo() searches the collection for the right 

	// 		if ($document == null) {
	// 			error_log("There is no document with this ID!", 0);
	// 			// We should make a real error log .......
	// 			// error_log("You messed up!", 3, "/var/tmp/my-errors.log");
	// 			break;
	// 		}
	// 		$timelineArray[$i] = $document;		// find the document! yay!
	// 	}
	// 	return $timelineArray;
	// }
?>
