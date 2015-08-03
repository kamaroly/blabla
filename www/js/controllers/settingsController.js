tigoApp.controller('settingCtrl', ['$scope', function ($scope) {
	// Setting the window title
	$scope.windowTitle = "Settings";
	$scope.user    = {'msisdn' : window.localStorage.getItem('msisdn')};
}])