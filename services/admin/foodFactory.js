app.factory('Food', function ($http) {
	var API = '../api/admin/food.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}foodOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}food` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}food&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}foodCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}foodDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}foodDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}foodAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}foodAdd&id=${id}`, data )
		}
	};
})