<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;

if($action == 'navDeleteByIds' && $ids ) {
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}nav where nav_id in (${ids['ids']})";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'navDelete' && $id ) {
	$sql = "delete from {$pre}nav where nav_id = {$id}";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'nav') {
	$sql = "select * from {$pre}nav order by nav_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'navOne') {
	$sql = "select * from {$pre}nav where nav_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'navCount') {
	$sql = "select count(*) as c from {$pre}nav";
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'navAdd') {
	if($_POST) {
		$title = isset($_POST['title']) && !empty($_POST['title']) ? trim($_POST['title']) : '';
		$order = isset($_POST['order']) && !empty($_POST['order']) ? intval($_POST['order']) : '';
		$link = isset($_POST['link']) && !empty($_POST['link']) ? intval($_POST['link']) : '';
		
		$data = array(
			'title' => $title,
			'link' => $link,
			'order' => $order	
		);
		if(!$id) {
			$result = add("nav", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("nav", $data, "where nav_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}
	}
}


