<?php
	echo exec("pwd");
	if(isset($_GET['search']) && $_GET['search'] != '')
		echo exec("grep ". $_GET['search']);
?>
