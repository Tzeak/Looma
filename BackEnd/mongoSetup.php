<?php
/*
 * File:		mongoSetup.php
 * Description:	This removes the necessity of re-writing the mongo setup for 
 *				each php file where we need to access MongoDB.
 */

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

/* Function:	searchMongo($id)
 * Description:	This function takes in a MongoId and searches for it through each of the collections
 *				in the database. 
 *				- If the document exists, return $document to the calling function.
 *				- If the document does not exist, return null to the calling function
 */

function searchMongo($id)
{

	global $activities, $textbooks, $dictionary, $chapters, $timelines;
	// Look through all collections for that document with the Mongo ID
	$collectionarray = array($activities, $textbooks, $dictionary, $chapters);

	for ($i=0; $i<count($collectionarray); $i++)
   	{
	
		$document = $collectionarray[$i]->findOne(array('_id' => new MongoId($id)));

		if ($document != null) 
		{
			return $document; // it's in this collection!
		} 
	}
	
	return null;
}


function getTimelineElements ($timelineID) {

	global $activities, $textbooks, $dictionary, $chapters, $timelines;		

	// Create an array with the IDs of the elements
	$timelineDoc = $timelines->findOne(array('_id' => new MongoId($timelineID)));

	// Create array to hold the timeline element JSONs
	$timelineElementsArray = array();
	$cntelements = count($timelineDoc['line']);
	for ($i=0; $i<$cntelements; $i++) 
	{
		$mongoID = $timelineDoc['line'][$i];	// placeholder for the mongoID we're searching for
		$document = searchMongo($mongoID);		// searchMongo() searches the collection for the right 

		if ($document == null) {
			error_log("There is no document with this ID!", 0);
			// We should make a real error log .......
			// error_log("You messed up!", 3, "/var/tmp/my-errors.log");
			break;
		}
		$timelineElementsArray[$i] = $document;		// find the document! yay!
	}
	return $timelineElementsArray;
}
?>
