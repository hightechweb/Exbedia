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

var exbedia = angular.module('exbedia', ['ionic', 'ngCordova', 'firebase', 'angularGeoFire']);

exbedia.config(function($locationProvider) {
  $locationProvider.html5Mode(true);
});

exbedia.run(function($ionicPlatform, $cordovaGeolocation){
  $ionicPlatform.ready(function() {
    // Noop; TODO: not sure if we need to do anything here
    return;
  });
});

/**
 * Controllers for search view
 */
exbedia.controller('SeachController', function($scope, $cordovaGeolocation) {
  $scope.getLoc = function() {
    if ($scope.useCurrentLocation) {
      navigator.geolocation.getCurrentPosition(function(position){
        var lat  = position.coords.latitude;
        var lon = position.coords.longitude;
        $scope.$apply(function() {
          $scope.lat = lat;
          $scope.lon = lon;
        });
      });
    }
  };
});

/**
 * Controllers for results view
 */

function firebaseAuth(error) {
  if (error) {
    alert('Failed to authenticate to Firebase using token:'+ AUTH);
  }
}
exbedia.controller('SearchParamsController', function($scope, $location, $firebase, $geofire) {
  // Get the querystring parameters; temporarily being displayed as raw JSON
  $scope.params = $location.search();

  // Uses JS to go back 1 page in the browser history, which should be the search page
  $scope.gotoSearch = function() {
    history.back();
  };

  $scope.hotels = [];

  // Below is all the code required to do a search for hotels based on geolocation
  var AUTH = 'UPDATE ME THIS IS NOT A REAL KEY';
  var hotels_url = 'https://glowing-heat-3430.firebaseio.com/hotels';
  var geodata_url = 'https://glowing-heat-3430.firebaseio.com/geohotels';
  var fb_hotels = new Firebase(hotels_url);
  fb_hotels.authWithCustomToken(AUTH, firebaseAuth);
  var fb_geodata = new Firebase(geodata_url);
  fb_geodata.authWithCustomToken(AUTH, firebaseAuth);

  var geoFire = $geofire(fb_geodata);
    
  var geoFireQuery = geoFire.$query({
      center: [parseFloat($scope.params.lat), parseFloat($scope.params.lon)],
      radius: 10
  });

  // Setup Angular Broadcast event for when an object enters our query
  var geoQueryCallback = geoFireQuery.on("key_entered", "SEARCH:KEY_ENTERED");
  
  var numResults = 20; // TODO: temporarily hardcoded
  var i = 0;
  // Listen for Angular Broadcast
  $scope.$on("SEARCH:KEY_ENTERED", function (event, hotelID, location, distance) {
    if (i++ >= 20) return; // Stop at 20
    var hotelResult = $firebase(fb_hotels.child(hotelID));
    var hotelObject = hotelResult.$asObject();
    console.log(hotelObject);
    if (hotelObject) {
      // TODO: figure out how to get the distance on the hotelObjeect; just setting a property doesn't work
      $scope.hotels.push(hotelObject);
    }
  });
});
