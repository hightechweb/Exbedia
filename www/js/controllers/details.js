exbedia.controller("DetailsController", function($scope, $rootScope, $ionicSlideBoxDelegate) {
     /**
      * NOOP.
      * We don't have to do the following because this
      * is a single page app, and hotels
      * are already set on $rootScope in the results controller
      *
      * $scope.hotel = $rootScope.hotel;
      */

		
	$scope.nextSlide = function() {
		$ionicSlideBoxDelegate.next();
	}
});