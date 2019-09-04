<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;

if($action == 'adminDeleteByIds' && $ids ) {
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}admin where admin_id in (${ids['ids']})";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'adminDelete' && $id ) {
	$sql = "delete from {$pre}admin where admin_id = {$id}";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'admin') {
	$sql = "select * from {$pre}admin order by admin_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'adminOne') {
	$sql = "select * from {$pre}admin where admin_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'adminCount') {
	$sql = "select count(*) as c from {$pre}admin";
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'adminAdd') {
	if($_POST) {
		$admin_name = isset($_POST['admin_name']) && !empty($_POST['admin_name']) ? trim($_POST['admin_name']) : '';
		$admin_pwd = isset($_POST['admin_pwd']) && !empty($_POST['admin_pwd']) ? intval($_POST['admin_pwd']) : '';
		$create_time = isset($_POST['create_time']) && !empty($_POST['create_time']) ? intval($_POST['create_time']) : '';
		$login_time = isset($_POST['login_time']) && !empty($_POST['login_time']) ? trim($_POST['login_time']) : '';
		
		$data = array(
            'admin_name' => $admin_name,
			'admin_pwd' => $admin_pwd,
			'create_time' => $create_time,
			'login_time' => $login_time
		);
		if(!$id) {
			$result = add("admin", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("admin", $data, "where admin_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}
	}
}


