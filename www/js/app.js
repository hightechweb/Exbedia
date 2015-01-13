/**
 * To actually get the geolocation to show up:
 * 1. launch the app in the emulator.
 * 2. enable mock locations under develop options (settings > about > click build number 7 times)
 * 3. open DDMS or monitor.bat, and send a GPS location to the android emulator (emulator control tab)
 * 4. open the google maps app, click the compass button
 * 5. open the expedia app
 * 6. click the Get location button
 * 8. Wait...
 */

var exbedia = angular.module('exbedia', ['ionic', 'ngCordova']);

exbedia.run(function($ionicPlatform, $cordovaGeolocation){
  $ionicPlatform.ready(function() {
    // TODO: I don't think we need to worry about this stuff...
    // if (window.cordova){
    //   if(window.cordova.plugins.Keyboard) {
    //     // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //     // for form inputs)
    //     cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   }
    // }
    // if (window.StatusBar) {
    //   StatusBar.styleDefault();
    // }
  });
});

// This controller uses the standard html5 geolocation, and seems to work just fine
exbedia.controller('CController', function($scope, $cordovaGeolocation) {
  $scope.getLoc = function(){
    navigator.geolocation.getCurrentPosition(function(position){
        var lat  = position.coords.latitude;
        var lon = position.coords.longitude;

        $scope.$apply(function(){
          $scope.lat = lat;
          $scope.lon = lon;
        });
    });
  };
});

// This controller uses the ngCordova geolocation plugin, which doesn't seem to work
// TODO: try refactoring into a $scope.getLoc2() function
exbedia.controller('GeoController', function($scope, $cordovaGeolocation) {
  var posOptions = {timeout: 10000, enableHighAccuracy: false};
  $cordovaGeolocation
    .getCurrentPosition(posOptions)
    .then(function (position) {
      var lat  = position.coords.latitude;
      var lon = position.coords.longitude;

      $scope.$apply(function(){
          $scope.lat2 = lat;
          $scope.lon2 = lon;
        });
    }, function(err) {
      alert("Error: " + err.message); // TODO: getting a position error, timeout expired
    });
});
