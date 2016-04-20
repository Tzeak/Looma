<?php

/*
File:			openTimeline.php
Description:	This will take the array of timeline element
				object IDs and retrieves it from the mongo
				database.
				It returns the information in an array.
*/

require_once 'mongoSetup.php';

$timelineID = $_GET['$id'];		// the post is coming from index2.js

$timelineElementsArray = getTimelineElements($timelineID);
$timelineElementsArray = fixDocArray($timelineElementsArray);
echo json_encode($timelineElementsArray);

// // Create array to hold document data
// $timelineData = array();
// $cnt = count($timelineIDs["elements"]);
// for ($i=0; $i<$cnt; $i++) {
// 	$timelineData[$i] = searchMongo($timelineIDs["elements"][$i]);	// searchMongo() is in mongoSetup.php
// }
// return $timelineData;

?>
