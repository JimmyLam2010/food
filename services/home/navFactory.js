app.factory('Nav', function ($http) {
	var API = 'api/nav.php?action='
	return {
		query: function(){ // 查询所有
			return $http.get( `${API}nav` ) // promise
		}
	};
})