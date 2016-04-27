<?php
/*
 * File:		save.php
 * Description:	This file runs upon saving a timeline from the main web application
 *				The script recieves a _POST request containing a name and all of the MongoID's
 *				of the relevant timeline.
 *				As a results, one timeline document will contain
 *				- Mongo ID referring to the Timeline itself
 *				- Name of Timeline Document
 *				- Array of MongoId's for relevant media
 *
 *				save.php also will append the generated Mongo Document to the timelines.json file
 *				which will act as a repository for the open.html module. 
 */

/*Connect to MongoDB*/
require_once 'mongoSetup.php';
/*Set variables */
$filename = 'timelines.json';

/*Create and Insert Timeline into Database*/
	$info = array("name" => $_POST["lesson_title"], "line" => $_POST["items_array"]);
	$timelines->insert($info);
	$info = fixDocId($info);

/*Open and Edit Timeline Repository*/
	$file = file_get_contents($filename);
	$timelineArray = json_decode($file);
	//echo $file; //Debug
	$timelineArray[] = $info;
	file_put_contents($filename, json_encode($timelineArray), LOCK_EX);
?>
