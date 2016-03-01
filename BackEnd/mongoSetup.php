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


// class MongoId2 extends MongoId {
//         public function __construct($id = null) {
//             if(is_array($id)) {
//                 $id = (object) $id;
//             }

//             if(is_object($id) && isset($id->{'$id'})) {
//                 $id = $id->{'$id'};
//             }

//             return parent::__construct($id);
//         }
//     }

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
?>
