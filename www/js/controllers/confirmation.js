exbedia.controller('ConfirmationController', function($rootScope, $location){

	$rootScope.generateRandomNum = function(hotelName) {
		var currentDdate = (new Date()).valueOf().toString();
		var str = hotelName + currentDdate;
		var hash = 0, strlen = str.length, i, c;
		if(strlen == 0) return hash;
		for( i = 0; i < strlen; i++) {
			c = str.charCodeAt(i);
			hash = ((hash << 5) - hash) + c;
			hash = hash & hash;
		}
		return (hash >>> 0);
    };
    
});