const module = angular.module('sculpture-emulator', ['ngMaterial']);

const StreamingClient = require('shared/streaming-client');
window.StreamingClient = StreamingClient;

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
