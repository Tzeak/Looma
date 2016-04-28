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
	echo "MongoConnectError connecting to MongoDB. Make sure you have run the command mongod --dbpath data/";
	exit();
}

/* Function:		searchMongo($id)
 * Description:		Input	- Mongo ID of a Document
 *					Return	- Document or null
 */
function searchMongo($id)
{

	global $activities, $textbooks, $dictionary, $chapters, $timelines;
	// Look through all collections for that document with the Mongo ID
	$collectionarray = array($activities, $textbooks, $dictionary);

	// Chapters collection
	$document = $chapters->findOne(array('_id' => $id));
	if ($document != null) {
		return $document;
	}

	for ($i=0; $i<count($collectionarray); $i++)
   	{
		$document = $collectionarray[$i]->findOne(array('_id' => new MongoId($id)));
		if ($document != null) {
			return $document; // it's in this collection!
		}
	}

	return null;
}

// function searchActivities($id) 
// {
// 	global $activities;
// 	$document = $activities->findOne(array('_id' => new MongoId($id)));
// 	if ($document != null) 
// 	{
// 		return $document; // it's in this collection!
// 	} 
// 	return null;
// }

// function searchDictionary($id) 
// {
// 	global $dictionary;
// 	$document = $dictionary->findOne(array('_id' => new MongoId($id)));
// 	if ($document != null) 
// 	{
// 		return $document; // it's in this collection!
// 	} 
// 	return null;
// }

/* Function:		getTimelineElements
 * Description:		Input	- Mongo ID of a Timeline Object
 *					Return	- Array of MongoDB Documents from the associated timeline
 */
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

/* Function:		fixDocArray
 * Description:		Takes array of Mongo Documents and "cleans" the id object for json_encode()
 *					Runs O(n)
 */
function fixDocArray($docArray)
{

		$docCount = count($docArray);
		for($i = 0; $i < $docCount; $i++)
			$docArray[$i] = fixDocId($docArray[$i]);

		return $docArray;
}

/* Function:		fixDocId
 * Description:		Takes Mongo Document and "cleans" the id object for json_encode()
 *					Runs O(1)
 */
function fixDocId($doc)
{
	//This might need to be in a try/catch block in the case of constructed mongoid
	// i.e for chapters
	//cleans document for json_encode
	if(is_object($doc['_id']))
			$doc['_id'] = $doc['_id']->{'$id'};
	else
		error_log("ID not found");

	return $doc;
	

}
?>
