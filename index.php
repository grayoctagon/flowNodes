<?php

if(isset($_GET["IamDevShowMeERROR"])){
	ini_set('display_errors', '1');
	ini_set('display_startup_errors', '1');
	error_reporting(E_ALL);
}

if(isset($_GET["doData"])){
	include("code/data.php");
}else{
	include("code/main.php");
}
?>