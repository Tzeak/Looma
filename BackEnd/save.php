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

//Connect to MongoDB//
require_once 'mongoSetup.php';
//Set variables //

$filename = 'timelines.json';
echo isset($_POST["timeline_id"]);
//Open Timeline Repository
$file = file_get_contents($filename);
$timelineArray = json_decode($file);

//CASE 1: Editing Existing Timeline//
//if(isset($_POST["timeline_id"]))
{
/*
	$timelineId = $_POST["timeline_id"];

	//Find the mongo document for the relevant timeline
	$info = timelines->findAndModify(
		array("_id" => new MongoId($timelineId)),
		array("$set" => array("name" => $_POST["lesson_title"], "line" => $_POST["items_array"])),
	);
	$info = fixDocId($info);

	//Edit timeline in timeline.json
	foreach($timelineArray as $key => $value) {
		if (in_array($info["_id"], $value)) {
			$timelineArray[$key] = $info;	// Removes from JSON
			$timelineArray = array_values(array_filter($timelineArray));	// Resets indices once the item is removed
			echo "Edited" . $info["name"];
		}
	}

*/

}
/*
else
//CASE 2: Create and Insert new Timeline into Database//
{
	$info = array("name" => $_POST["lesson_title"], "line" => $_POST["items_array"]);
	$timelines->insert($info);
	$info = fixDocId($info);
	
	//Add new timeline information into $file//
	$timelineArray[] = $info;
	file_put_contents($filename, json_encode($timelineArray), LOCK_EX);
}*/
?>
