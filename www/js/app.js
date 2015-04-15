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
        'google.places',
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
        state('details', {
            url: '/details:hotelID',
            templateUrl: './views/details.html',
            controller: 'DetailsController'
        }).
        state('booking', {
            url: '/booking:hotelID',
            templateUrl: './views/booking.html'
            //controller: 'BookingController'
        }).
        state('confirmation', {
            url: '/confirmation:hotelID',
            templateUrl: './views/confirmation.html'
            //controller: 'ConfirmationController'
        });

    $urlRouterProvider.otherwise('/');
});

exbedia.run(function($ionicPlatform, $rootScope) {
    // Initialize for Google Place API, allows us to use $rootScope exclusively
    $rootScope.googlePlaceData = null;
    // US properties only
    $rootScope.autocompleteOptions = {
        componentRestrictions: { country: 'us' },
        types: ['geocode']
    };

    $ionicPlatform.ready(function() {
        // Noop; not sure if we need to do anything here
        return;
    });
});
