app.factory('Region', function ($http) {
	var API = '../api/admin/region.php?action='
	return {
		get: function(id){
			return $http.get( `${API}regionOne&id=${id}` ) // promise
		},
		query: function(){
			return $http.get( `${API}region` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}region&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}regionCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}regionDelete&id=${id}`)
		},
		save: function(data) {
			return $http.post( `${API}regionAdd`, data )
		},
		update: function(data, id){
			return $http.post( `${API}regionAdd&id=${id}`, data )
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}regionDeleteByIds&ids=${ids}`)
		},
	};
})