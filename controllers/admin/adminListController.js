app.controller('adminListCtrl', function($scope, AdminList, $state, Form){
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
		AdminList.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					AdminList.page($scope.limit, $scope.offset).then(function(result){
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
		AdminList.delete(id).then(function(result){
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
		AdminList.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('adminListAddCtrl', function($scope, AdminList, $state, $stateParams){
	
	$scope.adminList = {}
	// 设置是否推荐默认值

	$scope.id = $stateParams.id;
	
	// 展示功能
	if($stateParams.id) {
		AdminList.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.adminList = result.data
				console.log($scope.adminList)
				// 查一条分类
				AdminList.get($scope.adminList.admin_id)
			}
		})
	}
	// 添加功能
	$scope.save = function() {

		if($scope.adminList.admin_name == undefined) { 
			alert('用户名不能为空')
			return false;
		}

		if($scope.adminList.admin_pwd == undefined) { 
			alert('密码不能为空')
			return false;
		}

		var data = {
			admin_name: $scope.adminList.admin_name,
			admin_pwd: $scope.adminList.admin_pwd,
			create_time: $scope.adminList.create_time,
			login_time: $scope.adminList.login_time
		}

		if(!$scope.id) {
			adminList.save(data).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/adminList
						$state.go('admin.adminList')
					}else{
						$state.reload()
					}
				}
			})
		}else{
			adminList.update(data, $scope.id).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/adminList
						$state.reload()
					}else{
						alert(result.data.msg);
					}
				}
			})
		}
	}
})