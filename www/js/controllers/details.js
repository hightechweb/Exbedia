exbedia.controller("DetailsController", function($rootScope) {

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
            $rootScope.goToPath("/booking:" + hotelObject.id);
        }
        else {
            // TODO: handle error
            console.log("ERROR, hotelID was not defined. Cannot go anywhere.");
            return;
        }
    };

    $rootScope.navigateToSearchResults = function() {
        // navigate to search view with search parameters maintained
        $rootScope.goToPath('/results');
    };

    // Use star icons to display rating
    $rootScope.showStars = function(starRating) {
        // Handle case of nothing
        if (!starRating) {
            return "";
        }
        var output = "";
        for(var i = 1; i <= starRating; i++) {
            output += "<span class='ion-ios7-star'></span>";
        }
        if(starRating != Math.ceil(starRating)) {
            output += "<span class='ion-ios7-star-half'></span>";
        }
        for(i = 0; i < 5 - Math.ceil(starRating); i++) {
            output += "<span class='ion-ios7-star-outline'></span>";
        }
        return output;
    };
});