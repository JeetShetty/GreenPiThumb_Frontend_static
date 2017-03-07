'use strict';

angular.module('greenPiThumbApp.version', [
  'greenPiThumbApp.version.interpolate-filter',
  'greenPiThumbApp.version.version-directive'
])

.value('version', '0.1');
