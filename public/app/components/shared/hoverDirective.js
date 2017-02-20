angular.module('marsRover')
  .directive('hover', function () {
    return {
      link: function ($scope, element, attrs) {
        element.bind('mouseenter', function () {
          element.css('background-color', '#ff9696');
        });
        element.bind('mouseleave', function () {
          element.css('background-color', 'white');
        });
      }
    };
  });