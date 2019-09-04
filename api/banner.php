<?php
include_once('lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';


if($action == 'banner') {
	$sql = "select * from {$pre}banner as b order by b.order";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}