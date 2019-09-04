app.factory('News', function ($http) {
	var API = '../api/admin/news.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}newsOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}news` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}news&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}newsCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}newsDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}newsDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}newsAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}newsAdd&id=${id}`, data )
		}
	};
})