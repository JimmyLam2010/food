<?php
include_once('lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;

if($action == 'single_page') {
	$sql = "select * from {$pre}single_page order by single_id";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'single_pageOne') {
	$sql = "select * from {$pre}single_page where single_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}


