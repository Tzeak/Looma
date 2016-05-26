<?php

/*
 * File:		open.php
 *
 * Description:	This file has been deprecated. Use openTimeline.php instead.
 * 
 */

 require_once 'mongoSetup.php';

	// make variable for the timeline ID
	$thisID = $_POST['$id'];

	// Find a specific timeline using the Mongo ID
	$line = $timelines->findOne(array('_id' => new MongoId($thisID)));
	echo json_encode($line);
?>
