// Registration and Signin Controller
tigoApp.controller('LoginCtrl', function($scope, $state,$ionicPopup,AuthService,helperService) {
  
  // First check if this user is already authenticated
  if(AuthService.isLoggedIn()){
    $state.go('tabs.home');
  }

  // if we reach here then the user didn't login before, let's continue with verification
  $scope.login = function(user) {
    console.log(user);
    // Check if the input is number 
    if(user == undefined || isNaN(user.msisdn)){
     var alertPopup = $ionicPopup.alert({
         title: 'You must provide your phone number!',
         template: 'Please provide your phone number before continue.'
       });
      
      alertPopup.then(function(res) {
           console.log('User did not provider msisdn');
         });  

       return false;        
     }
     
     // if we reach here it's good, let's continue with the Login process
     // attempt to login 
     if(AuthService.login(user.msisdn) == false){
        // if we reach here it means that there was an error during login
       var alertPopup = $ionicPopup.alert({
           title: 'We could not verify your phone number',
           // template: 'Please provide your phone number before continue.'
         });
        
        alertPopup.then(function(res) {
             console.log('unable to verify user\'s msisdn');
       });    
      return false;
     }     
     // if we reach here it means that the user was successfully authenticated
     $state.go('code-verification');    
  };  
});