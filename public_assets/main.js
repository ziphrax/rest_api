var app = angular.module('restAPP',[]);
var namespace = '/api/v1';

app.controller('UserCtrl',function($scope,$http){
    $scope.name="";
    $scope.password="";
    $scope.token="";
    $scope.isAuthenticated = function(){
        return $scope.token.length > 0;
    };
    $scope.login = function(){
        authenticate($scope,$http);
    };
});

function app_alert(message){
    console.log(message);
}

function authenticate($scope,$http){
    var data = {
        name : $scope.name,
        password : $scope.password
    };
    $http({
        method: 'POST',
        url: namespace + '/authentication',
        data: $.param(data),
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
        .success(function(res){
            if(res.success){
                $scope.token = res.token;
            } else {
                app_alert(res.message);
            }
        });
}
