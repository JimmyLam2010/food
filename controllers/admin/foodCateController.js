app.controller('foodCateCtrl', function($scope, FoodCate, $state, Form){
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
		FoodCate.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					FoodCate.page($scope.limit, $scope.offset).then(function(result){
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

	$scope.del = function(id) { 
        FoodCate.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

	$scope.delAll = function() {
		var idsJson = Form.checkedValToJson('.ids')
		FoodCate.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}
})

app.controller('foodCateAddCtrl', function($scope, FoodCate, $state, $stateParams){
	$scope.id = $stateParams.id;

	if($stateParams.id) {
		FoodCate.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.foodcate = result.data
				console.log($scope.foodcate)
				// 查一条分类
				FoodCate.get($scope.foodcate.cate_id)
			}
		})
	}
	// 添加功能
	$scope.save = function() {
		var data = {
			name: $scope.foodcate.name,
		}
		console.log(data)
		if(!$scope.id) {
			FoodCate.save(data).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/food
						$state.go('admin.food_cate')
					}else{
						$state.reload()
					}
				}
			})
		}else{
			FoodCate.update(data, $scope.id).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/food
						$state.reload()
					}else{
						alert(result.data.msg);
					}
				}
			})
		}
	}

})