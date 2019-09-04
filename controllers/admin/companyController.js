app.controller('companyCtrl', function($scope, Company, $state, Form){
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
		Company.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					Company.page($scope.limit, $scope.offset).then(function(result){
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
		Company.delete(id).then(function(result){
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
		Company.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('companyAddCtrl', function($scope, Company, $state, $stateParams, Upload){
	$scope.company = {}

	$scope.id = $stateParams.id;
	// 展示功能

	if($stateParams.id) {
		Company.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.company = result.data
				console.log($scope.company)
				// 查一条分类
				Company.get($scope.company.company_id)
			}
		})
	}
	// 添加功能
	$scope.save = function() {

		if($scope.company.title == undefined) { 
			alert('标题不能为空')
			return false;
		}

		var data = {
			title: $scope.company.title,
			pic: $scope.company.pic,
			phone: $scope.company.phone,
			tel: $scope.company.tel,
			postal_code: $scope.company.postal_code,
			address: $scope.company.address
		}

		if($scope.file) {
			// 物理上传
			Upload.upload({
				url: '../api/admin/company.php?action=fileUpload',
				data: {file: $scope.file}
			}).then(function(resp){
				console.log(resp)
				if(resp.data.code) {
					$scope.company.pic = resp.data.msg
					data.pic = resp.data.msg
					if(!$scope.id) {
						Company.save(data).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/company
									$state.go('admin.company')
								}else{
									$state.reload()
								}
							}
						})
					}else{
						Company.update(data, $scope.id).then(function(result){
							console.log(result)
							if(result.status == 200) {
								if(result.data.code == 1) {
									alert(result.data.msg);
									// $state 状态管理不是地址/admin/company
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
				Company.save(data).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/company
							$state.go('admin.company')
						}else{
							$state.reload()
						}
					}
				})
			}else{
				Company.update(data, $scope.id).then(function(result){
					console.log(result)
					if(result.status == 200) {
						if(result.data.code == 1) {
							alert(result.data.msg);
							// $state 状态管理不是地址/admin/company
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