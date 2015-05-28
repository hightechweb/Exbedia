exbedia.controller('SearchController', function($location, $cordovaGeolocation, $rootScope) {
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
        console.log($rootScope.googlePlaceData);

        // Overwrite lat/lon if using a Google Place
        if (!$rootScope.useCurrentLocation &&
            $rootScope.googlePlaceData &&
            $rootScope.googlePlaceData.geometry &&
            $rootScope.googlePlaceData.geometry.location &&
            $rootScope.googlePlaceData.geometry.location.hasOwnProperty("A") &&
            $rootScope.googlePlaceData.geometry.location.hasOwnProperty("F")
            ) {
            $rootScope.query = {
                lat: $rootScope.googlePlaceData.geometry.location.A,
                lon: $rootScope.googlePlaceData.geometry.location.F
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

});
