exbedia.controller('BookingController', function($rootScope, $location){

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

	$rootScope.bookingInfo = {};
});