var firebaseURL = "https://glowing-heat-3430.firebaseio.com/";

exbedia.controller('SearchController', function($location, $cordovaGeolocation, $rootScope, $firebase) {
    $rootScope.enableSearch = true;

    $rootScope.getLoc = function(useCurrentLocation) {
        $rootScope.useCurrentLocation = useCurrentLocation;
        if (useCurrentLocation) {
            $rootScope.enableSearch = false;
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

    $rootScope.searchBooking = function(bookingID) {
        if(bookingID) {
            var firebaseUrl = 'https://test-exbedia.firebaseio.com';
            var firebaseConnection = new Firebase(firebaseUrl);
            var ref = firebaseConnection.child('bookings');
            ref.child(bookingID).once('value', function(snapshot) {
                $rootScope.$apply(function() {
                    var bookingInfo = snapshot.val();
                    if(bookingInfo !== null) {
                        $rootScope.bookingID = bookingID;
                        $rootScope.bookingInfo = bookingInfo;
                        checkIfHotelExists(firebaseConnection, bookingInfo.hotelID);
                    }
                    else {
                        console.log("ERROR: bookingID not found.");
                        alert("Invalid confirmation number");
                    }
                });
            });
        }
        else {
            alert("Please enter your confirmation number");
        }
    };

    function checkIfHotelExists(firebaseConnection, hotelID) {
        var ref = firebaseConnection.child('hotels');
        ref.child(hotelID).once("value", function(snapshot) {
            $rootScope.$apply(function() {
                var hotelInfo = snapshot.val();
                if(hotelInfo !== null) {
                    $rootScope.hotel = {info: hotelInfo};
                    $location.path("/confirmation:" + $rootScope.bookingID);
                }
                else {
                    console.log("ERROR: hotelID not found.");
                    alert("Invalid confirmation number");
                }
            });
        });
    }
});
