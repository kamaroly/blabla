tigoApp.service('helperService',function () {
/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
 var getRandomInt = function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

 var isConnection = function(){
 	if(window.Connection) {
                if(navigator.connection.type == Connection.NONE) {
                    $ionicPopup.confirm({
                        title: "Internet Disconnected",
                        content: "The internet is disconnected on your device. Please make sure you have internet before you continue."
                    })
                    .then(function(result) {
                       console.log('No internet available');
                     });
                    // We have no internet
                   return false;
                }
            // For us to reach here is because we have internet
            return true;
     }
 }


return {
	getRandomInt: getRandomInt,
	isConnection:isConnection
}
});