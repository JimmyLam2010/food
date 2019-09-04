<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;

if($action == 'foodDeleteByIds' && $ids ) {
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  

	$picSql = "select pic from {$pre}food where food_id in (${ids['ids']})";
	$picUrls = getAll($picSql);
	// print_r($picUrls);
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}food where food_id in (${ids['ids']})";
	$result = delete($sql);

	foreach($picUrls as $key => $value){
		$picAdr = "../../". substr($value['pic'], 22);
		unlink($picAdr);
	};

	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'foodDelete' && $id ) {
	$picSql = "select pic from {$pre}food where food_id = {$id}";
	$picUrl = getOne($picSql);

	$sql = "delete from {$pre}food where food_id = {$id}";
	$result = delete($sql);
	
	$picAdr = "../../" . substr($picUrl['pic'], 22);
	unlink($picAdr);
	// echo($picAdr);
	// $picAdr = substr()
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'food') {
	$sql = "select * from {$pre}food as f left join {$pre}food_cate as c on c.cate_id = f.cate_id order by food_id desc limit {$offset}, {$limit}";
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

if($action == 'fileUpload'  ) {
	$uploadUrl = '../../assets/home/img';

	$pic = upload_file('file', $uploadUrl);
	if($pic) {
		$pic = str_replace($uploadUrl, '', $pic);
		$pic = UPLOADS . $pic;
		echo_json(1,$pic);
	}else{
		echo_json(0,'上传失败');
	}
}

if($action == 'foodAdd') {
	if($_POST) {
		$title = isset($_POST['title']) && !empty($_POST['title']) ? trim($_POST['title']) : '';
		$price = isset($_POST['price']) && !empty($_POST['price']) ? $_POST['price'] : '';
		$content = isset($_POST['content']) && !empty($_POST['content']) ? trim($_POST['content']) : '';
		$cate_id = isset($_POST['cate_id']) && !empty($_POST['cate_id']) ? intval($_POST['cate_id']) : '';
		$is_recommend = isset($_POST['is_recommend']) && !empty($_POST['is_recommend']) ? intval($_POST['is_recommend']) : 0;

		$pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		$oldpic = isset($_POST['oldpic']) && !empty($_POST['oldpic']) ? trim($_POST['oldpic']) : '';
		
		$data = array(
			'pic' => $pic,
			'title' => $title,
			'price' => $price,
			'content' => $content,
			'cate_id' => $cate_id,
			'is_recommend' => $is_recommend
		);

		if(!$id) {
			$result = add("food", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("food", $data, "where food_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}

		// 物理处理图片
		if($pic && $oldpic && $pic != $oldpic) {
			$oldpic= str_replace(HTTP, ROOT, $oldpic);
			unlink($oldpic);
		}
	}
}


