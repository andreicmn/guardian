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

                   for (var i = 1; i <= sections.length; i++) {

                       groupList.push(sections[i - 1]);

                       if ((i % 4 === 0 && i !== 0) || i === sections.length) {
                           $scope.sectionLength.push(Math.ceil(i / 4));
                           articleList.push(groupList);
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
        controller: function ($scope, $stateParams, category) {

            $scope.article = category;
        },
        resolve: {
            category: ['$http', '$stateParams', 'guardianServiceFactory', function ($http, $stateParams, guardianServiceFactory) {
                return guardianServiceFactory.getArticle($stateParams.id);
            }]
        }
    });

    });

}());