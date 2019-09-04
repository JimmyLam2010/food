<?php
include_once('lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

if($action == 'friendlyLink') {
	$sql = "select * from {$pre}friend_link as f order by f.order";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}


