app.factory('Page', function ($http) {
	var API = '../api/admin/page.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}single_pageOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}single_page` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}single_page&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}single_pageCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}single_pageDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}single_pageDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}single_pageAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}single_pageAdd&id=${id}`, data )
		}
	};
})