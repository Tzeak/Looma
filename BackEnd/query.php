<?php

/*
 	File:			query.php
 	Description:	This file runs upon clicking the "Search" button
 					in the "Query" module in the main web application.

 					FILTER
 					The "filter" function has 4 options:
 					Grade, Subject, Chapter, Type of media
 					- Use a regex to search each 

 	1. Grade
 	2. Subject
 	3. Chapter
 	4. Type of media
 	- Section (omitted)
 */

require_once('mongoSetup.php');

if( isset($_GET["filter"]))
{
	$word = $_GET["filter"]; // This should be of form ##EN####

	//These three queries are constructed to search through each of the collections in 
	//the looma database
	
	$chapter_query = array('_id' => new MongoRegex("/^$word/i"));  //NOTE: using regex to do a case insensitive search for the word 
	$text_query= array('prefix' => new MongoRegex("/^$word/i"));  //NOTE: using regex to do a case insensitive search for the word 
	$else_query= array('ch_id' => new MongoRegex("/^$word/i"));  //NOTE: using regex to do a case insensitive search for the word 

	$res1 = queryMongo($else_query);
	$res2 = queryMongo($text_query);
	$res3 = queryMongo($chapter_query);
	var_dump($res1);
	echo "BREAK";
	var_dump($res2);
	echo "BREAK";
	var_dump($res3);

}
	//Query Mongo Database
function queryMongo($searchArray) {
	global $activities, $textbooks, $dictionary, $chapters, $timelines;

	$activities_cursor = $activities->find($searchArray);
	$textbook_cursor = $textbooks->find($searchArray);
	$dictionary_cursor = $dictionary->find($searchArray);
	$chapter_cursor = $chapters->find($searchArray);

	$res = "";
	foreach($activities_cursor as $doc)
	{
		$res .= json_encode($doc);
	}
	foreach($dictionary_cursor as $doc)
	{
		$res .= json_encode($doc);
	}
	foreach($textbook_cursor as $doc)
	{
		$res .= json_encode($doc);
	}
	foreach($chapter_cursor as $doc)
	{
		$res .= json_encode($doc);
	}
	
	return $res;
	
}
?>
