angular.module('myApp').controller('LoginController', function ($scope, $location, $http, $window,$state) {

    $scope.user = {name: '', password: ''};

    $scope.isAuthenticated = function(){
        return $window.sessionStorage.token? $window.sessionStorage.token.length > 0 : false;
    };

    $scope.logout = function(){
        $scope.user = {name: '', password: ''};
        $window.sessionStorage.token = '';
        $state.go('home');
    }
    $scope.dashboard = function(){
        $state.go('dashboard');
    }

    $scope.login = function () {
        $http
            .post('/api/v1/authentication', $scope.user)
            .success(function (data, status, headers, config) {
                $window.sessionStorage.token = data.token;
                $state.go('dashboard');
            })
            .error(function (data, status, headers, config) {
                // Erase the token if the user fails to log in
                delete $window.sessionStorage.token;
            });
    };

    $scope.register = function () {
        alert('not yet implemented');
    };

}).controller('ClientIndexController',function($scope,$stateParams, Client) {

  $scope.page_name = 'Clients';

}).controller('ClientListController',function($scope,$stateParams, Client) {

  $scope.clients = Client.query();

}).controller('ClientDetailsController',function($scope,$state,$stateParams,Client) {

  $scope.clientDetail = Client.get({id:$stateParams.clientsId});

  $scope.save = function(){
    $scope.clientDetail.$update(function(data){
      $state.reload();
    });
  }

});;
