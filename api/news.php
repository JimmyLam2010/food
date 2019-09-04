<?php
include_once('lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';
$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;

if($action == 'news') {
	$sql = "select * from {$pre}news order by news_id limit {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'newsOne') {
	$sql = "select * from {$pre}news where news_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

