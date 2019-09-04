<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';
$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : '';
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;
 
if($action == 'region' && $offset && $limit) {
	$sql = "select * from {$pre}region order by region_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'region') {
	$sql = "select * from {$pre}region order by region_id";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'regionOne') {
	$sql = "select * from {$pre}region where region_id={$id}";
	$data = getOne($sql);
	// var_dump($data);
	echo json_encode($data);die;
}
 
if($action == 'regionAdd') {
	if($_POST) {
		
		$region_name = isset($_POST['region_name']) && !empty($_POST['region_name']) ? trim($_POST['region_name']) : '';
		$order = isset($_POST['order']) && !empty($_POST['order']) ? trim($_POST['order']) : 0;
		
		$data = array(
			'region_name' => $region_name,
			'order' => $order
		);

		if(!$id) {
			$result = add("region", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("region", $data, "where region_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}
	}
}

if($action == 'regionDeleteByIds' && $ids ) {
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}region where region_id in (${ids['ids']})";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'regionDelete' && $id ) {
	$sql = "delete from {$pre}region where region_id = {$id}";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'regionCount') {
	$sql = "select count(*) as c from {$pre}region";
	$data = getOne($sql);
	echo json_encode($data);die;
}
