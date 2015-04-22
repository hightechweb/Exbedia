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
        $location.path('/details:' + $rootScope.hotel.id);
    };
});