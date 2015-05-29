var AUTH = ''; // TODO: remove before commit
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
    // for Expedia
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
    var numResults = 10; // TODO: temporarily hardcoded

    $rootScope.$on("SEARCH:KEY_ENTERED", function (event, hotelID, location, distance) {
        if ($rootScope.hotels.length >= numResults) {
            return;
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
            //sort in descending order by id
            $rootScope.hotels.sort(function(a,b) {
                return b.id - a.id;
            });
        }
    });
    //results for Exbedia hotels
    var hotels_url2 = 'https://test-admin-accounts.firebaseio.com/hotels';
    var geodata_url2 = 'https://test-admin-accounts.firebaseio.com/geohotels';
    var fb_hotels2 = new Firebase(hotels_url2);
    fb_hotels2.authWithCustomToken(AUTH, firebaseAuth);
    var fb_geodata2 = new Firebase(geodata_url2);
    fb_geodata2.authWithCustomToken(AUTH, firebaseAuth);
    var geoFire2 = $geofire(fb_geodata2);
    
    var geoFireQuery2 = geoFire2.$query({
        center: [parseFloat($rootScope.query.lat), parseFloat($rootScope.query.lon)],
        radius: 10 // TODO: maybe make this a dynamic value
    });

    // Setup Angular Broadcast event for when an object enters our query
    var geoQueryCallback2 = geoFireQuery2.on("key_entered", "SEARCH:KEY_ENTERED2");
    
    // Listen for Angular Broadcast
    var numResults2 = 20; // TODO: temporarily hardcoded
    $rootScope.$on("SEARCH:KEY_ENTERED2", function (event, hotelID, location, distance) {
        if ($rootScope.hotels.length >= numResults2) {
            return;
        }
        var hotelResult = $firebase(fb_hotels2.child(hotelID));
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
            //sort in descending order by id
            $rootScope.hotels.sort(function(a,b) {
                return b.id - a.id;
            });
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
