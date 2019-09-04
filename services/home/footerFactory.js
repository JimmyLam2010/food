app.factory('Footer', function ($http) {
	var API = 'api/footer.php?action='
	return {
		query: function(){ // 查询所有
			return $http.get( `${API}friendlyLink` ) // promise
		}
	};
})