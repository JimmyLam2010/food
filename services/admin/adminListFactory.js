app.factory('AdminList', function ($http) {
	var API = '../api/admin/admin.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}adminOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}admin` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}admin&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}adminCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}adminDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}adminDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}adminAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}adminAdd&id=${id}`, data )
		}
	};
})