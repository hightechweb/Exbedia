exbedia.controller('SearchController', function($scope, $location, $cordovaGeolocation, $rootScope) {
    $scope.query = {};

    $scope.useCurrentLocation = $rootScope.useCurrentLocation;
    $scope.query.lat = $rootScope.lat;
    $scope.query.lon = $rootScope.lon;
    
    $scope.getLoc = function() {
        if ($scope.useCurrentLocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                $scope.$apply(function() {
                    $scope.query.lat = position.coords.latitude;
                    $scope.query.lon = position.coords.longitude;
                    
                    $rootScope.lat = $scope.query.lat;
                    $rootScope.lon = $scope.query.lon;
                    $rootScope.useCurrentLocation = true;
                });
            });
        }
        else {
            $scope.query = {};
            $rootScope.useCurrentLocation = false;
            $rootScope.lat = '';
            $rootScope.lon = '';
        }
    };
       
    $scope.formSubmit = function(query) {
        console.log("We are trying to submit now...");
        $rootScope.searchParams = query; 
        $location.path("/results");
    };
});
