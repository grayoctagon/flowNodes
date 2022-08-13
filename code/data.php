<?php

$global_dataFileIsChecked=false;
function getDataPath(){
	global $global_dataFileIsChecked;
	$path = "data/";
	if (!file_exists($path)) {
		mkdir($path, 0777, true);
	}
	$path .="data.json";
	if(!$global_dataFileIsChecked){
		$global_dataFileIsChecked=true;
		if(!file_exists($path)){
			file_put_contents($path,'{"flows": [{"name": "TestFlow"}],"nodes": []}', LOCK_EX);
		}
	}
	
	return $path;
}

header('Content-Type: application/json; charset=utf-8');


$payload = file_get_contents("php://input");

if($payload!=""){
	//$dataOld = getFile();
	$dataIn =  @json_decode($payload, true);
	if(writeFile( json_encode($dataIn, JSON_PRETTY_PRINT) )){
		echo('ok');
	}else{
		echo('error');
	}
}else{
	echo(getFile());
}

function writeFile($content){
	if(filesize(getDataPath())<128*1024*1024){
		file_put_contents(getDataPath(),$content."", LOCK_EX);
		return true;
	}
	return false;
}

function getFile(){
	return file_get_contents(getDataPath());
	//json_decode("[".substr(
	//return $res?json_encode($res):false;
}



?>