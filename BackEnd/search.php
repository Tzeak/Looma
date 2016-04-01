<?php
/*THIS IS NOT SANITIZED -- fix pls
 * http://aseriesoftubes.com/articles/tutorial-web-interface-for-grep-and-cat-in-php/
 * */
	if(isset($_GET['search']) && $_GET['search'] != '')
	{
			echo escapeshellarg($_GET['search']) . "<br/>";
			$results = shell_exec("find ". escapeshellarg($_GET['search'])."*");
	}

	//From results, search mongo for the respective file names
?>
