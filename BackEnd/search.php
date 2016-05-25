<?php
//Glob attempt. It technically works, in the worst way.

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
}
//This would be a better Mechanism for finding files IF IT WORKED x.x :(((
/*
$folder = "../content/";
//$pattern = '/'. $_GET['search'] . '/';
$pattern = '/'.'butts'.'/';
    $dir = new RecursiveDirectoryIterator($folder);
    $ite = new RecursiveIteratorIterator($dir);
    $files = new RegexIterator($ite, $pattern, RegexIterator::GET_MATCH);
    $fileList = array();
    foreach($files as $file) {
        $fileList = array_merge($fileList, $file);
    }
    print_r($fileList);
 */
?>
