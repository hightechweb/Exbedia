exbedia.controller('AutocompleteController', function($scope) {
                //Setup a basic controller with scope variable 'city'
    			$scope.city = null;
                //restricting search option to US only
                $scope.autocompleteOptions = {
                        componentRestrictions: { country: 'us' },
                        types: ['geocode']
                    }
    		});