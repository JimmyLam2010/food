app.controller('navCtrl', function($scope, Nav, $state, Form){
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
		Nav.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					Nav.page($scope.limit, $scope.offset).then(function(result){
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
		Nav.delete(id).then(function(result){
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
		Nav.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('navAddCtrl', function($scope, Nav, $state, $stateParams, Upload){
	$scope.nav = {}

	$scope.id = $stateParams.id;
	// 展示功能
	if($stateParams.id) {
		Nav.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.nav = result.data
				console.log($scope.nav)
				// 查一条分类
				Nav.get($scope.nav.admin_id)
			}
		})
	}
	// 添加功能
	$scope.save = function() {

		if($scope.nav.title == undefined) { 
			alert('标题不能为空')
			return false;
		}
		
		var data = {
			title: $scope.nav.title,
			link: $scope.nav.link,
			order: $scope.nav.order,
		}

		if(!$scope.id) {
			Nav.save(data).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/nav
						$state.go('admin.nav')
					}else{
						$state.reload()
					}
				}
			})
		}else{
			Nav.update(data, $scope.id).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/nav
						$state.reload()
					}else{
						alert(result.data.msg);
					}
				}
			})
		}
	}
})