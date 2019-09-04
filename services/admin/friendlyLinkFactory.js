app.factory('FriendlyLink', function ($http) {
	var API = '../api/admin/friendlyLink.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}friendlyLinkOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}friendlyLink` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}friendlyLink&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}friendlyLinkCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}friendlyLinkDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}friendlyLinkDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}friendlyLinkAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}friendlyLinkAdd&id=${id}`, data )
		}
	};
})