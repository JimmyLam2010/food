app.controller('bannerCtrl', function($scope, Banner, $state, Form){
	// 可选择的页数范围
	$scope.maxSize = 2;
	// 每页显示的数量
	$scope.limit = 6;
	// 设置page默认值
	$scope.currentPage =  1
	// 设置总条数
	$scope.totalItems = 0
	// 正反选
	Form.checkedAction($scope, '.ids')
	// 分页功能
	$scope.page = function(currentPage) {
		// 当前页数
		$scope.currentPage = currentPage || 1
		// 总共有多少条数据 
		Banner.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					Banner.page($scope.limit, $scope.offset).then(function(result){
						console.log(result)
						if(result.status == 200) {
							$scope.data = result.data;
						}
					})
				}
			}
		})
	} 
	// 执行列表查询
	$scope.page()
	// 删除一条
	$scope.del = function(id) { 
		Banner.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}
	// 删除所有
	$scope.delAll = function() {
		var idsJson = Form.checkedValToJson('.ids')
		Banner.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('bannerAddCtrl', function($scope, Banner, $state, $stateParams, Upload){
	$scope.banner = {}

	$scope.id = $stateParams.id;
	// 展示功能
	if($stateParams.id) {
		Banner.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.banner = result.data
				console.log($scope.banner)
				// 查一条分类
				Banner.get($scope.banner.banner_id)
			}
		})
	}
	// 添加功能
	$scope.save = function() {

		if($scope.banner.title == undefined) { 
			alert('标题不能为空')
			return false;
		}
	
		var data = {
			title: $scope.banner.title,
			pic: $scope.banner.pic,
			link: $scope.banner.link,
			order: $scope.banner.order
		}

		if($scope.file) {
			// 物理上传
			Upload.upload({
				url: '../api/admin/banner.php?action=fileUpload',
				data: {file: $scope.file}
			}).then(function(resp){
				console.log(resp)
				if(resp.data.code) {
					$scope.banner.pic = resp.data.msg
					data.pic = resp.data.msg
					if(!$scope.id) {
						Banner.save(data).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/banner
									$state.go('admin.banner')
								}else{
									$state.reload()
								}
							}
						})
					}else{
						Banner.update(data, $scope.id).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/banner
									$state.reload()
								}else{
									alert(result.data.msg);
								}
							}
						})
					}
				}else{
					alert('上传图片失败')
					return false;
				}
			})
		}else{
			if(!$scope.id) {
				Banner.save(data).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/banner
							$state.go('admin.banner')
						}else{
							$state.reload()
						}
					}
				})
			}else{
				Banner.update(data, $scope.id).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/banner
							$state.reload()
						}else{
							alert(result.data.msg);
						}
					}
				})
			}
		}
	}
})