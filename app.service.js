(function () {

    var guardianServiceFactory = function ($http) {
        var promise = $http.get("https://content.guardianapis.com/search?q=debates&api-key=test");
        return {
            getList: function () {
                return promise.then(function (response) {
                    
                    var list = response.data.response.results;

                    return list; // return full article list
                });
            },
            getArticle: function (articleId) {
                return promise.then(function (response) {

                    var list = response.data.response.results;
                    var itemList = list.filter(function (item) {
                        return item.id === articleId;
                    });




                    // test fix
<<<<<<< 7b0bb8b8414f6b7c9a1d9d5cc559f787a56cde64
                    
=======
>>>>>>> fix 2
                    return itemList[0]; // return selected article
                });
            }
        }
    };

    angular.module('guardianApp')
     .factory("guardianServiceFactory", guardianServiceFactory);

}());