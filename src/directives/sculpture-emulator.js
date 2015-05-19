let module = angular.module('sculpture-emulator', ['ngMaterial']);

module.directive("sculptureEmulator", () => {
  return {
    restrict: 'E',
    templateUrl: 'templates/sculpture-emulator.html',
    controllerAs: 'emulator',
    controller: () => {
      // Your code here
    }
  };
});
