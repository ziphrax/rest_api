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
        REST_API.authenticate($scope,$http,function(res){
            if( res.success ) { $scope.token = res.token; }
            else { app_alert(res.message); }
        });
    };

    $scope.logout = function(){
        $scope.name="";
        $scope.password="";
        $scope.token="";
    };

    $scope.register = function(){
        REST_API.user.register($scope,$http,function(res){
            if( res.success ) { $scope.login() }
            else { app_alert(res.message); }
        });
    };
});
