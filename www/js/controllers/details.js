exbedia.controller("DetailsController", function($rootScope, $location) {

    // Filter null images from an image list
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

    // Take user to booking page
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

    $rootScope.navigateToSearchResults = function() {
        // navigate to search view with search parameters maintained
        $location.path('/results');
    };

    // Use star icons to display rating
    $rootScope.showStars = function(starRating) {
        var output = "";
        for(var i = 1; i <= starRating; i++) {
            output += "<span class='ion-ios-star'></span>";
        }
        if(starRating != Math.ceil(starRating)) {
            output += "<span class='ion-ios-star-half'></span>";
        }
        for(var i = 0; i < 5 - Math.ceil(starRating); i++) {
            output += "<span class='ion-ios-star-outline'></span>";
        }
        return output;
    }
});