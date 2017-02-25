'use strict';

// d3 service
// adapted from: https://github.com/EpiphanyMachine/d3AngularIntegration/blob/master/app/scripts/services/d3.js

angular.module('d3', [])
  .factory('d3Service', ['$document', '$q', '$rootScope',
    function($document, $q, $rootScope) {
      var d = $q.defer();
      function onScriptLoad() {
        // Load client in the browser
        $rootScope.$apply(function() {
          d.resolve($document[0].defaultView.d3);
        });
      }
      // Create a script tag with d3 as the source and call our onScriptLoad
      // callback when it has been loaded
      var scriptTag = $document[0].createElement('script');
      scriptTag.type = 'text/javascript';
      scriptTag.async = true;
      scriptTag.src = '/bower_components/d3/d3.min.js';
      scriptTag.onreadystatechange = function() {
        if (this.readyState == 'complete') { onScriptLoad(); }
      };
      scriptTag.onload = onScriptLoad;

      $document[0].getElementsByTagName('body')[0].appendChild(scriptTag);

      return {
        d3: function() { return d.promise; }
      };
    }]);
