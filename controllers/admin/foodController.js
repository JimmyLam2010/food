app.controller('foodCtrl', function($scope,  Food, $state, Form){
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
		Food.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					Food.page($scope.limit, $scope.offset).then(function(result){
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
		Food.delete(id).then(function(result){
			// console.log(result)
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
				console.log(result.data)
				// console.log($scope)
				// console.log('===============================================');
				// console.log(this.picAllUrls);
				// let picNew = [];
			
				// for (let i = 0; i < this.picAllUrls.length; i++) {
				// 	if (!(this.picAllUrls[i]==pictureUrl)) {
				// 		console.log('this.picAllUrls[i]');
				// 		console.log(this.picAllUrls[i]);
				// 		picNew.push(this.picAllUrls[i]);
				// 	}
				// }
				// this.picAllUrls = picNew;
			}
		})
	}
	// 删除所有
	$scope.delAll = function() {
		var idsJson = Form.checkedValToJson('.ids')
		Food.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('foodAddCtrl', function($scope, FoodCate, Food, $state, $stateParams, Upload){
	// 设置是否推荐数组
	$scope.recommendArr = [
		{
			id: 0,
			name: '不推荐'
		},
		{
			id: 1,
			name: '推荐'
		}
	]
	$scope.food = {}
	// 设置是否推荐默认值
	$scope.food.is_recommend = $scope.recommendArr[0]
	$scope.id = $stateParams.id;
	// 展示功能
	// 获取分类
	FoodCate.query().then(function(result){
		if(result.status == 200) {
			// 设置分类默认值
			$scope.food.cate = result.data[0]
			console.log(result.data[0])
			$scope.cates = result.data;
			// 查一条美食
			if($stateParams.id) {
				Food.get($stateParams.id).then(function(result){
					
					if(result.status == 200) { 
						$scope.food = result.data
						$scope.food.oldpic = result.data.pic
						console.log($scope.food)
						// 重置推荐值
						$scope.food.is_recommend = $scope.recommendArr[$scope.food.is_recommend]
						// 查一条分类
						FoodCate.get($scope.food.cate_id).then(function(res){
							// 重置分类值
							$scope.food.cate = res.data
						})
					}
				})
			}
		}
	})
	// 添加功能
	$scope.save = function() {
		// if($scope.food.title == undefined) { 
		// 	alert('标题不能为空')
		// 	return false;
		// }
		// if($scope.food.price == undefined) { 
		// 	alert('价格不能为空')
		// 	return false;
		// }
		// 数据存储
		var data = {
			title: $scope.food.title,
			price: $scope.food.price,
			content: $scope.food.content,
			cate_id: $scope.food.cate.cate_id,
			is_recommend: $scope.food.is_recommend.id
		}

		if($scope.food.pic) {
			// 物理上传
			Upload.upload({
				url: '../api/admin/food.php?action=fileUpload',
				data: {file: $scope.food.pic}
			}).then(function(resp){
				console.log(resp)
				if(resp.data.code) {
					$scope.food.pic = resp.data.msg
					data.pic = resp.data.msg
					data.oldpic = $scope.food.oldpic
					if(!$scope.id) {
						Food.save(data).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/food
									$state.go('admin.food')
								}else{
									$state.reload()
								}
							}
						})
					}else{
						Food.update(data, $scope.id).then(function(result){
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
				}else{
					alert('上传图片失败')
					return false;
				}
			})
		}else{
			if(!$scope.id) {
				Food.save(data).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/food
							$state.go('admin.food')
						}else{
							$state.reload()
						}
					}
				})
			}else{
				Food.update(data, $scope.id).then(function(result){
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
	}

})