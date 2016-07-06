<?php
/*
 * File:		saveas.php
 * Description:	This file runs upon saving a timeline as a template from the main 
 *				web application. The script recieves a _POST request containing a 
 *				name and all of the MongoID's of the relevant timeline template.
 *				As a results, one timeline template document will contain
 *				- Mongo ID referring to the Timeline itself
 *				- Name of Timeline Document
 *				- Array of MongoId's for relevant media
 *
 *				saveas.php also will append the generated Mongo Document to the templates.json file
 *				which will act as a repository for the open.html module. 
 */

//Connect to MongoDB//
require_once 'mongoSetup.php';

$filename = 'templates.json';
$templatesArray = json_decode($filename, true); //the true parameter allows the functions to treat the object like an associated array
addNew();
function addNew() //synergy between save and saveas. Could be refactored.

{
	global $filename;
	global $templates;
	global $templatesArray;
	echo "new template create";
	$info = array("name" => $_POST["lesson_title"], "line" => $_POST["items_array"]);
	$templates->insert($info);
	$info = fixDocId($info);
	
	//Add new timeline information into $file//
	$templatesArray[] = $info;
}

file_put_contents($filename, json_encode($templatesArray), LOCK_EX);

?>
