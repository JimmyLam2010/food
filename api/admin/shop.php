<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;

if($action == 'shopDeleteByIds' && $ids ) {
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作  

	$picSql = "select pic from {$pre}shop where shop_id in (${ids['ids']})";
	$picUrls = getAll($picSql);
	// print_r($picUrls);
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	
	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}shop where shop_id in (${ids['ids']})";
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

if($action == 'shopDelete' && $id ) {
	$picSql = "select pic from {$pre}shop where shop_id = {$id}";
	$picUrl = getOne($picSql);

	$sql = "delete from {$pre}shop where shop_id = {$id}";
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

if($action == 'shop') {
	$sql = "select * from {$pre}shop as s left join {$pre}region as r on s.region_id = r.region_id order by shop_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'shopOne') {
	$sql = "select * from {$pre}shop as s left join {$pre}region as r on s.region_id = r.region_id where shop_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'shopCount') {
	$sql = "select count(*) as c from {$pre}shop as s left join {$pre}region as r on s.region_id = r.region_id";
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

if($action == 'shopAdd') {
	if($_POST) {
		$title = isset($_POST['title']) && !empty($_POST['title']) ? trim($_POST['title']) : '';
		$dishes = isset($_POST['dishes']) && !empty($_POST['dishes']) ? $_POST['dishes'] : '';
		$business_time = isset($_POST['business_time']) && !empty($_POST['business_time']) ? trim($_POST['business_time']) : '';
		$region_id = isset($_POST['region_id']) && !empty($_POST['region_id']) ? intval($_POST['region_id']) : '';
		$parking = isset($_POST['parking']) && !empty($_POST['parking']) ? intval($_POST['parking']) : '';
		$address = isset($_POST['address']) && !empty($_POST['address']) ? intval($_POST['address']) : '';
		$tag = isset($_POST['tag']) && !empty($_POST['tag']) ? intval($_POST['tag']) : '';

		$pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		$oldpic = isset($_POST['oldpic']) && !empty($_POST['oldpic']) ? trim($_POST['oldpic']) : '';
		
		$data = array(
			'pic' => $pic,
			'title' => $title,
			'region_id' => $region_id,
			'dishes' => $dishes,
			'business_time' => $business_time,
            'parking' => $parking,
            'address' => $address,
            'tag' => $tag
		);

		if(!$id) {
			$result = add("shop", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("shop", $data, "where shop_id=${id}");
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


