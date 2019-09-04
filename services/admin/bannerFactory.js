app.factory('Banner', function ($http) {
	var API = '../api/admin/banner.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}bannerOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}banner` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}banner&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}bannerCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}bannerDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}bannerDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}bannerAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}bannerAdd&id=${id}`, data )
		}
	};
})