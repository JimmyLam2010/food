app.factory('Page', function ($http) {
	var API = 'api/page.php?action='
	return {
		query: function(limit){ // 查询所有
			return $http.get( `${API}single_page&limit=${limit}` ) // promise
        },
        get: function(id){ // 查询一条
			return $http.get( `${API}single_pageOne&id=${id}` ) // promise
		},
	};
})