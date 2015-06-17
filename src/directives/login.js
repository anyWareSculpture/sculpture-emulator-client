const module = angular.module('login', ['ngMaterial']);
module.directive("login", () => {
  return {
    restrict: 'E',
    templateUrl: 'templates/login.html',
    controllerAs: 'login',
    controller: ['$scope', ($scope) => {
    	$scope.login = () => {
    		$scope.loginComplete();
    	};
    }]
	};
})