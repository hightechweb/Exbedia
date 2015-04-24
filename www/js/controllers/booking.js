exbedia.controller('BookingController', function($rootScope, $location){
    $rootScope.bookingInfo = $rootScope.bookingInfo || {};

    // Take user to confirmation page
    $rootScope.navigateToConfirm = function(hotelObject) {
        if (hotelObject && hotelObject.hasOwnProperty("id")) {
            $rootScope.hotel = hotelObject;
            $location.path("/confirmation:" + hotelObject.id);
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
});