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
						4 Section 
						5. Type of media //In Progress
 */

require_once('mongoSetup.php');

//Construct Regular Expression for Filter
$word = "";
if(isset($_GET["grade"]) && $_GET["grade"] != '')
{
	$word .= $_GET["grade"]; 
}
else
{
	//Match any grade, 1-8
	$word.= "[1-8]";
}
if(isset($_GET["subject"]) && $_GET["subject"] != '')
{
	$word .= $_GET["subject"]; 
}
else
{
	//Match any Subject of One or More Letters
	$word .= "[A-Za-z]+";
}
if(isset($_GET["chapter"]) && $_GET["chapter"] != '')
{
	$word .= $_GET["chapter"]; 
}
else
{
	//Match Any chapter from 0-99
	$word.= "[0-9][0-9]?";
}
if(isset($_GET['section']) && $_GET["section"] != '')
{
	$word .= "\." . $_GET['section'];
}
else
{
	//Auto match section with lack of section -- this code doesn't matter!
}

//Debug -- what's the regular expression that was constructed?
//echo "<br/><br/>".$word . "<br/><br/>";
	
	//Construct a query by placing regex into relevant array
	//NOTE: using regex to do a case insensitive search for the word 
	$chapter_query = array('_id' => new MongoRegex("^$word/i"));  
	$text_query= array('prefix' => new MongoRegex("^$word/i"));  
	$else_query= array('ch_id' => new MongoRegex("^$word/i"));  

	//Query Mongo Database
	$res1 = queryMongo($else_query);	// Dictionary and Activities
	$res2 = queryMongo($text_query);	// Textbooks 
	$res3 = queryMongo($chapter_query);	// Chapters
	//Print Results
	echo($res1); 
	echo($res2);
	echo($res3);


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
