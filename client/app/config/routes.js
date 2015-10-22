'use strict';
angular.module('the_final')
  .config(function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('app', {
        abstract: true,
        url: '/app',
        templateUrl: 'app/views/app.html',
        controller: 'MainController'
      })
      .state('app.home', {
        url: '',
        templateUrl: 'app/views/home.html'
      })
      .state('app.admin', {
        abstract: true,
        url: '/admin',
        templateUrl: 'app/views/admin/main.html'
      })
      .state('app.admin.products', {
        url: '/productos',
        templateUrl: 'app/views/admin/products/add.html',
        controller: 'AdminController'
      })
      .state('app.admin.news', {
        url: '/novedades',
        templateUrl: 'app/views/admin/news/add.html',
        controller: 'NewsController'
      })
      .state('app.admin.recipes', {
        url: '/recetas',
        templateUrl: 'app/views/admin/recipes/add.html',
        controller: 'RecipesController'
      })
      .state('app.products', {
        abstract: true,
        url: '/products',
        templateUrl: 'app/views/products/main.html',
        controller: 'ProductsController'
      })
      .state('app.products.search', {
        url: '/search/:query',
        templateUrl: 'app/views/products/search.html',
        controller: 'ProductsController'
      })
      .state('app.products.list', {
        url: '/page/:page',
        templateUrl: 'app/views/products/list.html',
        controller: 'ProductsController'
      })
      .state('app.products.category', {
        url: '/categoria/:categoryId/:page',
        templateUrl: 'app/views/products/category.html',
        controller: 'ProductsController'
      })
      .state('app.products.subCategory', {
        url: '/subcategoria/:subCategoryId/:page',
        templateUrl: 'app/views/products/sub.html',
        controller: 'ProductsController'
      })
      .state('app.news', {
        abstract: true,
        url: '/news',
        templateUrl: 'app/views/news/main.html',
        controller: 'NewsController'
      })
      .state('app.news.list', {
        url: '/page/:page',
        templateUrl: 'app/views/news/list.html',
        controller: 'NewsController'
      })
      .state('app.news.detail', {
        url: '/detail/:noticeId',
        templateUrl: 'app/views/news/detail.html',
        resolve: {
          detail: function($stateParams, Event) {
            return Event.findById({id: $stateParams.noticeId});
          }
        },
        controller: function($scope, detail) {
          $scope.detail = detail;
        }
      });

    $urlRouterProvider.otherwise('/app');

  });
