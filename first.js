var mainApp = angular.module("mainApp", ['ngRoute']);
mainApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider.

    when('/movies', {
        templateUrl: 'movies.htm',
        controller: 'DataController'
    }).

    when('/tvshows', {
        templateUrl: 'tvshows.htm',
        controller: 'DataController'
    }).

    otherwise({
        redirectTo: '/movies'
    });
}]);

mainApp.controller('DataController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.$watch('search', function () {
        fetch(); //watches the search input which refreshes every 800ms
    });
    function fetch() {
        var search = $("#search").val();
       // console.log(search)
       
        $http.get('https://api.themoviedb.org/3/search/movie?api_key=5f00c700457e89a5410433f44f655142&query=' + search)
          .then(function (response) {
              console.log(response)
              $scope.title = response.data;
         //     console.log($scope.title)  
          });

        $http.get('https://api.themoviedb.org/3/search/tv?api_key=5f00c700457e89a5410433f44f655142&query=' + search)
          .then(function (response) {
              console.log(response)
              $scope.title2 = response.data;
              console.log($scope.title2)
          });
    }
    $scope.loaded = false;
    $http.get('https://api.themoviedb.org/3/movie/popular?api_key=5f00c700457e89a5410433f44f655142&language=en-US').success(function (data) {
        $scope.movies = data;
        $scope.loaded = true;
    })
     .error(function (error) {
         $scope.data.error = { message: error, status: status };
         console.log($scope.data.error.status);
     });    

    $http.get('https://api.themoviedb.org/3/tv/top_rated?api_key=5f00c700457e89a5410433f44f655142&language=en-US').success(function (data) {
        $scope.tvShows = data;
        $scope.loaded = true;
    })
    .error(function (error) {
        $scope.data.error = { message: error, status: status };
        console.log($scope.data.error.status);
    });


}]);


 


