<?php
include_once('lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;

if($action == 'food') {
	$sql = "select * from {$pre}food as f left join {$pre}food_cate as c on c.cate_id = f.cate_id order by food_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'foodOne') {
	$sql = "select * from {$pre}food as f left join {$pre}food_cate as c on c.cate_id = f.cate_id where food_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'foodCount') {
	$sql = "select count(*) as c from {$pre}food as f left join {$pre}food_cate as c on c.cate_id = f.cate_id";
	$data = getOne($sql);
	echo json_encode($data);die;
}
