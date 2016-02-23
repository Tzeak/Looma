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
	/*Insert array into Timeline*/
	$info = array("name" => $_POST["name"], "line" => $_POST["line"]);
	$timelines->insert($info);
?>
