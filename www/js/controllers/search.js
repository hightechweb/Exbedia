exbedia.controller('SearchController', function($rootScope, $location, $cordovaGeolocation) {
    $rootScope.getLoc = function() {        
        if ($rootScope.current.useCurrentLocation) { // TODO: refactor
            navigator.geolocation.getCurrentPosition(function(position) { 
                $rootScope.$apply(function() {   
                    $rootScope.query = {
                        lat: position.coords.latitude,
                        lon: position.coords.longitude
                    };
                });
            });
        }
    };
       
    $rootScope.formSubmit = function() {
        console.log("We are trying to submit now...");
        $location.path("/results");
    };
});
