exbedia.controller("DetailsController", function($scope, $rootScope) {
     /**
      * NOOP.
      * We don't have to do the following because this
      * is a single page app, and hotels
      * are already set on $rootScope in the results controller
      *
      * $scope.hotel = $rootScope.hotel;
      */
	  
	  $scope.filterNullImages = function(imageList) {
		//copy array of imageList
		var newImageList = [];
		for(var i = 0; imageList && i < imageList.length; i++) {
			if(imageList[i])
				newImageList.push(imageList[i]);
		}
		return newImageList;
	  }
});