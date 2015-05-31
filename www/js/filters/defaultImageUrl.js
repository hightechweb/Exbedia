exbedia.filter('defaultImageUrl', function() {
    return function(hotelImages) {
        var url = "img/ionic.png"; // TODO: update the default thumbnail
        for (var imageIndex in hotelImages) {
            var hotelImage = hotelImages[imageIndex];
            if (hotelImage && hotelImage.hasOwnProperty("default") && hotelImage["default"] === "1" && hotelImage.hasOwnProperty("imageUrl")) {
                url = hotelImage.imageUrl;
                break;
            }
        }
        return url;
    };
});