exbedia.controller('SearchController', function($scope, $location, $cordovaGeolocation, $rootScope) {
    $scope.query = {};
    
    $scope.getLoc = function() {
        if ($scope.useCurrentLocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.$apply(function() {
                    $scope.query.lat = position.coords.latitude;
                    $scope.query.lon = position.coords.longitude;
                });
            });
        }
    };
  
    $scope.formSubmit = function(query) {
        console.log("We are trying to submit now...");
        // Navigate to the results view with the specified parameters
        $rootScope.searchParams = query;
        $location.path("/results");
    };
});