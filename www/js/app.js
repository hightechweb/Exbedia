/**
 * To actually get the geolocation to show up in the Android Emulator:
 * 1. launch the app in the emulator.
 * 2. enable mock locations under develop options (settings > about > click build number 7 times)
 * 3. open DDMS or monitor.bat, and send a GPS location to the android emulator (emulator control tab)
 * 4. open the google maps app, click the compass button
 * 5. open the exbedia app
 * 6. click the Get location button
 * 8. Wait...
 */

var exbedia = angular.module('exbedia', ['ionic', 'ngCordova', 'ngRoute', 'firebase', 'angularGeoFire', 'exbediaControllers']);
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'

var exbediaControllers = angular.module('exbediaControllers', ['ionic', 'ngCordova', 'firebase', 'angularGeoFire']);

exbedia.config(function($routeProvider, $locationProvider) { 
   $locationProvider.html5Mode(true); 
   $routeProvider.
		when('/search', {
			templateUrl: 'views/search.html',
			controller: 'SearchController'
		}).
		when('/results', {
			templateUrl: 'views/results.html',
			controller: 'ResultsController'
		}).
		when('/details', { // /:pId
			templateUrl: 'views/details',
			controller: 'DetailsController'
		}).
		otherwise({
			redirectTo: '/search'
		});
}); 

exbedia.run(function($ionicPlatform, $cordovaGeolocation) {
  $ionicPlatform.ready(function() {
    // Noop; TODO: not sure if we need to do anything here
    return;
  });
});




