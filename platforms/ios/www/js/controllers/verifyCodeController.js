tigoApp.controller('VerifyCode', function($scope, $state,$ionicPopup,AuthService) {
  
  $scope.verifyCode = function(user){
    AuthService.verifyCode(user.code);
  }

});
