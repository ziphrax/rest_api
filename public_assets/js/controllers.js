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
      $state.go('clients.details',{clientsId:$stateParams.clientsId});
    });
  }

  $scope.delete = function(){
    $scope.clientDetail.$delete(function(data){
     $state.go('^',{reload:true});
    });
  }

})
.controller('ClientNewController',function($scope,$state,$stateParams,Client) {

  $scope.clientDetail = new Client();

  $scope.save = function(){
    $scope.clientDetail.$save(function(data){
        console.log(data);
      $state.go('clients.details',{clientsId:data._id});
    });
  }

  $scope.cancel = function(){
    $scope.clientDetail.$delete(function(data){
      $state.go('^',{reload:true});
    });
  }

}).controller('ProgrammeIndexController',function($scope,$stateParams, Programme) {

  $scope.page_name = 'Programmes';

}).controller('ProgrammeListController',function($scope,$stateParams, Programme) {

  $scope.programmes = Programme.query();

}).controller('ProgrammeDetailsController',function($scope,$state,$stateParams,Programme) {

  $scope.programmeDetail = Programme.get({id:$stateParams.programmesId});

  $scope.save = function(){
    $scope.programmeDetail.$update(function(data){
      $state.reload();
      $state.go('programmes.details',{programmesId:$stateParams.programmesId});
    });
  }

  $scope.delete = function(){
    $scope.programmeDetail.$delete(function(data){
     $state.go('^',{reload:true});
    });
  }

})
.controller('ProgrammeNewController',function($scope,$state,$stateParams,Programme) {

  $scope.programmeDetail = new Programme();

  $scope.save = function(){
    $scope.programmeDetail.$save(function(data){
        console.log(data);
      $state.go('programmes.details',{programmesId:data._id});
    });
  }

  $scope.cancel = function(){
    $scope.programmeDetail.$delete(function(data){
      $state.go('^',{reload:true});
    });
  }

});
