app.factory('Food', function ($http) {
	var API = 'api/food.php?action='
	return {
		query: function(){ // 查询所有
			return $http.get( `${API}food` ) // promise
        },
        get: function(id){ // 查询一条
			return $http.get( `${API}foodOne&id=${id}` ) // promise
        },
        page: function(limit, offset){ // 分页查询
			return $http.get( `${API}food&limit=${limit}&offset=${offset}` )
        },
        count: function() { // 查总数
			return $http.get( `${API}foodCount` )
		},
	};
})