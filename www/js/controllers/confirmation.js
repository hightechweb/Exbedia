exbedia.controller('ConfirmationController', function($rootScope, $location){
    $rootScope.navigateToSearch = function() {
        // navigate to search view with search parameters maintained
        $location.path('/search');
    };
});