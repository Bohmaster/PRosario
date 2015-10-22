'use strict';
angular.module('the_final')
  .run(function($rootScope, $anchorScroll) {

    $rootScope.$on('$viewContentLoaded', function(event) {

      Webflow.ready();

    });

    $rootScope.$on('$stateChangeSuccess', function() {
      $anchorScroll();
    });

  });
