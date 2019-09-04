app.controller('pageCtrl', function($scope, Page, $state, Form){
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
		Page.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					Page.page($scope.limit, $scope.offset).then(function(result){
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
		Page.delete(id).then(function(result){
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
		Page.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('pageAddCtrl', function($scope, Page, $state, $stateParams, Upload){
	$scope.page = {}
	// 设置是否推荐默认值
	$scope.id = $stateParams.id;
	// 展示功能
	if($stateParams.id) {
		Page.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.page = result.data
				console.log($scope.page)
				// 查一条分类
				Page.get($scope.page.single_id)
			}
		})
	}
	// 添加功能
	$scope.save = function() {

		if($scope.page.title == undefined) { 
			alert('标题不能为空')
			return false;
		}

		var data = {
			content: $scope.page.content,
			title: $scope.page.title,
			pic: $scope.page.pic
		}

		if($scope.file) {
			// 物理上传
			Upload.upload({
				url: '../api/admin/page.php?action=fileUpload',
				data: {file: $scope.file}
			}).then(function(resp){
				console.log(resp)
				if(resp.data.code) {
					$scope.page.pic = resp.data.msg
					data.pic = resp.data.msg
					if(!$scope.id) {
						Page.save(data).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/page
									$state.go('admin.page')
								}else{
									$state.reload()
								}
							}
						})
					}else{
						Page.update(data, $scope.id).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/page
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
				Page.save(data).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/page
							$state.go('admin.page')
						}else{
							$state.reload()
						}
					}
				})
			}else{
				Page.update(data, $scope.id).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/page
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