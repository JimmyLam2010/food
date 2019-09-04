<?php
include_once('../lib/config.php');
$action = isset($_GET['action']) && !empty($_GET['action']) ? $_GET['action'] : '';

$limit = isset($_GET['limit']) && !empty($_GET['limit']) ? $_GET['limit'] : 2;
$offset = isset($_GET['offset']) && !empty($_GET['offset']) ? $_GET['offset'] : 0;
$id = isset($_GET['id']) && !empty($_GET['id']) ? $_GET['id'] : 0;
$ids = isset($_GET['ids']) && !empty($_GET['ids']) ? $_GET['ids'] : 0;

if($action == 'companyDeleteByIds' && $ids ) {
	// $ids = '{"ids":["5","4","3","2","1"]}' json字符串
	$ids = json_decode($ids, true); // 将字符串转为数组，方便操作
	$picSql = "select pic from {$pre}company where company_id in (${ids['ids']})";
	$picUrls = getAll($picSql);

	// 我们想要的sql语句效果 delete from table_name where id in (1,2,3,4) 
	$sql = "delete from {$pre}company where company_id in (${ids['ids']})";
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

if($action == 'companyDelete' && $id ) {
	$picSql = "select pic from {$pre}company where company_id = {$id}";
	$picUrl = getOne($picSql);

	$sql = "delete from {$pre}company where company_id = {$id}";
	$result = delete($sql);

	$picAdr = "../../" . substr($picUrl['pic'], 22);
	unlink($picAdr);
	
	if($result) {
		echo_json(1, '删除成功');
	}else{
		echo_json(0, '删除失败');
	}
}

if($action == 'company') {
	$sql = "select * from {$pre}company order by company_id limit {$offset}, {$limit}";
	// echo $sql;die;
	$data = getAll($sql);
	echo json_encode($data);die;
}

if($action == 'companyOne') {
	$sql = "select * from {$pre}company where company_id={$id}";
	// echo $sql;die;
	$data = getOne($sql);
	echo json_encode($data);die;
}

if($action == 'companyCount') {
	$sql = "select count(*) as c from {$pre}company";
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

if($action == 'companyAdd') {
	if($_POST) {
		$title = isset($_POST['title']) && !empty($_POST['title']) ? trim($_POST['title']) : '';
		$phone = isset($_POST['phone']) && !empty($_POST['phone']) ? trim($_POST['phone']) : '';
		$tel = isset($_POST['tel']) && !empty($_POST['tel']) ? intval($_POST['tel']) : '';
		$postal_code = isset($_POST['postal_code']) && !empty($_POST['postal_code']) ? intval($_POST['postal_code']) : '';
		$address = isset($_POST['address']) && !empty($_POST['address']) ? intval($_POST['address']) : '';

		$pic = isset($_POST['pic']) && !empty($_POST['pic']) ? trim($_POST['pic']) : '';
		
		$data = array(
            'title' => $title,
			'pic' => $pic,
			'phone' => $phone,
			'tel' => $tel,
			'postal_code' => $postal_code,
			'address' => $address,
		);
		if(!$id) {
			$result = add("company", $data);

			if($result) {
				echo_json(1, '添加成功');
			}else{
				echo_json(0, '添加失败');
			}
		}else{
			$result = update("company", $data, "where company_id=${id}");
			if($result) {
				echo_json(1, '更新成功');
			}else{
				echo_json(0, '更新失败');
			}
		}
	}
}


