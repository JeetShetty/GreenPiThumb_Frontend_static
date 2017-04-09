'use strict';

var model = {};

var greenPiThumbApp = angular.module('greenPiThumbApp', [
  'greenPiThumbApp.directives',
  'greenPiThumbApp.version'
  ]);

angular.module('d3', []);
angular.module('greenPiThumbApp.directives', ['d3']);

greenPiThumbApp.run(function($http) {
  $http.get('/temperatureHistory.json').success(function(temperatureHistory) {
    model.latestTemperature =
      temperatureHistory[temperatureHistory.length - 1].temperature;
    model.temperature = temperatureHistory;
  });
  $http.get('/humidityHistory.json').success(function(humidityHistory) {
    model.humidity = humidityHistory;
    model.latestHumidity =
      humidityHistory[humidityHistory.length - 1].humidity;
  });
  $http.get('/lightHistory.json').success(function(lightHistory) {
    model.lightLevel = lightHistory;
    model.latestLightLevel =
      lightHistory[lightHistory.length - 1].light;
  });
  $http.get('/soilMoistureHistory.json').success(function(moistureHistory) {
    model.soilMoisture = moistureHistory;
    model.latestSoilMoisture =
      moistureHistory[moistureHistory.length - 1].soil_moisture;
  });
});

greenPiThumbApp.controller('DashboardCtrl', function($scope) {
  $scope.dashboard = model;
});
