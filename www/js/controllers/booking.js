var firebaseURL = "https://glowing-heat-3430.firebaseio.com/";

exbedia.controller('BookingController', function($rootScope, $firebase){
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
        $rootScope.goToPath('/details:' + $rootScope.hotel.id);
    };

    function generateRandomNum(hotelName) {
        var currentDdate = (new Date()).valueOf().toString();
        var str = hotelName + currentDdate;
        var hash = 0, strlen = str.length, i, c;
        if(strlen === 0) return hash;
        for( i = 0; i < strlen; i++) {
            c = str.charCodeAt(i);
            hash = ((hash << 5) - hash) + c;
            hash = hash & hash;
        }
        return (hash >>> 0);
    }

    function addBookingToFirebase(hotelObject, bookingInfo) {
        var firebaseConnection = new Firebase(firebaseURL);
        var firebaseBookings = firebaseConnection.child('bookings');
        var firebaseHotels = firebaseConnection.child('hotels');

        $rootScope.bookingID = generateRandomNum(hotelObject.Name);
        var booking = {
            hotelID: hotelObject.id,
            checkInDate: bookingInfo.checkInDate,
            checkOutDate: bookingInfo.checkOutDate,
            firstName: bookingInfo.FName,
            lastName: bookingInfo.LName,
            email: bookingInfo.email,
            tel: bookingInfo.tel,
            num_guests: bookingInfo.num_guests
        };

        if (!hotelObject || !hotelObject.hasOwnProperty("id")) {
            // TODO: handle the error
            console.log("Got a bad hotel, can't book it");
        }

        // if it's an Exbedia hotel
        if (hotelObject.id.indexOf("private_") === 0){
            var roomsRef = firebaseHotels.child(hotelObject.id + '/rooms');
            roomsRef.orderByChild('maxGuests').once('value',
                function(dataSnapshot) {
                    var assignedRoom;
                    var roomData;
                    if (dataSnapshot.numChildren() > 0) {
                        var childData = dataSnapshot.exportVal();
                        // room has one or more rooms
                        // goes through all childern check if num guest less than maxGuest
                        var ci;
                        for (ci in childData) {
                            if (childData.hasOwnProperty(ci)) {
                                var childSnapshot = childData[ci];
                                roomData = childSnapshot;
                                roomKey = ci;
                                var maxGuests = roomData.maxGuests;
                                if(!assignedRoom && booking.num_guests <= roomData.maxGuests){
                                    // finds a room that meets requirements
                                    assignedRoom = roomKey;
                                }
                            }
                        }
                        if (!assignedRoom){
                            // reach here if no room was assigned
                            // assigned to the last room and additional charges message
                            assignedRoom = ci;
                            booking.bookingMessage = "This room only allows " + roomData.maxGuests + ". There may be additional charges.";
                        }
                        if (assignedRoom) {
                            //add a room that meets guest requirements
                            booking.room = assignedRoom;
                            firebaseBookings.child($rootScope.bookingID).set(booking);
                            firebaseHotels.child(hotelObject.id).child("bookings").push($rootScope.bookingID);
                            $rootScope.goToPath("/confirmation:" + $rootScope.bookingID);
                            $rootScope.sendConfirmationEmail($rootScope.bookingID, $rootScope.defaultConfirmationEmailCallback);        
                        }
                        else {
                            // TODO: handle error
                            // no room was assigned
                            alert("Error: room was not assigned");
                        }

                    }
                    else {
                        // booking a private property with no rooms
                        booking.bookingMessage = "This booking is booking the whole property";
                        firebaseBookings.child($rootScope.bookingID).set(booking);
                        firebaseHotels.child(hotelObject.id).child("bookings").push($rootScope.bookingID);
                        $rootScope.goToPath("/confirmation:" + $rootScope.bookingID);
                        $rootScope.sendConfirmationEmail($rootScope.bookingID, $rootScope.defaultConfirmationEmailCallback);        
                    }
                },
                function(err) {
                    console.log("Error: Firebase has no element ", err);
                }
            );
        }
        else { 
            // reach this point if it's an Expedia hotel
            firebaseBookings.child($rootScope.bookingID).set(booking);
            $rootScope.goToPath("/confirmation:" + $rootScope.bookingID);
            $rootScope.sendConfirmationEmail($rootScope.bookingID, $rootScope.defaultConfirmationEmailCallback);        
        }
    }
});