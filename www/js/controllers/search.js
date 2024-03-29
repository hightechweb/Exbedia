var firebaseURL = "https://glowing-heat-3430.firebaseio.com/";

exbedia.controller('SearchController', function($cordovaGeolocation, $rootScope, $firebase) {
    $rootScope.enableSearch = true;
    
    $rootScope.getLoc = function(useCurrentLocation) {
        $rootScope.useCurrentLocation = useCurrentLocation;
        if (useCurrentLocation) {
            $rootScope.enableSearch = false;
            navigator.geolocation.getCurrentPosition(function(position) { 
                $rootScope.query = {
                    lat: position.coords.latitude,
                    lon: position.coords.longitude
                };
                $rootScope.enableSearch = true;
                $rootScope.$apply();
            });
        }
    };
       
    $rootScope.formSubmit = function(query, useCurrentLocation, googlePlaceData) {
        // Default to current location

        // Update variables used for search
        $rootScope.query = query;
        $rootScope.useCurrentLocation = useCurrentLocation;
        $rootScope.googlePlaceData = googlePlaceData;

        // Reset search results, this happens when trying to search a second time
        $rootScope.hotels = [];

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
        $rootScope.goToPath("/results");
    };

    $rootScope.searchBooking = function(bookingID) {
        if (!bookingID) {
            alert("Please enter your confirmation number");
            return;
        }

        var firebaseConnection = new Firebase(firebaseURL);
        firebaseConnection.child("bookings/" + bookingID).once('value', function(bookingSnapshot) {
            var bookingInfo = bookingSnapshot.val();
            if (bookingInfo && bookingInfo.hasOwnProperty("hotelID")) {
                checkIfHotelExists(firebaseConnection, bookingInfo, bookingID);
            }
            else {
                console.log("ERROR: Invalid confirmation number");
                alert("Invalid confirmation number");
            }
        });
    };

    function checkIfHotelExists(firebaseConnection, bookingInfo, bookingID) {
        var ref = firebaseConnection.child('hotels');
        ref.child(bookingInfo.hotelID).once("value", function(snapshot) {
            var hotelInfo = snapshot.val();
            if (hotelInfo) {
                $rootScope.bookingID = bookingID;
                $rootScope.bookingInfo = bookingInfo;
                $rootScope.hotel = {info: hotelInfo};
                $rootScope.$apply();
                $rootScope.goToPath("/confirmation:" + $rootScope.bookingID);
            }
            else {
                console.log("ERROR: hotelID not found.");
                alert("Invalid confirmation number");
            }
        });
    }
});
