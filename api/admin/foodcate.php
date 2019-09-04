<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';
$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : '';
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;
 
if($action == 'foodCate') {
	$sql = "select * from {$pre}food_cate order by cate_id limit {$offset}, {$limit}";

	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'foodCateAll') {
	$sql = "select * from {$pre}food_cate order by cate_id";

	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'foodCateOne') {
	$sql = "select * from {$pre}food_cate where cate_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'foodCateCount') {
	$sql = "select count(*) as c from {$pre}food_cate";
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'foodCateAdd') {
	if($_POST) {
		
		$name = isset($_POST['name']) && !empty($_POST['name']) ? trim($_POST['name']) : '';
		
		$data = array(
			'cate_name' => $name,
		);
		if(!$id) {
			$result = add("food_cate", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("food_cate", $data, "where cate_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}
	}
}

if($action == 'foodCateDeleteByIds' && $ids ) {
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}food_cate where cate_id in (${ids['ids']})";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'foodCateDelete' && $id ) {
	$sql = "delete from {$pre}food_cate where cate_id = {$id}";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}
