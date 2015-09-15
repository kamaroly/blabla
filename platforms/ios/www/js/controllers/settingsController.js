tigoApp.controller('settingCtrl', function ($scope,SettingRepository) {
	// Setting the window title
	$scope.windowTitle = "Settings";
	$scope.user    = {'msisdn' : window.localStorage.getItem('msisdn')};
    $scope.setting = {};
	$scope.refreshSettings = function(){
	window.localStorage.setItem('shop_with_my_number',$scope.setting.shop_with_my_number);
	window.localStorage.setItem('enter_is_submit',$scope.setting.enter_is_submit);	
	window.localStorage.setItem('use_airtime_to_buy_packs',$scope.setting.use_airtime_to_buy_packs);
	window.localStorage.setItem('always_enter_pin',$scope.setting.always_enter_pin);		
	
	};

	$scope.refreshSettings();

	$scope.getSetting = function(key){
		var value;
		 if(key == 'shop_with_my_number'){
			value      = $scope.setting.shop_with_my_number;
		};	
		if(key == 'enter_is_submit'){
			value      = $scope.setting.enter_is_submit;
		};
		if(key == 'use_airtime_to_buy_packs'){
			value      = $scope.setting.use_airtime_to_buy_packs;
		};
		if(key == 'always_enter_pin'){
			value      = $scope.setting.use_airtime_to_buy_packs;
		};

		window.localStorage.setItem(key,value);	
	};
})