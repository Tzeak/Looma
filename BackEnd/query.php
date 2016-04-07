<?php

/*
 	File:			query.php
 	Description:	This file runs upon clicking the "Search" button
 					in the "Query" module in the main web application.

 					FILTER
 					The "filter" function has 5 options:
						1. Grade
						2. Subject
						3. Chapter
						4. Section 
						5. Type of media 
					The filter returns a JSON string for the Front-End Application to then parse

					SEARCH
					The "search" function will take the search query and do a simple text search through 
					the mongo document returned by the filter
 */

require_once('mongoSetup.php');

///////
// Test out mongoquery with extra shit
//////
$gscs_array = gscsQuery();
$cnt_gscs = count($gscs_array);

$ft_array = fileTypeQuery();
$cnt_ft = count ($ft_array); 

$final_array = array();

// Create foor loop to merge the query arrays and search mongo


for ($i=0; $i<$cnt_gscs; $i++) {
	for ($j=0; $j<$cnt_ft; $j++) {
		if(empty($ft_array[$j]))
		{
			$gscs_ft_array = $gscs_array[$i];
		}
		else
		{
			$gscs_ft_array = array_merge($gscs_array[$i], $ft_array[$j]);
		}

		$mongo_doc_array = queryMongo($gscs_ft_array);
		$mongo_doc_array = fixDocArray($mongo_doc_array);

		if($i == 0)
		{
			$final_array["chapter"] = $mongo_doc_array;
		}
		else if($i == 1)
		{
			$final_array["textbook"] = $mongo_doc_array;
		}
		else if($i == 2)
		{
			$final_array["actdict"] = $mongo_doc_array;
		}
	}
}
echo json_encode($final_array);

//Function: gscsQuery
//	Input: n/a (it receives info from GET requests)
// 	Return: Array of documents matching 
//	NOTE: "gscs" stands for Grade,Subject,Chapter,Section, the only filter inputs we deal with in this function
	function gscsQuery()
	{
		// global $chapRegex, $textRegex, $actdictRegex;
		global $filterword;
	    $filterword	= "";
		if(isset($_GET["grade"]) && $_GET["grade"] != '')
		{
			$filterword .= $_GET["grade"]; 
		}
		else
		{
			//Match any grade, 1-8
			$filterword .= "[1-8]";
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
			$filterword .= "([^\.1-9]" . $_GET["chapter"] . ")|([^\.]0" . $_GET["chapter"] . ")"; 
		}
		else
		{
			//Match Any chapter from 0-99
			//Assuming double digit chapter numbers
			$filterword.= "([0-9][0-9]?)?";
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
		$text_query = array('prefix' => new MongoRegex("^$filterword/i"));  
		$actdict_query = array('ch_id' => new MongoRegex("^$filterword/i"));  

		$final_array = array();
		array_push($final_array, $chapter_query, $text_query, $actdict_query);
		return $final_array;
	}


//Function: fileTypeQuery
//
//		Input: n/a (It receives info from GET requests)
//		Return: Array of documents that matches search array by file type

	function fileTypeQuery()
	{
		// $mediatype = "";
		// if(isset($_GET["ft"]) && $_GET["ft"] != '')
		// {
		// 	$mediatype = $_GET["ft"];
		// }
		// else
		// {
		// 	$final_array = array();
		// 	return array_push($final_array, array());
		// }

		// $final_array = array();
		// array_push($final_array, array('ft' => new MongoRegex("^$mediatype/i")));

		// return $final_array;



		$mediatype = "";
		$combo = false;
		if($_GET["image"] === 'true')
		{
			$mediatype .= "(gif|jpg|png|pdf)"; 
			$combo = true;
		}
		if($_GET["video"] === 'true')
		{
			//Match any grade, 1-8
			if($combo)
			{
				$mediatype .="|";
			}
			$mediatype .= "(mov|mp4|mp5|gif)";
			$combo = true;

		}
		if($_GET["audio"] === 'true')
		{
			if($combo)
			{
				$mediatype .="|";
			}
			$mediatype .= "(mp3)";
			$combo = true;
		}
		if($_GET["misc"] === 'true')
		{
			if($combo)
			{
				$mediatype .="|";
			}
			$mediatype .= "(EP|html)";
			$combo = true;
		}
		echo $mediatype;
		if ($mediatype == "")
		{
			$final_array = array();
			return array_push($final_array, array());
		}

		$final_array = array();
		array_push($final_array, array('ft' => new MongoRegex("^$mediatype/i")));

		return $final_array;


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
