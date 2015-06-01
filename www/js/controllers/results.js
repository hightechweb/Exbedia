var AUTH = ''; // TODO: remove before commit
function firebaseAuth(error) {
    if (error) {
        console.log('Failed to authenticate to Firebase using token:'+ AUTH);
    }
}

function isHotelInList(hotelID, list) {
    if (!hotelID || !list) {
        throw new Error("SOMETHING BAD HAPPENED.");
    }
    for (var hotel in list) {
        if (list[hotel].id === hotelID) {
            return true;
        }
    }
    return false;
}

function addHotelToResults(hotel, list) {
    list.push(hotel);
    //sort in descending order by id
    list.sort(function(a,b) {
        // first check if they're the same.
        // a) if they're the same, then sort by distance
        // b) if they're not the same, then the private wins
        var aPrivate = a.id.indexOf("private_") === 0;
        var bPrivate = b.id.indexOf("private_") === 0;
        
        // TODO: I think this is an XOR, but double check. see if this can be simplififed
        if ((aPrivate && bPrivate) || (!aPrivate && !bPrivate)) {
            // A & B are of the same type, sort by distance
            return a.distance - b.distance;
        }
        else if (aPrivate) {
            // A is less than B
            return -1;
        }
        else {
            // A is greater than B
            return 1;
        }
    });
}

exbedia.controller('ResultsController', function($location, $firebase, $geofire, $rootScope) {
    // Get the search parameters from the search controller
    $rootScope.query = $rootScope.query || {};
    $rootScope.hotels = $rootScope.hotels || [];
    // Below is all the code required to do a search for hotels based on geolocation
    // for Expedia
    // TODO: Point to main firebase app
    var hotels_url = 'https://glowing-heat-3430.firebaseio.com/hotels';
    var geodata_url = 'https://glowing-heat-3430.firebaseio.com/geohotels';
    var fb_hotels = new Firebase(hotels_url);
    fb_hotels.authWithCustomToken(AUTH, firebaseAuth);
    var fb_geodata = new Firebase(geodata_url);
    fb_geodata.authWithCustomToken(AUTH, firebaseAuth);
    var geoFire = $geofire(fb_geodata);
    
    var geoFireQuery = geoFire.$query({
        center: [parseFloat($rootScope.query.lat), parseFloat($rootScope.query.lon)],
        radius: 16 // This is km, about 10 miles
    });

    // Setup Angular Broadcast event for when an object enters our query
    var geoQueryCallback = geoFireQuery.on("key_entered", "SEARCH:KEY_ENTERED");
    
    // Listen for Angular Broadcast
    var numResults = 20; // Permanently hardcoded
    // counters
    var numExpedia = 0;
    var numPrivate = 0;

    $rootScope.$on("SEARCH:KEY_ENTERED", function (event, hotelID, location, distance) {
        if ($rootScope.hotels.length >= numResults || isHotelInList(hotelID, $rootScope.hotels)) {
            // Skip this hotel if we have enough, or if it's a duplicate
            return;
        }

        var hotelResult = $firebase(fb_hotels.child(hotelID));
        var hotelObject = hotelResult.$asObject();
        if (!hotelObject) {
            // Skip a bad hotelObject
            return;
        }

        var hotel = {
            id: hotelID,
            info: hotelObject,
            distance: distance
        };

        var isPrivate = hotelID.indexOf("private_") === 0;
        if (isPrivate && numPrivate < numResults) {
            addHotelToResults(hotel, $rootScope.hotels);
            numPrivate++;
        }
        else if (!isPrivate && (numExpedia + numPrivate) < numResults) {
            addHotelToResults(hotel, $rootScope.hotels);
            numExpedia++;
        }
        else {
            console.log("Error: bad object");
        }

        // TODO: handle errors in the else case:
        // 1) no/bad hotelObject
        // ????
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
