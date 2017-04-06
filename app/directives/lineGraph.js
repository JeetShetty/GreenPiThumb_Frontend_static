'use strict';

angular.module('greenPiThumbApp.directives')
  .directive('lineGraph', ['d3Service', function(d3Service) {
    return {
      restrict: 'E',
      replace: false,
      scope: {data: '=chartData'},
      link: function(scope, element, attrs) {
        d3Service.d3().then(function(d3) {
          // Set the dimensions of the canvas / graph
          var margin = {top: 30, right: 20, bottom: 30, left: 50};
          var width = 900 - margin.left - margin.right;
          var height = 450 - margin.top - margin.bottom;

          // Parse the date / time
          var parseTimestamp = d3.utcParse('%Y%m%dT%H%M%Z');

          // Set the ranges
          var x = d3.scaleTime().range([0, width]);
          var y = d3.scaleLinear().range([height, 0]);

          // Define the axes
          var xAxis = d3.axisBottom(x)
            .ticks(5);
          var yAxis = d3.axisLeft(y)
            .ticks(5);

          // Define the line
          var valueline = d3.line()
            .x(function(d) { return x(d.timestamp); })
            .y(function(d) { return y(d.value); });

          var updateGraph = function(data) {
            data.forEach(function(d) {
              d.timestamp = parseTimestamp(d.timestamp);
              d.value = scope.$eval(attrs.valueProperty, d);
            });

            // Add the svg canvas
            var svg = d3.select(element[0])
              .append('svg')
                .attr('width', width + margin.left + margin.right)
                .attr('height', height + margin.top + margin.bottom)
              .append('g')
                .attr('transform',
                      'translate(' + margin.left + ',' + margin.top + ')');

            // Scale the range of the data
            x.domain(d3.extent(data, function(d) { return d.timestamp; }));
            y.domain([0, d3.max(data, function(d) { return d.value; })]);

            // Add the valueline path.
            svg.append('path')
              .attr('class', 'line')
              .attr('d', valueline(data));

            // Add the X Axis
            svg.append('g')
              .attr('class', 'x axis')
              .attr('transform', 'translate(0,' + height + ')')
              .call(xAxis);

            // Add the Y Axis
            svg.append('g')
              .attr('class', 'y axis')
              .call(yAxis);
          };
          scope.$watch('data', function(newValue) {
            if (!newValue) { return; }
            updateGraph(newValue);
          });
        });
      }
    };
  }]);
