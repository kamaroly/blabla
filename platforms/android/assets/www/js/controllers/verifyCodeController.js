tigoApp.controller('VerifyCode', function($scope, $state,$ionicPopup,AuthService) {
 
  $scope.verifyCode = function(user){
    if (typeof user  === 'undefined') {
       console.log('error happened');
       $ionicPopup.alert({
        title:'Error',
        content: 'You provided invalid code. Please check your sms and provide valid code'
      }).then(function(res){
        console.log('Code verification error');
      });
    	return false;
    };
    AuthService.verifyCode(user.code);
  }
});
