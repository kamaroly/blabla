tigoApp.controller('settingCtrl', ['$scope', function ($scope,SettingRepository) {
	// Setting the window title
	$scope.windowTitle = "Settings";
	$scope.user    = {'msisdn' : window.localStorage.getItem('msisdn')};

	$scope.getSetting = function(key){
		SettingRepository.getById(key).then(function(setting){
			/**
			 * @todo  Implement the dynamic settings
			 */
			console.log(setting);
		});
	}

	$scope.getSetting();
}])