'use strict';
angular.module('the_final')
  .directive('breakpoints', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        enquire.register("screen and (min-width: 45em)", {
          match : function() {
            $timeout(function() {
              scope.mobileScreen = false;
            }, 0);
            console.log(scope.mobileScreen);
          },

          // OPTIONAL
          // If supplied, triggered when the media query transitions
          // *from a matched state to an unmatched state*.
          unmatch : function() {
            $timeout(function() {
              scope.mobileScreen = true;
            }, 0);
            console.log(scope.mobileScreen);
          },

          // OPTIONAL
          // If supplied, triggered once, when the handler is registered.
          setup : function() {},

          // OPTIONAL, defaults to false
          // If set to true, defers execution of the setup function
          // until the first time the media query is matched
          deferSetup : true,

          // OPTIONAL
          // If supplied, triggered when handler is unregistered.
          // Place cleanup code here
          destroy : function() {}
        });
      }
    }
  });
