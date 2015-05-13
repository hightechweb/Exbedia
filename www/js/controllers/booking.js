exbedia.controller('BookingController', function($rootScope, $location, $firebase){
    $rootScope.bookingInfo = $rootScope.bookingInfo || {};

    // Take user to confirmation page
    $rootScope.navigateToConfirm = function(hotelObject, bookingInfo) {
        if (hotelObject && hotelObject.hasOwnProperty("id")) {
            $rootScope.hotel = hotelObject;

            var bookingKeys = [
                "checkInDate",
                "checkOutDate",
                "num_guests",
                "FName",
                "LName",
                "email",
                "tel"
            ];
            for (var k in bookingKeys) {
                if (!bookingInfo.hasOwnProperty(bookingKeys[k]) || !bookingInfo[bookingKeys[k]]) {
                    // missing data
                    console.log("Missing the ", bookingKeys[k], " field.");
                    return;
                }
            }
            addBookingToFirebase(hotelObject, bookingInfo);
        }
        else {
            // TODO: handle error
            console.log("ERROR, hotelID was not defined. Cannot go anywhere.");
            return;
        }
    };

    $rootScope.navigateToDetails = function() {
        // navigate to details view for the previously viewed hotel

        // TODO: better handling if hotel is somehow undefined or
        // if it doesn't have the id property - which would
        // lead to a JS error here and nothing happening.
        // See how it was done in `navigateToBooking` in details.js
        $location.path('/details:' + $rootScope.hotel.id);
    };

    function generateRandomNum(hotelName) {
        var currentDdate = (new Date()).valueOf().toString();
        var str = hotelName + currentDdate;
        var hash = 0, strlen = str.length, i, c;
        if(strlen == 0) return hash;
        for( i = 0; i < strlen; i++) {
            c = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash;
        }
        return (hash >>> 0);
    };

    function addBookingToFirebase(hotelObject, bookingInfo) {
        var firebaseUrl = 'https://test-exbedia.firebaseio.com';
        var firebaseBookings = new Firebase(firebaseUrl + '/bookings');
        $rootScope.bookingID = generateRandomNum(hotelObject.Name);
        
        var booking = {
            hotelID: hotelObject.id,
            checkInDate: bookingInfo.checkInDate,
            checkOutDate: bookingInfo.checkOutDate,
            firstName: bookingInfo.FName,
            lastName: bookingInfo.LName,
            tel: bookingInfo.tel,
        };
        firebaseBookings.child($rootScope.bookingID).set(booking);

        $location.path("/confirmation:" + bookingID);
    } 
})