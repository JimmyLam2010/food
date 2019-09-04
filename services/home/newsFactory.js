app.factory('News', function ($http) {
	var API = 'api/news.php?action='
	return {
		query: function(limit){ // 查询所有
			return $http.get( `${API}news&limit=${limit}` ) // promise
		}
	};
})