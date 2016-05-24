<?php
/*THIS IS NOT SANITIZED -- fix pls
 * http://aseriesoftubes.com/articles/tutorial-web-interface-for-grep-and-cat-in-php/
 * */
/*
	if(isset($_GET['search']) && $_GET['search'] != '')
	{
			echo escapeshellarg($_GET['search']) . "<br/>";
			$results = shell_exec("find ". escapeshellarg($_GET['search'])."*");
			echo $results;
	}
 */

	//From results, search mongo for the respective file names

//Attempt 2
/*
$dir_iterator = new RecursiveDirectoryIterator("../content/");
$iterator = new RecursiveIteratorIterator($dir_iterator);
if(isset($_GET['search']) && $_GET['search'] != '')
{
	foreach ($iterator as $file) 
	{
		$filename = $file . '/' . $_GET['search'];
		foreach (glob($filename) as $found)
			echo $found;
	}
}*/

$folder = "../content/";
$pattern = '/'. $_GET['search'] . '/';
    $dir = new RecursiveDirectoryIterator($folder);
    $ite = new RecursiveIteratorIterator($dir);
    $files = new RegexIterator($ite, $pattern, RegexIterator::GET_MATCH);
    $fileList = array();
    foreach($files as $file) {
        $fileList = array_merge($fileList, $file);
    }
    print_r($fileList);
?>
