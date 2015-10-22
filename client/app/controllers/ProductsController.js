'use strict';
angular.module('the_final')
  .controller('ProductsController',
    function($rootScope, $scope, $stateParams, Product, Category, SubCategory) {
      // init
      $scope.categories = [];
      $scope.products = [];

      if ($stateParams.categoryId || $stateParams.subCategoryId) {
        $scope.categorySelected = true;
      } else {
        $scope.categorySelected = false;
      }

      // pagination
      var limit = 12;
      var page = $stateParams.page;
      if (page == "1") {
        var offset = null;
      } else {
        var offset = page * limit - limit;
      }

      $scope.pages = [];

      console.log($stateParams);

      loadCategories();
      loadProducts();

      // check product state
      if ($stateParams.categoryId) {
        Product.find({
          filter: {
            limit: limit,
            offset: offset,
            where: {
              categoryId: $stateParams.categoryId
            }
          }
        }, function(data) {
          $scope.products = data;
        });
        Product.count({
          where: {
            categoryId: $stateParams.categoryId
          }
        }, function(data) {
          var totalCount = data.count;
          var pages = totalCount / limit;

          for	(var index = 0; index < pages; index++) {
            var _page = index + 1;
            $scope.pages.push(_page.toString());
          }
          console.log(data.count);
        });
      } else if ($stateParams.subCategoryId) {
        Product.find({
          filter: {
            limit: limit,
            offset: offset,
            where: {
              subCategoryId: $stateParams.subCategoryId
            }
          }
        }, function(data) {
          $scope.products = data;
          console.log(data);
        });
        Product.count({
            where: {
              subCategoryId: $stateParams.subCategoryId
            }
          }, function(data) {
            var totalCount = data.count;
            var pages = totalCount / limit;

            for	(var index = 0; index < pages; index++) {
              var _page = index + 1;
              $scope.pages.push(_page.toString());
          }
        });
      } else if ($stateParams.query) {
          Product.find({
            filter: {
              where: {
                name: {
                  like: $stateParams.query + '%'
                }
              }
            }
          }, function(data) {
            $scope.products = data;
            console.log(data);
          }, function(err) {
            console.log(err);
          });
      }
      else {
        Product.count(function(data) {
          var totalCount = data.count;
          var pages = totalCount / limit;

          for	(var index = 0; index < pages; index++) {
            var _page = index + 1;
          $scope.pages.push(_page.toString());
         }
         console.log(data.count);
        });
      }

      // public methods
      $scope.selectCategory = function(categoryId) {
        SubCategory.find({
          filter: {
            where: {
              categoryId: categoryId
            }
          }
        }, function(data) {
          $scope.currentCategory = data;
          $scope.categorySelected = true;
        });
      };

      $scope.toggleNav = function() {
        if ($scope.mobileNav) {
          $scope.mobileNav = false;
        } else {
          $scope.mobileNav = true;
        }
      };

      // loaders
      function loadCategories() {
        Category.find(function(data) {
          $scope.categories = data;
        });
      }

      function loadProducts() {
        Product.find({
          filter: {
            limit: limit,
            offset: offset
          }
        },function(data) {
          $scope.products = data;
        });
      }

      //console.log(page, offset);

      //console.log($scope.categorySelected);
  });
