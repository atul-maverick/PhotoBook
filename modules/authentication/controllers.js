'use strict';
 
angular.module('Authentication')
 
.controller('LoginController',
    ['$scope', '$rootScope', '$location', 'AuthenticationService','$http',
    function ($scope, $rootScope, $location, AuthenticationService,$http) {
        // reset login status
        AuthenticationService.ClearCredentials();
        $scope.message=''
        $scope.login = function () {
            $scope.dataLoading = true;
            AuthenticationService.Login($scope.username, $scope.password, function(response) {
                if(response.success) {
                    AuthenticationService.SetCredentials($scope.username, $scope.password);
                    $location.path('/');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                }
            });
        };

        $scope.signup = function(){
            var url="/signup"
            $scope.newdataLoading = true;
            $http.post(url,{"username":$scope.newusername,"password":$scope.newpassword,"gender":$scope.gender}).success(function(data){
                    $scope.message=data
                    $scope.newdataLoading = false;

            });
            $location.path('/');
        }
    }]);