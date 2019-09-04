app.factory('Company', function ($http) {
	var API = '../api/admin/company.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}companyOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}company` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}company&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}companyCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}companyDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}companyDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}companyAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}companyAdd&id=${id}`, data )
		}
	};
})