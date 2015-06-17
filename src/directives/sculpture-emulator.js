const module = angular.module('sculpture-emulator', ['ngMaterial', 'login', 'status', 'topnav']);

const StreamingClient = require('shared/streaming-client');

const CLIENT_CONNECTION_OPTIONS = {
  protocol: "ws",
  username: "anyware",
  password: "anyware",
  host: "connect.shiftr.io:1884"
};

module.directive("sculptureEmulator", () => {
  return {
    restrict: 'E',
    templateUrl: 'templates/sculpture-emulator.html',
    controllerAs: 'emulator',
    controller: ['$scope', ($scope) => {
      const client = new StreamingClient(CLIENT_CONNECTION_OPTIONS);

      $scope.clientConnected = client.connected;

      const updateConnectionStatus = () => {
        $scope.$apply(() => $scope.clientConnected = client.connected);
      };
      client.on(StreamingClient.EVENT_CONNECT, updateConnectionStatus);
      client.on(StreamingClient.EVENT_DISCONNECT, updateConnectionStatus);

      client.on(StreamingClient.EVENT_ERROR, (error) => {
        console.error(error);
      });

      $scope.loginComplete = () => {
        $scope.loggedIn = true;
        $scope.showStatus = true;
      }
    }]
  };
});
