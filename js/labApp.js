var labApp = angular.module('labApp', ["firebase"]);

labApp.config(function ($routeProvider) {
  //$routeProvider.when('this route',{ controller : 'that controller', templateUrl : 'that template'}).when('..',{..}).otherwise({ redirect: 'somewhere' });

  $routeProvider
    .when('/',
      {
        controller : 'Home',
        templateUrl : '/partials/home.html'
      })
    .otherwise({ redirectTo: '/' });
  });

