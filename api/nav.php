<?php
include_once('lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';


if($action == 'nav') {
	$sql = "select * from {$pre}nav as n order by n.order";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}