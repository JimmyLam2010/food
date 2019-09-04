app.controller('navCtrl', function($scope, Nav){
    Nav.query().then(function(result){
        if(result.status == 200) {
            $scope.data = result.data;
        }
    });
})