'use strict';
angular.module('the_final')
  .controller('NewsController', function($scope, $http, $modal, $stateParams, Event) {

    if ($stateParams.noticeId) {

      $scope.notice = Event.findById({id: $stateParams.noticeId});

    }

    $scope.articles = [];

    $scope.news = {};
    $scope.news.important = false;

    $scope.newsList = [];

    loadNews();

    function loadNews() {
      Event.find({
        filter: {
          limit: 5,
          order: 'id DESC'
        }
      }, function(data){
        $scope.newsList = data;
      });
    }

    $scope.createNews = function() {

      Event.create({
        title: $scope.news.title,
        description: $scope.news.description,
        body: $scope.news.body,
        image: $scope.files[0].name,
        important: $scope.news.important
      }, function(success) {
        console.log(success);
        $scope.upload();
        loadNews();
      })

    };

    $scope.deleteNews = function(id) {
      Event.deleteById({id: id}, function(data) {
        loadNews();
      });
    };

    $scope.editNews = function(id) {
      console.log(id);
      $modal.open({
        templateUrl: 'app/views/admin/news/edit.html',
        resolve: {
          news: function(Event) {
            return Event.findById({id: id});
          }
        },
        controller: function($rootScope, $scope, $http, news, Event) {

          $scope.news = news;

          $scope.submitEdition = function() {

            if ($scope.files) {
              $http.put('api/events/' + id, {
                title: $scope.news.title,
                description: $scope.news.description,
                image: $scope.files[0].name,
                body: $scope.news.body,
                important: $scope.news.important
              })
                .then(function(success) {
                  $scope.upload();
                  console.log(success);
                  $scope.$close();
                  $rootScope.$broadcast('news.editada');
                });
            } else {
              $http.put('api/events/' + id, {
                title: $scope.news.title,
                description: $scope.news.description,
                body: $scope.news.body,
                important: $scope.news.important
              })
                .then(function(success) {
                  console.log(success);
                  $rootScope.$broadcast('news.editada');
                  $scope.$close();
                });
            }

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

    // pagination
    var limit = 4;
    var page = $stateParams.page;
    if (page == "1") {
      var offset = null;
    } else {
      var offset = page * limit - limit;
    }

    $scope.pages = [];

    function loadArticles () {

      Event.find({

        filter: {

          limit: limit,
          offset: offset

        }

      },

        function(data) {

          $scope.articles = data;

      });

      Event.count(function(data) {
        var totalCount = data.count;
        var pages = totalCount / limit;

        for	(var index = 0; index < pages; index++) {
          var _page = index + 1;
          $scope.pages.push(_page.toString());
        }
        console.log(data.count);
      });

    }

    loadArticles();

    $scope.$on('news.editada', function(evt) {
      loadNews();
    })



  });
