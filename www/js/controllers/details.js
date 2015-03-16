exbedia.controller("DetailsController", function($rootScope, $location, $ionicViewService) {
    /**
     * NOOP.
     * We don't have to do the following because this
     * is a single page app, and hotels
     * are already set on $rootScope in the results controller
     *
     * $scope.hotel = $rootScope.hotel;
     */
      
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

    // TODO: need to implement the back button
});