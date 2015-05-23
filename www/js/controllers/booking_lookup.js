exbedia.controller('BookingLookupController', function($location, $rootScope, $firebase){
    $rootScope.navigateToSearch = function() {
        // navigate to search view with search parameters maintained
        $location.path('/');
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
                    $rootScope.hotelInfo = hotelInfo;
                    $location.path("/confirmation:" + $rootScope.bookingID);
                }
                else {
                    console.log("ERROR: hotelID not found.");
                }
            });
        });
    };
});