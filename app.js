(function () {

    'use strict'

    var guardianApp = angular.module('guardianApp', ['ui.router']);

    guardianApp.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/1');

        $stateProvider
           .state('main', {
               url: '/:id',
               templateUrl: '../partials/main.html',
               controller:["$scope","$http","sections","$stateParams",function($scope, $http, sections, $stateParams) {
                   console.log(sections);
                   $scope.sectionLength = [];
                   var groupList = [];
                   var articleList = [];
                   // main section pagination
                   for (var i = 1; i <= sections.length; i++) {

                       groupList.push(sections[i - 1]); // max 4 elements list 

                       if ((i % 4 === 0 && i !== 0) || i === sections.length) { // every 4 element
                           $scope.sectionLength.push(Math.ceil(i / 4)); // pagination selector
                           articleList.push(groupList); // pushing elements to mail list
                           groupList = [];
                       }
                   }

                   $scope.articles = articleList;
                   $scope.currentIndex = $stateParams.id - 1;
               }],
               resolve: {
                   sections: ['$http', '$stateParams', 'guardianServiceFactory', function ($http, $stateParams, guardianServiceFactory) {
                       return guardianServiceFactory.getList();
                   }]
               }
           })

    .state('article', {
        url: '/article/:id',
        templateUrl: '../partials/article.html',
        controller: function ($scope, $stateParams, article) {

            $scope.article = article; // selected article
        },
        resolve: {
            article: ['$http', '$stateParams', 'guardianServiceFactory', function ($http, $stateParams, guardianServiceFactory) {
                return guardianServiceFactory.getArticle($stateParams.id);
            }]
        }
    });

    });

}());