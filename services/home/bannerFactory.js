app.factory('Banner', function ($http) {
	var API = 'api/banner.php?action='
	return {
		query: function(){ // 查询所有
			return $http.get( `${API}banner` ) // promise
		}
	};
})