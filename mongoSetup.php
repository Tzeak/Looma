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
?>
