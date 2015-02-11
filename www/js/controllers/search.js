/**
 * Controllers for search view
 */
exbedia.controller('SearchController', function($scope, $cordovaGeolocation) {
    $scope.query = {};
  $scope.getLoc = function() {
    if ($scope.useCurrentLocation) {
        navigator.geolocation.getCurrentPosition(function(position){
            var lat = position.coords.latitude;
            var lon = position.coords.longitude;
            $scope.$apply(function() {
              $scope.query.lat = lat;
              $scope.query.lon = lon;
            });
        });
    }
  };
  
  $scope.formSubmit = function(query) {
    console.log(query);
  };
});