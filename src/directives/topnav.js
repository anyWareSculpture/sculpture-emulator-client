const module = angular.module('topnav', ['ngMaterial']);
module.directive("topnav", () => {
  return {
    restrict: 'E',
    templateUrl: 'templates/topnav.html',
    controllerAs: 'topnav',
    controller: ['$scope', ($scope) => {
    	$scope.topnav = () => {
    		$scope.loginComplete();
    	};
    }]
	};
})