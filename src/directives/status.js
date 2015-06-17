const module = angular.module('status', ['ngMaterial']);
module.directive("status", () => {
  return {
    restrict: 'E',
    templateUrl: 'templates/status.html',
    controllerAs: 'status',
    controller: ['$scope', ($scope) => {

    }]
	};
})