angular.module('restAPP.controllers',[]).controller('UserCtrl', function ($scope, $http, $window) {

    $scope.user = {name: '', password: ''};
    $scope.loggedInTime="";

    $scope.isAuthenticated = function(){
        return $window.sessionStorage.token.length > 0;
    };

    $scope.logout = function(){
        $scope.user = {name: '', password: ''};
        $window.sessionStorage.token = '';
    }

    $scope.login = function () {
        $http
            .post('/api/v1/authentication', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $scope.loggedInTime = new Date();
                $scope.message = 'Welcome';
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
            });
    };
    
    $scope.register = function () {
        alert('not yet implemented');
    };

});
