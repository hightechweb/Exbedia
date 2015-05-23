exbedia.controller('SearchController', function($location, $cordovaGeolocation, $rootScope, $firebase) {
    $rootScope.getLoc = function(useCurrentLocation) {
        $rootScope.useCurrentLocation = useCurrentLocation;
        if (useCurrentLocation) {
            navigator.geolocation.getCurrentPosition(function(position) { 
                $rootScope.$apply(function() {   
                    $rootScope.query = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                });
            });
        }
    };
       
    $rootScope.formSubmit = function(query, useCurrentLocation, googlePlaceData) {
        // Default to current location

        // Update variables used for search
        $rootScope.query = query;
        $rootScope.useCurrentLocation = useCurrentLocation;
        $rootScope.googlePlaceData = googlePlaceData;

        // Overwrite lat/lon if using a Google Place
        if (!$rootScope.useCurrentLocation &&
            $rootScope.googlePlaceData &&
            $rootScope.googlePlaceData.geometry &&
            $rootScope.googlePlaceData.geometry.location &&
            $rootScope.googlePlaceData.geometry.location.hasOwnProperty("k") &&
            $rootScope.googlePlaceData.geometry.location.hasOwnProperty("D")
            ) {
            $rootScope.query = {
                lat: $rootScope.googlePlaceData.geometry.location.k,
                lon: $rootScope.googlePlaceData.geometry.location.D
            };
        }

        // Abort if bad values
        if (!$rootScope.query || !$rootScope.query.hasOwnProperty("lat") || !$rootScope.query.hasOwnProperty("lon")) {
            alert("Please pick a location");
            return;
        }

        console.log("We are trying to submit now...");

        // Search parameters are automagically passed via $rootScope
        $location.path("/results");
    };

    $rootScope.navigateToBookingLookup = function() {
        // navigate to search view with search parameters maintained
        $location.path('/booking_lookup');
    };
});
