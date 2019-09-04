<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;

if($action == 'settingDeleteByIds' && $ids ) {
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}setting where setting_id in (${ids['ids']})";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'settingDelete' && $id ) {
	$sql = "delete from {$pre}setting where setting_id = {$id}";
	$result = delete($sql);
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'setting') {
	$sql = "select * from {$pre}setting order by setting_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'settingOne') {
	$sql = "select * from {$pre}setting where setting_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'settingCount') {
	$sql = "select count(*) as c from {$pre}setting";
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'settingAdd') {
	if($_POST) {
		$setting_name = isset($_POST['setting_name']) && !empty($_POST['setting_name']) ? trim($_POST['setting_name']) : '';
		$setting_value = isset($_POST['setting_value']) && !empty($_POST['setting_value']) ? intval($_POST['setting_value']) : '';
		
		$data = array(
            'setting_name' => $setting_name,
			'setting_value' => $setting_value,
		);
		if(!$id) {
			$result = add("setting", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("setting", $data, "where setting_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}
	}
}


