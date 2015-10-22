'use strict';
angular.module('the_final')
  .directive('header', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/views/header.html'
    }
  })
  .directive('slider', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/slider.html'
      }
  })
  .directive('inicio', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/inicio.html'
      }
  })
  .directive('empresa', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/empresa.html'
      }
   })
  .directive('destacados', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/destacados.html'
      }
  })
  .directive('delivery', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/delivery.html'
      }
  })
  .directive('recetas', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/recetas.html'
      }
  })
  .directive('novedades', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/novedades.html'
      }
  })
  .directive('contacto', function() {
      return {
        restrict: 'E',
        templateUrl: 'app/directives/views/contacto.html'
      }
  })
  .directive('productsHeader', function() {
    return {
      restrict: 'E',
      templateUrl: 'app/directives/views/productsHeader.html'
    }
  });
