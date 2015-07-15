// Registration and Signin Controller
tigoApp.controller('LoginCtrl', function($scope, $state,$ionicPopup,AuthService) {
  
  // First check if this user is already authenticated
  if(AuthService.isLoggedIn()){
    $state.go('tabs.home');
  }
  // Let's try to set focus
  focus('msisdn');

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
     $state.go('tabs.home');    
  };  
});

// Home controller
tigoApp.controller('HomeTabCtrl', function($scope,$state,AuthService) {

  // First check if this user has already been authenticated
  console.log('We are in home now');
});

tigoApp.controller('ListController', function($scope, ProductService, $ionicScrollDelegate, $ionicHistory) {

  $scope.$on('$ionicView.afterLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeEnter', function(){
    //$ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.beforeLeave', function(){
    $ionicHistory.clearCache();
  });
  $scope.$on('$ionicView.afterEnter', function(){
    $ionicHistory.clearCache();
  });

  $scope.products = ProductService.all();

  $scope.scrollBottom = function() {
    $ionicScrollDelegate.scrollBottom(true);
  };
})
 .controller('DetailCtrl', function($scope, $stateParams, ProductService) {

  $scope.product = ProductService.get($stateParams.petsId);

});


tigoApp.controller("ExampleController", function($scope) {
 
    $scope.images = [];
 
    $scope.loadImages = function() {
        for(var i = 0; i < 100; i++) {
            $scope.images.push({id: i, src: "http://placehold.it/50x50"});
        }
    } 
});