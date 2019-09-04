app.controller('footerCtrl', function($scope, Footer){
    Footer.query().then(function(result){
        if(result.status == 200) {
            $scope.data = result.data;
        }
    });
})