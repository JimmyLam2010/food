app.controller('indexCtrl', function($scope, News, Page, Food){
    $scope.newsLimit = 8;

	News.query($scope.newsLimit).then(function(result){
        if(result.status == 200) {
            $scope.news = result.data;
        }
    });

    Page.get(1).then(function(result){
        if(result.status == 200) {
            $scope.page = result.data;
        }
    });

    // 可选择的页数范围
	$scope.maxSize = 2;
	// 每页显示的数量
	$scope.foodLimit = 8;
	// 设置page默认值
	$scope.currentPage =  1
	// 设置总条数
	$scope.totalItems = 0

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
					$scope.offset =  ($scope.currentPage - 1) * $scope.foodLimit;
					// 分页查询
					Food.page($scope.foodLimit, $scope.offset).then(function(result){
						console.log(result)
						if(result.status == 200) {
							$scope.food = result.data;
						}
					})
				}
			}
		})
    }
     
	// 执行列表查询
	$scope.page()
})