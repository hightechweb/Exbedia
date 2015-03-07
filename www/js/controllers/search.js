exbedia.controller('SearchController', function($scope, $location, $cordovaGeolocation, $rootScope) {
    $scope.query = {};
    $scope.googlePlaceData = null;
    //restricting search option to US only
    $scope.autocompleteOptions = {
        componentRestrictions: { country: 'us' },
        types: ['geocode']
    };
    
    $scope.getLoc = function() {
        if ($scope.useCurrentLocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.$apply(function() {
                    $scope.query.lat = position.coords.latitude;
                    $scope.query.lon = position.coords.longitude;
                });
            });
        }
    };
  
    $scope.formSubmit = function() {
        // Default to current location
        var query = $scope.query;

        // Overwrite those values if using a Google Place
        if (!$scope.useCurrentLocation &&
            $scope.googlePlaceData &&
            $scope.googlePlaceData.geometry &&
            $scope.googlePlaceData.geometry.location &&
            $scope.googlePlaceData.geometry.location.hasOwnProperty("k") &&
            $scope.googlePlaceData.geometry.location.hasOwnProperty("D")
            ) {
            query.lat = $scope.googlePlaceData.geometry.location.k;
            query.lon = $scope.googlePlaceData.geometry.location.D;
        }

        // Abort if bad values.
        if (!query || !query.hasOwnProperty("lat") || !query.hasOwnProperty("lon")) {
            alert("Please pick a location");
            return;
        }

        console.log("We are trying to submit now...");
        // Navigate to the results view with the specified parameters
        $rootScope.searchParams = query;
        $location.path("/results");
    };

});
