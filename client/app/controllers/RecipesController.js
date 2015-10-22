'use strict';
angular.module('the_final')
  .controller('RecipesController', function($scope, $http, $modal, Recipes) {

    $scope.recipes = [];

    $scope.recipe = {};

    function loadRecipes () {
      Recipes.find(function(data) {
        $scope.recipes = data;
      })
    }

    loadRecipes();

    $scope.upload = function() {
      var fd = new FormData();
      angular.forEach($scope.files, function(file) {
        fd.append('file', file);
      });
      $http.post('/api/containers/images/upload',
        fd, {
          transformRequest: angular.identity,
          headers: {'Content-Type': undefined}
        }
      ).success(function(d){
          console.log(d);
          console.log($scope.files);
        })
        .error(function(e) {
          console.log(e);
        });
    };

    $scope.createRecipe = function() {
      Recipes.create({
        recipe: $scope.files[0].name
      }, function(success) {
        $scope.upload();
        loadRecipes();
      });
    }

    $scope.removeRecipe = function(id) {
      Recipes.deleteById({id: id}, function(success) {
        loadRecipes();
      })
    }

  });
