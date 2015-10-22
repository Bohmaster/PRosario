'use strict';
angular
  .module('the_final')
  .directive('fileInput', function($parse) {
    return {
      restrict: 'A',
      link: function(scope, elm, attrs) {
        elm.bind('change', function() {
          $parse(attrs.fileInput)
            .assign(scope, elm[0].files);
          scope.$apply();
        })
      }
    }
  });
