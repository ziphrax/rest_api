var REST_API = {
    app_alert: function (message){
        console.log(message);
    },
    authenticate: function ($scope,$http,callback){
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
        .success(callback);
    },
    user :{
        register: function($scope,$http,callback){
            var data = {
                name : $scope.name,
                password : $scope.password
            };
            $http({
                method: 'POST',
                url: namespace + '/authentication/new',
                data: $.param(data),
                headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .success(callback);
        }
    }
};
