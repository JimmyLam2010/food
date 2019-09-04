app.factory('FoodCate', function ($http) {
	var API = '../api/admin/foodCate.php?action='
	return {
		get: function(id){
			return $http.get( `${API}foodCateOne&id=${id}` ) // promise
		},
		query: function(){
			return $http.get( `${API}foodCateAll` ) // promise
		},
		page: function(limit, offset){
			return $http.get( `${API}foodCate&limit=${limit}&offset=${offset}` ) // promise
		},
		count: function() {
			return $http.get( `${API}foodCateCount` )
		},
		delete: function(id) {
			return $http.delete(`${API}foodCateDelete&id=${id}`)
		},
		save: function(data) {
			return $http.post( `${API}foodCateAdd`, data )
		},
		update: function(data, id){
			return $http.post( `${API}foodCateAdd&id=${id}`, data )
		},
		deleteByIds: function(ids) { // 全选删除
			return $http.get(`${API}foodCateDeleteByIds&ids=${ids}`)
		},
	};
})