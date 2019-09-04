app.factory('Setting', function ($http) {
	var API = '../api/admin/setting.php?action='
	return {
		get: function(id){ // 查询一条
			return $http.get( `${API}settingOne&id=${id}` ) // promise
		},
		query: function(){ // 查询所有
			return $http.get( `${API}setting` ) // promise
		},
		page: function(limit, offset){ // 分页查询
			return $http.get( `${API}setting&limit=${limit}&offset=${offset}` )
		},
		count: function() { // 查总数
			return $http.get( `${API}settingCount` )
		},
		delete: function(id) { // 删除
			return $http.get(`${API}settingDelete&id=${id}`)
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}settingDeleteByIds&ids=${ids}`)
		},
		save: function(data) { // 添加
			return $http.post( `${API}settingAdd`, data )
		},
		update: function(data, id) { // 添加
			return $http.post( `${API}settingAdd&id=${id}`, data )
		}
	};
})