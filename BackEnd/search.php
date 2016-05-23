<?php

	$dir_iterator = new RecursiveDirectoryIterator("../content/");
	//$iterator = new RecursiveIteratorIterator($dir_iterator, RecursiveIteratorIterator::SELF_FIRST);
	$iterator = new RecursiveIteratorIterator($dir_iterator); //This seems to remove duplicates - probably should figure out how it works
	// could use CHILD_FIRST if you so wish

	foreach ($iterator as $file) 
	{
		foreach(glob($file.'/' . $_GET['search'].'*') as $filename)
		{
			echo $filename;
		}
	}

	//From results, search mongo for the respective file names
?>
