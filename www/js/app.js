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

var exbedia = angular.module('exbedia', ['ionic', 'ngCordova']);

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
exbedia.controller('SearchParamsController', function($scope, $location) {
  $scope.gotoSearch = function() {
    history.back();
  };
  var queryObject = $location.search();
  $scope.params = queryObject;
  
  $scope.results = function(num) {
    return new Array(num);
  };
});