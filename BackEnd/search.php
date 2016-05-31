<?php

require_once 'mongoSetup.php';
//Glob attempt. It technically works, in the worst way.
$filename = globber();
//echo $filename;
$mongodoc = fixDocId(searchMongoByFilename($filename));
echo json_encode($mongodoc);

function globber() //Currently finds only the first match
{
	$dir_iterator = new RecursiveDirectoryIterator("../content/");
	$iterator = new RecursiveIteratorIterator($dir_iterator);
	if(isset($_GET['search']) && $_GET['search'] != '')
	{
		foreach ($iterator as $file) 
		{
			$filename = $file . '/*' . $_GET['search'];
			foreach (ciGlob($filename . '*') as $found)
			{
				if($found)
				{
					echo basename($found);
					return basename($found);
				}
			}
		}
	}

	return null;
}

/*Case Insensitive Glob - Thanks Oli Comber from SO*/
function ciGlob($pat, $base = '', $suffix = '')
{
	$p = $base;
	for($x=0; $x<strlen($pat); $x++)
	{
		$c = substr($pat, $x, 1);
		if( preg_match("/[^A-Za-z]/", $c) )
		{
			$p .= $c;
			continue;
		}
		$a = strtolower($c);
		$b = strtoupper($c);
		$p .= "[{$a}{$b}]";
	}
	$p .= $suffix;
	return glob($p);
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
