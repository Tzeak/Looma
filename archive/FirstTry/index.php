
<?php

try
{
	$m = new MongoClient(); 
	$db = $m->selectDB("example");
	$col = $db->loomatest;
}

catch(MongoConnectionException $e)
{
	echo "Error connecting to MongoDB. Make sure you have run the command mongod --dbpath data/";
	exit();
}
	// INITIALIZE DB
	$col->drop();
	$info = array("title" => "Thing 1", "author" => "Author 1");
	$col->insert($info);
	$info = array("title" => "Thing 2", "author" => "Author 2");
	$col->insert($info);
	$info = array("title" => "Thing 3", "author" => "Author 3");
	$col->insert($info);
	$info = array("title" => "Thing 4", "author" => "Author 4");
	$col->insert($info);
	


	//READ DATA
	$cursor = $col->find();


	// COPY OBJECT IDS INTO AN ARRAY
	$i = 0;
	$objectIdArray = [];
	foreach($cursor as $id => $value)
	{
		$objectIdArray[$i] = $id; 
		$i++;	
	}

	// GENERATE DIVS FROM OBJECT ID ARRAY
	for($i=0; $i<count($objectIdArray); $i++) {
		// echo "<div class='timeline'>";													// starting little timeline div
		// echo "<b>Object ID #" . $i . ":</b><br/>" . $objectIdArray[$i] . "<br/>";		// listing that document's ID
		// echo '<button id="hiclass">delete</button>';
		// echo "</div>";	
	}

	// cycle through objectIdArray and put properties of each document into new document
	$cnt = count($objectIdArray);
	//Open
	for($i = 0; $i< $cnt; $i++) // Create JSON to Send to Front End
	{
		$hi = $col->findOne(array('_id' => new MongoId($objectIdArray[$i])));
		echo json_encode($hi);
	}
?>
