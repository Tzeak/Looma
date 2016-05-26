<?php

/*
 * File:			openTimeline.php
 *
 * Description:		This script accepts the MongoId of a timeline as a GET request 
 *					and retrieves all of the associated timeline elements in the form of an 
 *					associative array. 
 *					Once retrieving the elements, the array is "fixed" via the utility function
 *					fixDocArray() and then returned.
*/

require_once 'mongoSetup.php';

	$timelineID = $_GET['$id'];		// the post is coming from index2.js

	$timelineElementsArray = getTimelineElements($timelineID);
	$timelineElementsArray = fixDocArray($timelineElementsArray);
	echo json_encode($timelineElementsArray);
?>
