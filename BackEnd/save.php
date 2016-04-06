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
 */

/*Connect to MongoDB*/
require_once 'mongoSetup.php';

/*Insert array into Timeline*/
$info = array("name" => $_POST["lesson_title"], "line" => $_POST["items_array"]);
$timelines->insert($info);
?>
