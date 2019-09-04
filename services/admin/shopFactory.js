app.factory('Shop', function ($http) {
	var API = '../api/admin/shop.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}shopOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}shop` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}shop&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}shopCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}shopDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}shopDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}shopAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}shopAdd&id=${id}`, data )
		}
	};
})