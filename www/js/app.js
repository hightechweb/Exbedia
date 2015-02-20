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

var exbedia = angular.module('exbedia',
    [
        'ionic',
        'ngCordova',
        'ngRoute',
        'firebase',
        'angularGeoFire',
        'exbediaControllers'
    ]
);

var exbediaControllers = angular.module('exbediaControllers',
    [
        'ionic',
        'ngCordova',
        'firebase',
        'angularGeoFire'
    ]
);

exbedia.config(function($routeProvider, $locationProvider) { 
   $locationProvider.html5Mode(true);
   // The irony here, is when you navigate to /search you get an error - apparently this is how angular works
   $routeProvider.
        when('/search', {
            templateUrl: '/views/search.html',
            controller: 'SearchController'
        }).
        when('/results', {
            templateUrl: '/views/results.html',
            controller: 'ResultsController'
        }).
        when('/details', { // TODO: should be "/details:id" where id is the hotel/property ID
            templateUrl: '/views/details.html', // TODO: not implemented yet
            controller: 'DetailsController'  // TODO: not implemented yet
        }).
        otherwise({
            redirectTo: '/search'
        });
}); 

exbedia.run(function($ionicPlatform, $cordovaGeolocation) {
    $ionicPlatform.ready(function() {
        // Noop; not sure if we need to do anything here
        return;
    });
});
