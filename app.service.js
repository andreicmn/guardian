(function () {

    var guardianServiceFactory = function ($http) {
        var promise = $http.get("https://content.guardianapis.com/search?q=debates&api-key=test");
        return {
            getList: function () {
                return promise.then(function (response) {
                    var list = response.data.response.results;

                    return list;
                });
            },
            getArticle: function (articleId) {
                return promise.then(function (response) {
                    var list = response.data.response.results;
                    var itemList = list.filter(function (item) {
                        return item.id === articleId;
                    });

                    return itemList[0];
                });
            }
        }
    };

    angular.module('guardianApp')
     .factory("guardianServiceFactory", guardianServiceFactory);

}());