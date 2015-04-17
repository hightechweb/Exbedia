exbedia.controller("DetailsController", function($rootScope, $location, $ionicViewService) {

    //Filter null images from an image list
    $rootScope.filterNullImages = function(imageList) {
        // Copy array of imageList
        var newImageList = [];
        for(var i = 0; imageList && i < imageList.length; i++) {
            // Skip any null values
            if(imageList[i]) {
                newImageList.push(imageList[i]);
            }
        }
        return newImageList;
    };

    //Take user to booking page
    $rootScope.navigateToBooking = function(hotelObject) {
        if (hotelObject && hotelObject.hasOwnProperty("id")) {
            $rootScope.hotel = hotelObject;
            $location.path("/booking:" + hotelObject.id);
        }
        else {
            // TODO: handle error
            console.log("ERROR, hotelID was not defined. Cannot go anywhere.");
            return;
        }
    };

    // TODO: need to implement the back button
});