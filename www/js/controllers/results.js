/**
 * Controllers for results view
 */

function firebaseAuth(error) {
  if (error) {
    console.log('Failed to authenticate to Firebase using token:'+ AUTH);
  }
} 
exbedia.controller('ResultsController', function($scope, $location, $firebase, $geofire) {
  // Get the querystring parameters; temporarily being displayed as raw JSON
  $scope.params = $location.search();

  $scope.hotels = [];

  // Below is all the code required to do a search for hotels based on geolocation
  var AUTH = ''; // TODO: remove before commit
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
    if (hotelObject) {
      var hotel = {
        info: hotelObject,
        distance: distance
      };
      $scope.hotels.push(hotel);
    }
  });
});