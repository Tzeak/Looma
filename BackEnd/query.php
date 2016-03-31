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
						4. Section 
						5. Type of media //In Progress

	PLAN OF ACTION:	The next part to the filter module is combining the various filter queries
	1)  convert gscsQuery() to return Array of query arrays.
	2) convert fileTypeQuery() to return array of filetype query arrays
	3) run loop in the beginning to merge the query arrays returned by gscs and the filetype arrays


 */

require_once('mongoSetup.php');

///////
// Test out mongoquery with extra shit
//////
gscsQuery();
fileTypeQuery();
$chapter_query = array('ch_id' => new MongoRegex("^$filterword/i"));  
$ft_query = array('ft' => new MongoRegex("^$mediatype/i"));

$final_query = array_merge($chapter_query, $ft_query);

$queryArray = queryMongo($final_query);
// Create a global array that will hold all mongo documents matching the filters
//$queryArray = array_merge(gscsQuery(), fileTypeQuery());

// Fix $queryArray
$queryArray = fixDocArray($queryArray);

// Print the entire array!
echo json_encode($queryArray);

//Function: gscsQuery
//	Input: n/a (it receives info from GET requests)
// 	Return: Array of documents matching 
//	NOTE: "gscs" stands for Grade,Subject,Chapter,Section, the only filter inputs we deal with in this function
	function gscsQuery()
	{
		global $chapRegex, $textRegex, $actdictRegex;
		global $filterword;
	   $filterword	= "";
		if(isset($_GET["grade"]) && $_GET["grade"] != '')
		{
			$filterword .= $_GET["grade"]; 
		}
		else
		{
			//Match any grade, 1-8
			$filterword.= "[1-8]";
		}
		if(isset($_GET["subject"]) && $_GET["subject"] != '')
		{
			$filterword .= $_GET["subject"]; 
		}
		else
		{
			//Match any Subject of One or More Letters
			$filterword .= "[A-Za-z]+";
		}
		if(isset($_GET["chapter"]) && $_GET["chapter"] != '')
		{
			$filterword .= $_GET["chapter"]; 
		}
		else
		{
			//Match Any chapter from 0-99
			$filterword.= "[0-9][0-9]?";
		}
		if(isset($_GET['section']) && $_GET["section"] != '')
		{
			$filterword .= "\." . $_GET['section'];
		}
		else
		{
			//Auto match section with lack of section -- this code doesn't matter!
		}

		
		//Construct a query by placing regex into relevant array
		//NOTE: using regex to do a case insensitive search for the filterword 
		$chapter_query = array('_id' => new MongoRegex("^$filterword/i"));  
		$text_query= array('prefix' => new MongoRegex("^$filterword/i"));  
		$actdict_query= array('ch_id' => new MongoRegex("^$filterword/i"));   

	//	$chapRegex = $chapter_query;
	//	$textRegex = $text_query;
	//	$actdictRegex = $actdict_query;


		//Query Mongo Database
		$res_chapter = queryMongo($chapter_query);	// Chapters
		$res_textbook = queryMongo($text_query);		// Textbooks 
		$res_act_dict = queryMongo($actdict_query);	// Dictionary and Activities
		//Print Results
		//echo(json_encode($res1));
		//echo(json_encode($res2));
		//echo(json_encode($res3));

		// Create an array to hold ALL of the gscs filter values
		$gscsDocArray = array_merge($res_chapter, $res_textbook, $res_act_dict);

		// echo json_encode($gscsDocArray);

		return $gscsDocArray;
	}


//Function: fileTypeQuery
//
//		Input: n/a (It receives info from GET requests)
//		Return: Array of documents that matches search array by file type

	function fileTypeQuery()
	{
		global $mediatype;
		if(isset($_GET["ft"]) && $_GET["ft"] != '')
		{
			$mediatype = $_GET["ft"];
			//$ft_query = array('ft' => new MongoRegex("^$mediatype/i"));
			$ft_query = array('ft' => new MongoRegex("^$mediatype/i"));
			$ftRegex = $ft_query;

			$ftDocArray = queryMongo($ft_query);

			return $ftDocArray;
		}
	}


//Function: queryMongo
//
//		Input: Array of search values 
//		Return: Array of documents that matches search array
	function queryMongo($searchArray) {
		global $activities, $textbooks, $dictionary, $chapters, $timelines;

		$activities_cursor = $activities->find($searchArray);
		$textbook_cursor = $textbooks->find($searchArray);
		$dictionary_cursor = $dictionary->find($searchArray);
		$chapter_cursor = $chapters->find($searchArray);

		$docArray =  array();
		$i = 0;
		foreach($activities_cursor as $doc)
		{
			if(isset($doc))
			{
				$docArray[$i] = $doc;
				//echo json_encode($doc);
				$i++;
			}
		}
		foreach($dictionary_cursor as $doc)
		{
			if(isset($doc))
			{
				$docArray[$i] = $doc;
				//echo json_encode($doc);
				$i++;
			}
		}
		foreach($textbook_cursor as $doc)
		{
			if(isset($doc))
			{
				$docArray[$i] = $doc;
				//echo json_encode($doc);
				$i++;
			}
		}
		foreach($chapter_cursor as $doc)
		{
			if(isset($doc))
			{
				$docArray[$i] = $doc;
				//echo json_encode($doc);
				$i++;
			}
		}
		
		return $docArray;
	}



?>
