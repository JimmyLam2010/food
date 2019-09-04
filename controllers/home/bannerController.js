app.controller('bannerCtrl', function($scope, Banner){
    Banner.query().then(function(result){
        if(result.status == 200) {
            $scope.data = result.data;
        }
    });
})