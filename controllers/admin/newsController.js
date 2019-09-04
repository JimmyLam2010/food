app.controller('newsCtrl', function($scope, News, $state, Form){
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
		News.count().then(function(result){
			console.log(result)
			if(result.status == 200) {
				if(result.data['c'] > 0) { // 有数据
					// 总数
					$scope.totalItems = result.data['c'];
					// 下标
					$scope.offset =  ($scope.currentPage - 1) * $scope.limit;
					// 分页查询
					News.page($scope.limit, $scope.offset).then(function(result){
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
		News.delete(id).then(function(result){
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
		News.deleteByIds(idsJson).then(function(result){
			if(result.status == 200) {
				alert(result.data.msg)
				$state.reload()
			}
		})
	}

})

app.controller('newsAddCtrl', function($scope, News, $state, $stateParams, Upload){

	$scope.news = {}
	// 设置是否推荐默认值
	$scope.id = $stateParams.id;
	// 展示功能
	if($stateParams.id) {
		News.get($stateParams.id).then(function(result){		
			if(result.status == 200) { 
				$scope.news = result.data
				console.log($scope.news)
				// 查一条分类
				News.get($scope.news.news_id)
			}
		})
	}

	// 添加功能
	$scope.save = function() {

		if($scope.news.title == undefined) { 
			alert('标题不能为空')
			return false;
		}

		var data = {
			title: $scope.news.title,
			pic: $scope.news.pic,
			description: $scope.news.description,
			create_time: $scope.news.create_time,
			content: $scope.news.content
		}

		if(!$scope.id) {
			News.save(data).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/news
						$state.go('admin.news')
					}else{
						$state.reload()
					}
				}
			})
		}else{
			News.update(data, $scope.id).then(function(result){
				console.log(result)
				if(result.status == 200) {
					if(result.data.code == 1) {
						alert(result.data.msg);
						// $state 状态管理不是地址/admin/news
						$state.reload()
					}else{
						alert(result.data.msg);
					}
				}
			})
		}
	}

})