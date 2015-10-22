'use strict';
angular.module('the_final')
  .controller('MainController', function($rootScope, $scope, $modal, Product, Event, Recipes) {

    $scope.destacados = [];

    $scope.newsImportant = [];

    $scope.news = [];

    $scope.recetas = [];

    $scope.expandRecipe = function(id) {

      $modal.open({
        templateUrl: 'app/views/admin/recipes/expand.html',
        size: 'lg',
        resolve: {
          recipe: function(Recipes) {
            return Recipes.findById({id: id});
          }
        },
        controller: function($scope, recipe) {
          $scope.recipe = recipe;
        }
      });

    };

    function loadRecetas () {
      Recipes.find(function(data) {
        $scope.recetas = data;
        console.log(data);
      });
    }

    loadRecetas();

    function loadDestacados() {
      Product.find({
        filter: {
          where: {
            destacado: true
          },
          order: 'id DESC',
          limit: 8
        }
      }, function(destacados) {
        $scope.destacados = destacados;
      });
    }

    loadDestacados();

    function loadNewsDestacada() {
      Event.find({
        filter: {
          where: {
            important: true
          },
          limit: 1,
          order: 'id DESC'
        }
      }, function(data) {
        console.log(data);
        $scope.newsImportant = data[0];
      })
    }

    loadNewsDestacada();

    function loadNews() {
      Event.find({
        filter: {
          where: {
            important: false
          },
          limit: 2,
          order: 'id DESC'
        }
      }, function(data) {
        $scope.news = data;
        console.log(data);
      });
    }

    loadNews();

  });

