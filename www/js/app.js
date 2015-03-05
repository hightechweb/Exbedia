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
        'firebase',
        'angularGeoFire',
        'exbediaControllers',
        'exbediaFilters'
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

var exbediaFilters = angular.module('exbediaFilters',
    [
        'ionic',
        'ngCordova',
        'firebase',
        'angularGeoFire'
    ]
);

exbedia.config(function($stateProvider, $urlRouterProvider, $locationProvider) { 
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
    $stateProvider.
        state('search', {
            url: '/',
            templateUrl: './views/search.html',
            controller: 'SearchController'
        }).
        state('results', {
            url: '/results',
            templateUrl: './views/results.html',
            controller: 'ResultsController'
        }).
        state('details', { // TODO: should be "/details:id" where id is the hotel/property ID
            url: '/details',
            templateUrl: './views/details.html', // TODO: not implemented yet
            controller: 'DetailsController'  // TODO: not implemented yet
        });
});

exbedia.run(function($ionicPlatform, $cordovaGeolocation, $rootScope) {
    $rootScope.current = {}; // TODO: refactor
    $ionicPlatform.ready(function() {
        // Noop; not sure if we need to do anything here
        return;
    });
});

/**
 * Controllers for results view
 */
 exbedia.controller('DetailsController', function($scope, $firebase) {
	var AUTH = 'UPDATE ME THIS IS NOT A REAL KEY';
	var hotel_url = 'https://glowing-heat-3430.firebaseio.com/hotels/272117'; 
	var fb_hotel = new Firebase(hotel_url);
	var hotelResult = $firebase(fb_hotel);
	var hotelObject = hotelResult.$asObject();
	
	$scope.hotel = {
		info: hotelObject
	}
});
