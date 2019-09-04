app.controller('shopCtrl', function($scope,  Shop, $state, Form){
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
		Shop.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					Shop.page($scope.limit, $scope.offset).then(function(result){
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
		Shop.delete(id).then(function(result){
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
		Shop.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('shopAddCtrl', function($scope, Shop, Region, $state, $stateParams){
	$scope.shop = {}
	// 设置是否推荐默认值
	$scope.id = $stateParams.id;

	Region.query().then(function(result){
		if(result.status == 200) {
			// 设置分类默认值
			$scope.shop.region = result.data[0]
			console.log(result.data[0])
			$scope.regions = result.data;
			// 查一条美食
			if($stateParams.id) {
				Shop.get($stateParams.id).then(function(result){
					
					if(result.status == 200) { 
						$scope.shop = result.data
						$scope.shop.oldpic = result.data.pic
						console.log($scope.shop)
						// 查一条分类
						Region.get($scope.shop.region_id).then(function(res){
							// 重置分类值
							$scope.shop.region = res.data
						})
					}
				})
			}
		}
	})

	// 添加功能
	$scope.save = function() {
		if($scope.shop.title == undefined) { 
			alert('标题不能为空')
			return false;
		}

		// 数据存储
		var data = {
			pic: $scope.shop.pic,
			title: $scope.shop.title,
			region_id: $scope.shop.region.region_id,
			dishes: $scope.shop.dishes,
			business_time: $scope.shop.business_time,
			parking: $scope.shop.parking,
			address: $scope.shop.address,
			tag: $scope.shop.tag
		}

		if(!$scope.id) {
			Shop.save(data).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/shop
						$state.go('admin.shop')
					}else{
						$state.reload()
					}
				}
			})
		}else{
			Shop.update(data, $scope.id).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/shop
						$state.reload()
					}else{
						alert(result.data.msg);
					}
				}
			})
		}
	}

})