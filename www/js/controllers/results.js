function firebaseAuth(error) {
    if (error) {
        console.log('Failed to authenticate to Firebase using token:'+ AUTH);
    }
}

exbedia.controller('ResultsController', function($location, $firebase, $geofire, $rootScope) {
    // Get the search parameters from the search controller
    $rootScope.query = $rootScope.query || {};
    $rootScope.hotels = [];

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
        center: [parseFloat($rootScope.query.lat), parseFloat($rootScope.query.lon)],
        radius: 10 // TODO: maybe make this a dynamic value
    });

    // Setup Angular Broadcast event for when an object enters our query
    var geoQueryCallback = geoFireQuery.on("key_entered", "SEARCH:KEY_ENTERED");
    
    // Listen for Angular Broadcast
    var numResults = 20; // TODO: temporarily hardcoded
    $rootScope.$on("SEARCH:KEY_ENTERED", function (event, hotelID, location, distance) {
        if ($rootScope.hotels.length >= 20) {
            return; // Stop at 20 results
        }
        var hotelResult = $firebase(fb_hotels.child(hotelID));
        var hotelObject = hotelResult.$asObject();
        if (hotelObject) {
            var hotel = {
                id: hotelID,
                info: hotelObject,
                distance: distance
            };

            // Skip this result if it's a duplicate
            for (var h in $rootScope.hotels) {
                if ($rootScope.hotels[h].id === hotel.id) {
                    return;
                }
            }
            $rootScope.hotels.push(hotel);
        }
    });
    
    // Take user to the details page
    $rootScope.viewDetails = function(hotelObject) {
        if (hotelObject && hotelObject.hasOwnProperty("id")) {
            $rootScope.hotel = hotelObject;
            $location.path("/details:" + hotelObject.id);
        }
        else {
            // TODO: handle error
            console.log("ERROR, hotelID was not defined. Cannot go anywhere.");
            return;
        }
    };

    $rootScope.navigateToSearch = function() {
        // navigate to search view with search parameters maintained
        $location.path('/search');
    };
});
