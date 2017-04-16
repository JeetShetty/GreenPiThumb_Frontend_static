'use strict';

describe('greenPiThumbApp controller', function() {
  var mockScope = {};
  var controller;
  var backend;

  beforeEach(angular.mock.module('greenPiThumbApp'));

  beforeEach(angular.mock.inject(function($httpBackend) {
    backend = $httpBackend;
    backend.expect('GET', '/temperatureHistory.json').respond(
      [
        {'timestamp': '20170408T1315Z', 'temperature': 22.0},
        {'timestamp': '20170408T1330Z', 'temperature': 24.0},
        {'timestamp': '20170408T1345Z', 'temperature': 25.0}
      ]);
    backend.expect('GET', '/humidityHistory.json').respond(
      [
        {'timestamp': '20170408T1315Z', 'humidity': 51.0},
        {'timestamp': '20170408T1330Z', 'humidity': 52.0},
        {'timestamp': '20170408T1345Z', 'humidity': 53.0}
      ]);
    backend.expect('GET', '/lightHistory.json').respond(
      [
        {'timestamp': '20170408T1315Z', 'light': 66.1},
        {'timestamp': '20170408T1330Z', 'light': 66.2},
        {'timestamp': '20170408T1345Z', 'light': 66.3}
      ]);
    backend.expect('GET', '/soilMoistureHistory.json').respond(
      [
        {'timestamp': '20170408T1315Z', 'soil_moisture': 888.0},
        {'timestamp': '20170408T1330Z', 'soil_moisture': 888.1},
        {'timestamp': '20170408T1345Z', 'soil_moisture': 888.2}
      ]);
  }));

  beforeEach(angular.mock.inject(function($controller, $rootScope, $http) {
    mockScope = $rootScope.$new();
    controller = $controller('DashboardCtrl', {
      $scope: mockScope,
      $http: $http
    });
    backend.flush();
  }));

  it('makes all expected AJAX requestse', function() {
    backend.verifyNoOutstandingExpectation();
  });

  it('Creates latest* variables', function() {
    expect(mockScope.latestTemperature).toEqual(25.0);
    expect(mockScope.latestHumidity).toEqual(53.0);
    expect(mockScope.latestLightLevel).toEqual(66.3);
    expect(mockScope.latestSoilMoisture).toEqual(888.2);
  });

  it('Creates full history variables', function() {
    expect(mockScope.temperature).toBeDefined();
    expect(mockScope.humidity).toBeDefined();
    expect(mockScope.lightLevel).toBeDefined();
    expect(mockScope.soilMoisture).toBeDefined();
  });
});
