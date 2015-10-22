'use strict';
angular.module('the_final')
  .controller('AdminController',
    function($rootScope, $scope, $http, $modal, Product, Category, SubCategory) {
      $scope.products = [];
      $scope.product = {};
      $scope.categories = [];
      $scope.subCategories = [];
      $scope.merca = "merca";

      loadCategories();
      loadProducts();

      // public methods
      $scope.addProduct = function() {
        Product.create({
          name: $scope.product.name,
          price: $scope.product.price,
          categoryId: $scope.product.categoryId,
          subCategoryId: $scope.product.subCategoryId,
          destacado: $scope.product.destacado,
          image: $scope.files[0].name,
          codigo: $scope.product.codigo
        }, function(data) {
          console.log('Producto creado');
          console.log($scope.product);
          loadProducts();
        });
        $scope.upload();
      };

      $scope.deleteProduct = function(pId) {
        Product.deleteById({
          id: pId
        }, function(data) {
          console.log('Element removed');
          loadProducts();
        })
      };

      $scope.editProduct = function(modelId) {
        $modal.open({
          templateUrl: 'app/views/admin/products/edit.html',
          resolve: {
            product: function(Product) {
              return Product.findById({id: modelId});
            }
          },
          controller: function($scope, $rootScope, $http, product, Product, Category, SubCategory) {
            $scope.product = product;
            $scope.categories = [];
            $scope.subCategories = [];

            loadCategories();

            function loadSubCategories() {
              SubCategory.find({
                filter: {
                  where: {
                    categoryId: $scope.product.categoryId
                  }
                }
              }, function(data){
                $scope.subCategories = data;
                console.log("!!!!!!!", data);
              })
            }

            function loadCategories() {
              Category.find(function(data){
                $scope.categories = data;
              })
            }

            function getCategories() {
              Category.findById({
                id: $scope.product.categoryId
              }, function(data) {
                $scope.category = data;
                console.log(data);
                console.log($scope.categoryId);
              }, function(err) {
                console.log(err);
              });
              SubCategory.findById({
                id: $scope.product.subCategoryId
              }, function(data) {
                $scope.subCategoryId = data;
                console.log($scope.subCategoryId);
              });
            }

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

            $scope.submitEdition = function() {
              if ($scope.files) {
                $http.put('/api/products/' + modelId, {
                  name: $scope.product.name,
                  price: $scope.product.price,
                  destacado: $scope.product.destacado,
                  image: $scope.files[0].name,
                  categoryId: $scope.product.categoryId,
                  subCategoryId: $scope.product.subCategoryId,
                  codigo: $scope.product.codigo
                })
                  .then(function(data) {
                    console.log(data);
                    $scope.upload();
                    $rootScope.$broadcast('producto.editado');
                    $scope.$close(data);
                  });
              } else {
                $http.put('/api/products/' + modelId, {
                  name: $scope.product.name,
                  price: $scope.product.price,
                  destacado: $scope.product.destacado,
                  categoryId: $scope.product.categoryId,
                  subCategoryId: $scope.product.subCategoryId,
                  codigo: $scope.product.codigo
                })
                  .then(function(data) {
                    console.log(data);
                    $rootScope.$broadcast('producto.editado');
                    $scope.$close(data);
                });
              }
            };

            $('#category').on('input', function() {
              var x = $('#category').val();
              var z = $('#categories');
              var val = $(z).find('option[value="' + x + '"]');
              var endVal = val.attr('id');
              console.log(x, z, val);
              $scope.product.categoryId = endVal;
            });

            $('#category').on('focusout', function() {
              console.log('focus!');
              loadSubCategories();
            });

            $('#subCategory').on('input', function() {
              var x = $('#subCategory').val();
              var z = $('#subCategories');
              var val = $(z).find('option[value="' + x + '"]');
              var endVal = val.attr('id');
              $scope.product.subCategoryId = endVal;
              console.log(endVal);
            });

            $('#prueba').on('input', function() {
              console.log('!!!!!!!!!!!!!!!!');
            });

          }
        });
      };

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

      // loaders
      function loadCategories() {
        Category.find(function(data){
          $scope.categories = data;
        })
      }

      function loadSubCategories() {
        SubCategory.find({
          filter: {
            where: {
              categoryId: $scope.product.categoryId
            }
          }
        }, function(data){
          $scope.subCategories = data;
        })
      }

      function loadProducts() {
        Product.find({
          filter: {
            limit: 5,
            order: 'id DESC'
          }
        },function(data) {
          $scope.products = data;
        });
      }

      // bindings
      $('#category').on('input', function() {
        var x = $('#category').val();
        var z = $('#categories');
        var val = $(z).find('option[value="' + x + '"]');
        var endVal = val.attr('id');
        console.log(x, z, val);
        $scope.product.categoryId = endVal;
      });

      $('#category').on('focusout', function() {
        console.log('sabe');
        console.log($scope.product.categoryId);
        loadSubCategories();
      });

      $('#subCategory').on('input', function() {
        var x = $('#subCategory').val();
        var z = $('#subCategories');
        var val = $(z).find('option[value="' + x + '"]');
        var endVal = val.attr('id');
        $scope.product.subCategoryId = endVal;
      });

      $scope.$on('producto.editado', function(event) {
        loadProducts();
      });

    });
